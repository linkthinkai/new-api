package service

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/QuantumNous/new-api/common"
)

// 免费服务 ip-api.com，lang=zh-CN 返回国家/省/市/ISP 中文描述。
// 对同一 IP 做短期缓存，减少外呼。

type ipAPILangZh struct {
	Status    string `json:"status"`
	Country   string `json:"country"`
	Region    string `json:"regionName"`
	City      string `json:"city"`
	Isp       string `json:"isp"`
	Query     string `json:"query"`
	Message   string `json:"message"`
}

type cachedGeo struct {
	country, region, city, isp string
	expires                    int64
}

const ipAPICacheTTL = 24 * time.Hour

var (
	ipAPIHTTPClient = &http.Client{Timeout: 8 * time.Second}
	ipLocationMu    sync.Mutex
	ipLocationCache = map[string]cachedGeo{}
)

// SiteVisitLogDisabled 为 true 时不记录访问（由环境变量 SITE_VISIT_LOG_DISABLED 控制）
func SiteVisitLogDisabled() bool {
	return strings.TrimSpace(os.Getenv("SITE_VISIT_LOG_DISABLED")) == "true"
}

// LookupLocationZh 查询 IP 对应的中文位置信息。内网/无效 IP 返回 false。
func LookupLocationZh(ip string) (country, region, city, isp string, ok bool) {
	ip = strings.TrimSpace(ip)
	if ip == "" {
		return
	}
	parsed := net.ParseIP(ip)
	if parsed == nil {
		return
	}
	if parsed.IsLoopback() || parsed.IsPrivate() || parsed.IsUnspecified() {
		return
	}
	now := time.Now().Unix()
	ipLocationMu.Lock()
	if ent, found := ipLocationCache[ip]; found && ent.expires > now {
		ipLocationMu.Unlock()
		return ent.country, ent.region, ent.city, ent.isp, true
	}
	ipLocationMu.Unlock()

	escaped := url.PathEscape(ip)
	u := fmt.Sprintf("http://ip-api.com/json/%s?lang=zh-CN&fields=status,message,country,regionName,city,isp,query", escaped)
	req, err := http.NewRequestWithContext(context.Background(), http.MethodGet, u, nil)
	if err != nil {
		return
	}
	resp, err := ipAPIHTTPClient.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return
	}
	var out ipAPILangZh
	if err = common.Unmarshal(body, &out); err != nil {
		return
	}
	if out.Status != "success" {
		return
	}
	country, region, city, isp = out.Country, out.Region, out.City, out.Isp
	if country == "" && region == "" && city == "" {
		return
	}
	ipLocationMu.Lock()
	ipLocationCache[ip] = cachedGeo{country, region, city, isp, now + int64(ipAPICacheTTL.Seconds())}
	ipLocationMu.Unlock()
	return country, region, city, isp, true
}
