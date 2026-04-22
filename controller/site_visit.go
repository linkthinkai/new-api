package controller

import (
	"net/http"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/service"

	"github.com/gin-gonic/gin"
)

func RecordSiteVisit(c *gin.Context) {
	if service.SiteVisitLogDisabled() {
		c.JSON(200, gin.H{"success": true, "message": "ok", "data": nil})
		return
	}
	path := c.Query("path")
	if i := strings.IndexByte(path, '?'); i >= 0 {
		path = path[:i]
	}
	if !utf8.ValidString(path) {
		path = ""
	}
	if len(path) > 500 {
		path = path[:500]
	}
	if path == "" {
		path = "/"
	}
	ip := c.ClientIP()
	ua := c.Request.UserAgent()
	if len(ua) > 2000 {
		ua = ua[:2000]
	}
	userId := 0
	if id, exists := c.Get("id"); exists {
		switch v := id.(type) {
		case int:
			userId = v
		case int32:
			userId = int(v)
		case int64:
			userId = int(v)
		}
	}
	now := common.GetTimestamp()
	country, region, city, isp, _ := service.LookupLocationZh(ip)
	v := &model.SiteVisit{
		Ip:        ip,
		Path:      path,
		UserAgent: ua,
		UserId:    userId,
		CountryZh: country,
		RegionZh:  region,
		CityZh:    city,
		Isp:       isp,
		CreatedAt: now,
	}
	if err := model.CreateSiteVisit(v); err != nil {
		common.ApiError(c, err)
		return
	}
	c.JSON(200, gin.H{"success": true, "message": "ok", "data": nil})
}

func GetSiteVisits(c *gin.Context) {
	pageInfo := common.GetPageQuery(c)
	items, total, err := model.GetAllSiteVisits(pageInfo.GetStartIdx(), pageInfo.GetPageSize())
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo.SetTotal(int(total))
	pageInfo.SetItems(items)
	common.ApiSuccess(c, pageInfo)
}

type siteVisitRegionRow struct {
	Label string `json:"label"`
	Count int64  `json:"count"`
}

// buildSiteVisitFullData 全站访问仪表盘用：国家、趋势、路径、省/市、运营商一次返回（供 stats?full=1 与 /site_visit_aggregate 复用）
func buildSiteVisitFullData(c *gin.Context) (gin.H, error) {
	countries, err := model.GetSiteVisitCountryStats(20)
	if err != nil {
		return nil, err
	}
	unit := c.DefaultQuery("unit", "day")
	span, _ := strconv.Atoi(c.Query("span"))
	if span <= 0 {
		if unit == "hour" {
			span = 24
		} else {
			span = 7
		}
	}
	var points []model.SiteVisitTimePoint
	if unit == "hour" {
		points, err = model.GetSiteVisitTrendByHour(span)
	} else {
		if unit != "day" {
			unit = "day"
		}
		points, err = model.GetSiteVisitTrendByDay(span)
	}
	if err != nil {
		return nil, err
	}
	paths, err := model.GetSiteVisitPathStats(15)
	if err != nil {
		return nil, err
	}
	raw, err := model.GetSiteVisitRegionCityStats(15)
	if err != nil {
		return nil, err
	}
	rows := make([]siteVisitRegionRow, 0, len(raw))
	for i := range raw {
		rows = append(rows, siteVisitRegionRow{
			Label: raw[i].DisplayLabel(),
			Count: raw[i].Count,
		})
	}
	isps, err := model.GetSiteVisitIspStats(10)
	if err != nil {
		return nil, err
	}
	return gin.H{
		"countries": countries,
		"trend": gin.H{
			"unit":   unit,
			"points": points,
		},
		"paths":   paths,
		"regions": rows,
		"isps":    isps,
	}, nil
}

// GetSiteVisitStats 默认 data 为「国家」数组；加 full=1 时返回全量图表块（与分接口二选一即可）
func GetSiteVisitStats(c *gin.Context) {
	if c.Query("full") == "1" {
		data, err := buildSiteVisitFullData(c)
		if err != nil {
			common.ApiError(c, err)
			return
		}
		c.JSON(200, gin.H{"success": true, "message": "", "data": data})
		return
	}
	stats, err := model.GetSiteVisitCountryStats(20)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	c.JSON(200, gin.H{"success": true, "message": "", "data": stats})
}

// GetSiteVisitAggregate 扁平单路径，便于在仅转发部分 /api 的环境下调试与兼容（数据与 stats?full=1 相同）
func GetSiteVisitAggregate(c *gin.Context) {
	data, err := buildSiteVisitFullData(c)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	c.JSON(200, gin.H{"success": true, "message": "", "data": data})
}

// GetSiteVisitTrend GET /trend?unit=day&span=7 或 unit=hour&span=24
func GetSiteVisitTrend(c *gin.Context) {
	unit := c.DefaultQuery("unit", "day")
	span, _ := strconv.Atoi(c.Query("span"))
	if span <= 0 {
		if unit == "hour" {
			span = 24
		} else {
			span = 7
		}
	}
	var points []model.SiteVisitTimePoint
	var err error
	if unit == "hour" {
		points, err = model.GetSiteVisitTrendByHour(span)
	} else {
		if unit != "day" {
			unit = "day"
		}
		points, err = model.GetSiteVisitTrendByDay(span)
	}
	if err != nil {
		common.ApiError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "",
		"data": gin.H{
			"unit":   unit,
			"points": points,
		},
	})
}

func GetSiteVisitPathStats(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "15"))
	stats, err := model.GetSiteVisitPathStats(limit)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	c.JSON(200, gin.H{"success": true, "message": "", "data": stats})
}

func GetSiteVisitRegionStats(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "15"))
	raw, err := model.GetSiteVisitRegionCityStats(limit)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	rows := make([]siteVisitRegionRow, 0, len(raw))
	for i := range raw {
		rows = append(rows, siteVisitRegionRow{
			Label: raw[i].DisplayLabel(),
			Count: raw[i].Count,
		})
	}
	c.JSON(200, gin.H{"success": true, "message": "", "data": rows})
}

func GetSiteVisitIspStats(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	stats, err := model.GetSiteVisitIspStats(limit)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	c.JSON(200, gin.H{"success": true, "message": "", "data": stats})
}
