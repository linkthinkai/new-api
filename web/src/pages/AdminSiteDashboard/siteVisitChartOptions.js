/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

export function buildCountryPieOption(stats, theme, t) {
  const data = (stats || [])
    .filter((s) => s.country_zh && s.count > 0)
    .map((s) => ({ name: s.country_zh, value: s.count }));
  if (data.length === 0) {
    return null;
  }
  return {
    color: [theme.primary, '#00C48C', '#F7B500', '#8E44AD', '#00A3FF', '#FF6B6B', '#95A5A6'],
    tooltip: { trigger: 'item', textStyle: { color: theme.text } },
    legend: {
      type: 'scroll',
      bottom: 0,
      textStyle: { color: theme.textSecondary, fontSize: 11 },
    },
    series: [
      {
        name: t('国家/地区'),
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '46%'],
        itemStyle: { borderRadius: 4, borderColor: 'var(--semi-color-bg-0, #fff)', borderWidth: 1 },
        label: { color: theme.textSecondary },
        data,
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.15)' },
        },
      },
    ],
  };
}

export function buildTrendLineOption(points, unit, theme, t, formatX) {
  if (!points?.length) {
    return null;
  }
  const x = points.map((p) => (formatX ? formatX(p) : p.label));
  const y = points.map((p) => p.count);
  return {
    color: [theme.primary],
    tooltip: {
      trigger: 'axis',
      textStyle: { color: theme.text },
      axisPointer: { type: 'line' },
    },
    grid: { left: 48, right: 16, top: 24, bottom: 40, containLabel: true },
    xAxis: {
      type: 'category',
      data: x,
      axisLine: { lineStyle: { color: theme.border } },
      axisLabel: { color: theme.textSecondary, fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: theme.border, type: 'dashed' } },
      axisLabel: { color: theme.textSecondary },
    },
    series: [
      {
        name: unit === 'hour' ? t('按小时') : t('按天'),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: points.length < 32,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 119, 250, 0.2)' },
              { offset: 1, color: 'rgba(0, 119, 250, 0.02)' },
            ],
          },
        },
        lineStyle: { width: 2 },
        data: y,
      },
    ],
  };
}

function buildHorizontalBar(categories, values, seriesName, theme) {
  if (!categories.length) {
    return null;
  }
  return {
    color: [theme.primary],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { color: theme.text },
    },
    grid: { left: 8, right: 24, top: 8, bottom: 8, containLabel: true },
    xAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: theme.border, type: 'dashed' } },
      axisLabel: { color: theme.textSecondary },
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLine: { show: true, lineStyle: { color: theme.border } },
      axisLabel: {
        color: theme.text,
        width: 160,
        overflow: 'truncate',
        interval: 0,
      },
      inverse: true,
    },
    series: [
      {
        name: seriesName,
        type: 'bar',
        barMaxWidth: 22,
        data: values,
        itemStyle: { borderRadius: [0, 4, 4, 0] },
      },
    ],
  };
}

export function buildPathBarOption(pathStats, theme, t) {
  if (!pathStats?.length) {
    return null;
  }
  const c = pathStats.map((p) => p.path || '—');
  const v = pathStats.map((p) => p.count);
  return buildHorizontalBar(c, v, t('页面路径'), theme);
}

export function buildRegionBarOption(rows, theme, t) {
  if (!rows?.length) {
    return null;
  }
  const c = rows.map((r) => r.label || '—');
  const v = rows.map((r) => r.count);
  return buildHorizontalBar(c, v, t('省/市'), theme);
}

export function buildIspBarOption(ispStats, theme, t) {
  if (!ispStats?.length) {
    return null;
  }
  const c = ispStats.map((p) => p.isp || '—');
  const v = ispStats.map((p) => p.count);
  return buildHorizontalBar(c, v, t('运营商'), theme);
}
