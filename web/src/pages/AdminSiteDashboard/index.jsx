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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Table,
  Pagination,
  Spin,
  Empty,
  Typography,
  Radio,
} from '@douyinfe/semi-ui';
import ReactECharts from 'echarts-for-react';
import { API, showError } from '../../helpers';
import dayjs from 'dayjs';
import { CHART_MIN_HEIGHT, getSemiEchartsTheme } from './siteVisitEchartsTheme';
import {
  buildCountryPieOption,
  buildIspBarOption,
  buildPathBarOption,
  buildRegionBarOption,
  buildTrendLineOption,
} from './siteVisitChartOptions';

const { Text, Title } = Typography;
const pageSize = 20;
const echartsBaseStyle = { width: '100%', minHeight: CHART_MIN_HEIGHT };

function formatTime(ts) {
  if (ts == null || ts === 0) return '—';
  return dayjs.unix(Number(ts)).format('YYYY-MM-DD HH:mm:ss');
}

const ChartCard = ({ title, extra, loading, children, empty, emptyText }) => (
  <Card title={title} extra={extra} bordered>
    {loading ? (
      <div className='flex min-h-80 items-center justify-center'>
        <Spin />
      </div>
    ) : empty ? (
      <div className='flex min-h-80 items-center justify-center'>
        <Empty description={emptyText} />
      </div>
    ) : (
      <div className='min-h-80 w-full min-w-0'>{children}</div>
    )}
  </Card>
);

