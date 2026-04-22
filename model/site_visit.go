package model

import (
	"fmt"
	"time"
)

// SiteVisit 记录前端上报的访问（IP 与中文地理位置由服务端解析并写入）
type SiteVisit struct {
	Id        int    `json:"id"`
	Ip        string `json:"ip" gorm:"type:varchar(64);index;default:''"`
	Path      string `json:"path" gorm:"type:varchar(512);default:''"`
	UserAgent string `json:"user_agent" gorm:"type:text"`
	UserId    int    `json:"user_id" gorm:"index;default:0"`
	CountryZh string `json:"country_zh" gorm:"type:varchar(128);index;default:''"`
	RegionZh  string `json:"region_zh" gorm:"type:varchar(128);default:''"`
	CityZh    string `json:"city_zh" gorm:"type:varchar(128);default:''"`
	Isp       string `json:"isp" gorm:"type:varchar(256);default:''"`
	CreatedAt int64  `json:"created_at" gorm:"bigint;index"`
}

func CreateSiteVisit(v *SiteVisit) error {
	return DB.Create(v).Error
}

func GetAllSiteVisits(startIdx, pageSize int) (items []*SiteVisit, total int64, err error) {
	tx := DB.Model(&SiteVisit{})
	if err = tx.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	err = tx.Order("id desc").Offset(startIdx).Limit(pageSize).Find(&items).Error
	if err != nil {
		return nil, 0, err
	}
	return items, total, nil
}

// SiteVisitRegionStat 国家维度聚合（地区信息为中文）
type SiteVisitRegionStat struct {
	CountryZh string `json:"country_zh" gorm:"column:country_zh"`
	Count     int64  `json:"count" gorm:"column:cnt"`
}

func GetSiteVisitCountryStats(limit int) (stats []SiteVisitRegionStat, err error) {
	if limit <= 0 {
		limit = 20
	}
	err = DB.Model(&SiteVisit{}).
		Select("country_zh, count(*) as cnt").
		Where("country_zh != ?", "").
		Group("country_zh").
		Order("cnt desc").
		Limit(limit).
		Scan(&stats).Error
	return stats, err
}

// SiteVisitTimePoint 单桶时间序列（ECharts 用 t 为桶起点 Unix 秒）
type SiteVisitTimePoint struct {
	T     int64  `json:"t"`
	Count int64  `json:"count"`
	Label string `json:"label"`
}

// SiteVisitPathStat 路径聚合
type SiteVisitPathStat struct {
	Path  string `json:"path" gorm:"column:path"`
	Count int64  `json:"count" gorm:"column:cnt"`
}

// SiteVisitRegionCityStat 省+市 聚合
type SiteVisitRegionCityStat struct {
	RegionZh string `json:"region_zh" gorm:"column:region_zh"`
	CityZh   string `json:"city_zh" gorm:"column:city_zh"`
	Count    int64  `json:"count" gorm:"column:cnt"`
}

// SiteVisitIspStat 运营商聚合
type SiteVisitIspStat struct {
	Isp   string `json:"isp" gorm:"column:isp"`
	Count int64  `json:"count" gorm:"column:cnt"`
}

// GetSiteVisitPathStats 页面路径 Top N
func GetSiteVisitPathStats(limit int) (stats []SiteVisitPathStat, err error) {
	if limit <= 0 {
		limit = 15
	}
	if limit > 100 {
		limit = 100
	}
	err = DB.Model(&SiteVisit{}).
		Select("path, count(*) as cnt").
		Where("path != ? AND path IS NOT NULL", "").
		Group("path").
		Order("cnt desc").
		Limit(limit).
		Scan(&stats).Error
	return stats, err
}

// GetSiteVisitRegionCityStats 省/市组合 Top N（空省且空市不统计）
func GetSiteVisitRegionCityStats(limit int) (stats []SiteVisitRegionCityStat, err error) {
	if limit <= 0 {
		limit = 15
	}
	if limit > 100 {
		limit = 100
	}
	err = DB.Model(&SiteVisit{}).
		Select("region_zh, city_zh, count(*) as cnt").
		Where("(region_zh != ? OR city_zh != ?)", "", "").
		Group("region_zh, city_zh").
		Order("cnt desc").
		Limit(limit).
		Scan(&stats).Error
	return stats, err
}

// GetSiteVisitIspStats 运营商 Top N
func GetSiteVisitIspStats(limit int) (stats []SiteVisitIspStat, err error) {
	if limit <= 0 {
		limit = 10
	}
	if limit > 100 {
		limit = 100
	}
	err = DB.Model(&SiteVisit{}).
		Select("isp, count(*) as cnt").
		Where("isp != ? AND isp IS NOT NULL", "").
		Group("isp").
		Order("cnt desc").
		Limit(limit).
		Scan(&stats).Error
	return stats, err
}

// GetSiteVisitTrendByDay 按天桶（UTC 自然日）统计最近 numDays 天，含当天未结束区间
func GetSiteVisitTrendByDay(numDays int) (points []SiteVisitTimePoint, err error) {
	if numDays < 1 {
		numDays = 7
	}
	if numDays > 90 {
		numDays = 90
	}
	now := time.Now().UTC()
	dayStart := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)
	points = make([]SiteVisitTimePoint, 0, numDays)
	// 从 (numDays-1) 天前 00:00 到明天 00:00 前共 numDays 个整桶
	startBase := dayStart.AddDate(0, 0, -(numDays - 1))
	for i := 0; i < numDays; i++ {
		t0 := startBase.AddDate(0, 0, i)
		t1 := t0.Add(24 * time.Hour)
		var c int64
		e := DB.Model(&SiteVisit{}).Where("created_at >= ? AND created_at < ?", t0.Unix(), t1.Unix()).Count(&c).Error
		if e != nil {
			return nil, e
		}
		points = append(points, SiteVisitTimePoint{
			T:     t0.Unix(),
			Count: c,
			Label: t0.Format("01-02"),
		})
	}
	return points, nil
}

// GetSiteVisitTrendByHour 按小时统计最近 numHours 个整点桶（从当前整点往前）
func GetSiteVisitTrendByHour(numHours int) (points []SiteVisitTimePoint, err error) {
	if numHours < 1 {
		numHours = 24
	}
	if numHours > 168 {
		numHours = 168
	}
	now := time.Now().UTC()
	// 当前整点
	hourStart := time.Date(now.Year(), now.Month(), now.Day(), now.Hour(), 0, 0, 0, time.UTC)
	points = make([]SiteVisitTimePoint, 0, numHours)
	// 最远的一桶在 (numHours-1) 小时前
	first := hourStart.Add(-time.Duration(numHours-1) * time.Hour)
	for i := 0; i < numHours; i++ {
		t0 := first.Add(time.Duration(i) * time.Hour)
		t1 := t0.Add(time.Hour)
		var c int64
		e := DB.Model(&SiteVisit{}).Where("created_at >= ? AND created_at < ?", t0.Unix(), t1.Unix()).Count(&c).Error
		if e != nil {
			return nil, e
		}
		points = append(points, SiteVisitTimePoint{
			T:     t0.Unix(),
			Count: c,
			Label: t0.Format("15") + "时",
		})
	}
	return points, nil
}

// SiteVisitRegionCityStatDisplay 前端展示用中文标签
func (s *SiteVisitRegionCityStat) DisplayLabel() string {
	if s.RegionZh != "" && s.CityZh != "" {
		return fmt.Sprintf("%s %s", s.RegionZh, s.CityZh)
	}
	if s.RegionZh != "" {
		return s.RegionZh
	}
	return s.CityZh
}