const AdminSiteDashboard = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);

  const [trendUnit, setTrendUnit] = useState('day');
  const [statsLoading, setStatsLoading] = useState(true);
  const [trendLoading, setTrendLoading] = useState(true);
  const [pathsLoading, setPathsLoading] = useState(true);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [ispsLoading, setIspsLoading] = useState(true);

  const [countryStats, setCountryStats] = useState([]);
  const [trendPoints, setTrendPoints] = useState([]);
  const [pathStats, setPathStats] = useState([]);
  const [regionRows, setRegionRows] = useState([]);
  const [ispStats, setIspStats] = useState([]);

  const theme = useMemo(() => getSemiEchartsTheme(), []);

  const loadList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/site_visit/', {
        params: { p: page, page_size: pageSize },
      });
      if (res.data?.success) {
        const d = res.data.data;
        setTotal(d.total ?? 0);
        setRows(Array.isArray(d.items) ? d.items : []);
      } else {
        showError(res.data?.message || t('加载失败'));
      }
    } catch (e) {
      showError(t('加载失败'));
    } finally {
      setLoading(false);
    }
  }, [page, t]);

  const loadAllCharts = useCallback(async () => {
    setStatsLoading(true);
    setTrendLoading(true);
    setPathsLoading(true);
    setRegionsLoading(true);
    setIspsLoading(true);
    const span = trendUnit === 'day' ? 7 : 24;
    const trendParams = { unit: trendUnit, span };
    const applyBundle = (d) => {
      if (!d || typeof d !== 'object' || Array.isArray(d)) {
        return false;
      }
      if (d.countries === undefined && d.trend === undefined) {
        return false;
      }
      setCountryStats(Array.isArray(d.countries) ? d.countries : []);
      setTrendPoints(d.trend?.points || []);
      setPathStats(d.paths || []);
      setRegionRows(d.regions || []);
      setIspStats(d.isps || []);
      return true;
    };
    const getOr404 = (req) =>
      req.catch((e) => {
        if (e?.response?.status === 404) {
          return { data: { success: false } };
        }
        return Promise.reject(e);
      });
    const loadSplitEndpoints = async () => {
      const [a, b, c, d, e] = await Promise.all([
        getOr404(API.get('/api/site_visit/stats', { skipErrorHandler: true })),
        getOr404(
          API.get('/api/site_visit/trend', { params: trendParams, skipErrorHandler: true }),
        ),
        getOr404(
          API.get('/api/site_visit/paths', { params: { limit: 15 }, skipErrorHandler: true }),
        ),
        getOr404(
          API.get('/api/site_visit/regions', { params: { limit: 15 }, skipErrorHandler: true }),
        ),
        getOr404(
          API.get('/api/site_visit/isps', { params: { limit: 10 }, skipErrorHandler: true }),
        ),
      ]);
      if (a.data?.success) {
        setCountryStats(Array.isArray(a.data.data) ? a.data.data : []);
      }
      if (b.data?.success) {
        setTrendPoints(b.data.data?.points || []);
      }
      if (c.data?.success) {
        setPathStats(c.data.data || []);
      }
      if (d.data?.success) {
        setRegionRows(d.data.data || []);
      }
      if (e.data?.success) {
        setIspStats(e.data.data || []);
      }
    };
    const httpStatus = (e) => e?.response?.status;
    try {
      const bundleFetches = [
        () =>
          API.get('/api/site_visit/stats', {
            params: { full: 1, ...trendParams },
            skipErrorHandler: true,
          }),
        () =>
          API.get('/api/site_visit_aggregate', { params: trendParams, skipErrorHandler: true }),
      ];
      let fullDone = false;
      for (const doFetch of bundleFetches) {
        let res;
        try {
          res = await doFetch();
        } catch (e) {
          if (httpStatus(e) !== 404) {
            throw e;
          }
          continue;
        }
        if (res.data?.success) {
          if (applyBundle(res.data.data)) {
            fullDone = true;
            break;
          }
          if (Array.isArray(res.data.data)) {
            setCountryStats(res.data.data);
            break;
          }
        }
      }
      if (!fullDone) {
        await loadSplitEndpoints();
      }
    } catch (err) {
      showError(t('图表数据加载失败'));
    } finally {
      setStatsLoading(false);
      setTrendLoading(false);
      setPathsLoading(false);
      setRegionsLoading(false);
      setIspsLoading(false);
    }
  }, [t, trendUnit]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    loadAllCharts();
  }, [loadAllCharts]);

  const formatTrendX = useCallback(
    (p) => {
      if (trendUnit === 'hour') {
        return dayjs.unix(p.t).format('HH:00');
      }
      return dayjs.unix(p.t).format('MM-DD');
    },
    [trendUnit],
  );

  const optPie = useMemo(
    () => buildCountryPieOption(countryStats, theme, t),
    [countryStats, theme, t],
  );
  const optLine = useMemo(
    () => buildTrendLineOption(trendPoints, trendUnit, theme, t, formatTrendX),
    [trendPoints, trendUnit, theme, t, formatTrendX],
  );
  const optPath = useMemo(() => buildPathBarOption(pathStats, theme, t), [pathStats, theme, t]);
  const optRegion = useMemo(
    () => buildRegionBarOption(regionRows, theme, t),
    [regionRows, theme, t],
  );
  const optIsp = useMemo(() => buildIspBarOption(ispStats, theme, t), [ispStats, theme, t]);

  const columns = [
    { title: t('访问时间'), dataIndex: 'created_at', width: 180, render: (v) => formatTime(v) },
    { title: 'IP', dataIndex: 'ip', width: 140, ellipsis: true },
    {
      title: t('国家/地区'),
      dataIndex: 'country_zh',
      width: 120,
      ellipsis: true,
      render: (v) => v || '—',
    },
    { title: t('省/州'), dataIndex: 'region_zh', width: 100, ellipsis: true, render: (v) => v || '—' },
    { title: t('城市'), dataIndex: 'city_zh', width: 100, ellipsis: true, render: (v) => v || '—' },
    { title: t('运营商'), dataIndex: 'isp', width: 160, ellipsis: true, render: (v) => v || '—' },
    { title: t('页面路径'), dataIndex: 'path', ellipsis: true },
    {
      title: t('用户ID'),
      dataIndex: 'user_id',
      width: 90,
      render: (v) => (v > 0 ? v : t('未登录访问')),
    },
  ];

  return (
    <div className='min-w-0 space-y-6 px-2'>
      <div>
        <Title heading={4} className='!mb-1'>
          {t('仪表盘')}
        </Title>
        <Text type='tertiary' size='small'>
          {t('全站访问说明')}
        </Text>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <ChartCard
          title={t('国家/地区分布')}
          loading={statsLoading}
          empty={!optPie}
          emptyText={t('暂无数据')}
        >
          {optPie && (
            <ReactECharts
              option={optPie}
              style={echartsBaseStyle}
              notMerge
              lazyUpdate
            />
          )}
        </ChartCard>

        <ChartCard
          title={t('访问趋势')}
          extra={
            <Radio.Group
              type='button'
              value={trendUnit}
              onChange={(e) => {
                const v = e && e.target ? e.target.value : e;
                setTrendUnit(v);
              }}
            >
              <Radio value='day'>{t('按天')}</Radio>
              <Radio value='hour'>{t('按小时')}</Radio>
            </Radio.Group>
          }
          loading={trendLoading}
          empty={!optLine}
          emptyText={t('暂无数据')}
        >
          {optLine && (
            <ReactECharts
              option={optLine}
              style={echartsBaseStyle}
              notMerge
              lazyUpdate
            />
          )}
        </ChartCard>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <ChartCard
          title={t('页面访问 Top')}
          loading={pathsLoading}
          empty={!optPath}
          emptyText={t('暂无数据')}
        >
          {optPath && (
            <ReactECharts
              option={optPath}
              style={echartsBaseStyle}
              notMerge
              lazyUpdate
            />
          )}
        </ChartCard>
        <ChartCard
          title={t('省/市 Top')}
          loading={regionsLoading}
          empty={!optRegion}
          emptyText={t('暂无数据')}
        >
          {optRegion && (
            <ReactECharts
              option={optRegion}
              style={echartsBaseStyle}
              notMerge
              lazyUpdate
            />
          )}
        </ChartCard>
      </div>

      <ChartCard
        title={t('运营商 Top')}
        loading={ispsLoading}
        empty={!optIsp}
        emptyText={t('暂无数据')}
      >
        {optIsp && (
          <ReactECharts option={optIsp} style={echartsBaseStyle} notMerge lazyUpdate />
        )}
      </ChartCard>

      <Card title={t('最近访问记录')} bordered>
        <Table
          className='admin-site-visit-table'
          columns={columns}
          dataSource={rows}
          loading={loading}
          pagination={false}
          rowKey='id'
          scroll={{ x: 1200 }}
        />
        {total > 0 && (
          <div className='mt-3 flex justify-end'>
            <Pagination
              total={total}
              pageSize={pageSize}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminSiteDashboard;
