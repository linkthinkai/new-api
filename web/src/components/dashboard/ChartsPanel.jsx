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

import React, { useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { RemixIcon } from '@/icons/semiRemix';
import { VChart } from '@visactor/react-vchart';

const ChartsPanel = ({
  activeChartTab,
  setActiveChartTab,
  spec_line,
  spec_model_line,
  spec_pie,
  spec_rank_bar,
  spec_user_rank,
  spec_user_trend,
  isAdminUser,
  CARD_PROPS,
  CHART_CONFIG,
  FLEX_CENTER_GAP2,
  hasApiInfoPanel,
  t,
}) => {
  const chartTabItems = useMemo(() => {
    const items = [
      { key: '1', label: t('消耗分布') },
      { key: '2', label: t('调用趋势') },
      { key: '3', label: t('调用次数分布') },
      { key: '4', label: t('调用次数排行') },
    ];
    if (isAdminUser) {
      items.push(
        { key: '5', label: t('用户消耗排行') },
        { key: '6', label: t('用户消耗趋势') },
      );
    }
    return items;
  }, [isAdminUser, t]);

  const specByTabKey = useMemo(() => {
    const base = {
      '1': spec_line,
      '2': spec_model_line,
      '3': spec_pie,
      '4': spec_rank_bar,
    };
    if (isAdminUser) {
      base['5'] = spec_user_rank;
      base['6'] = spec_user_trend;
    }
    return base;
  }, [
    isAdminUser,
    spec_line,
    spec_model_line,
    spec_pie,
    spec_rank_bar,
    spec_user_rank,
    spec_user_trend,
  ]);

  const chartPanes = useMemo(
    () =>
      chartTabItems.map(({ key }) => {
        const spec = specByTabKey[key];
        if (!spec) return null;
        const show = activeChartTab === key;
        return (
          <div
            key={key}
            className={
              show
                ? 'absolute inset-0 z-10 h-full w-full min-h-0 overflow-hidden opacity-100'
                : 'pointer-events-none absolute inset-0 z-0 h-full w-full min-h-0 overflow-hidden opacity-0'
            }
            aria-hidden={!show}
          >
            <VChart spec={spec} option={CHART_CONFIG} />
          </div>
        );
      }),
    [chartTabItems, specByTabKey, activeChartTab, CHART_CONFIG],
  );

  return (
    <Card
      {...CARD_PROPS}
      bordered={false}
      className={`dashboard-main-card glass-panel !rounded-2xl border-0 !shadow-none ${hasApiInfoPanel ? 'lg:col-span-3' : ''}`}
      bodyStyle={{ padding: 0 }}
      title={
        <div className='flex w-full min-w-0 flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
          <div
            className={`${FLEX_CENTER_GAP2} shrink-0 font-semibold text-semi-color-text-0`}
          >
            <span className='text-semi-color-primary'>
              <RemixIcon icon='ri-pie-chart-line' />
            </span>
            {t('模型数据分析')}
          </div>
          <div
            className='dashboard-chart-segmented -mx-1 min-w-0 overflow-x-auto px-1 pb-0.5 lg:max-w-[min(100%,52rem)] lg:justify-self-end'
            role='tablist'
            aria-label={t('模型数据分析')}
          >
            <div className='inline-flex w-max max-w-full flex-wrap gap-1 rounded-xl bg-[var(--semi-color-fill-0)]/75 p-1 ring-1 ring-[var(--glass-border)]/80 dark:bg-[var(--semi-color-fill-0)]/45'>
              {chartTabItems.map(({ key, label }) => {
                const active = activeChartTab === key;
                return (
                  <button
                    key={key}
                    type='button'
                    role='tab'
                    aria-selected={active}
                    id={`dashboard-chart-tab-${key}`}
                    onClick={() => setActiveChartTab(key)}
                    className={[
                      'dashboard-chart-tab relative rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-[color,background,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--semi-blue-5),0.45)] sm:px-3 sm:text-[13px]',
                      active
                        ? 'dashboard-chart-tab--active bg-[var(--semi-color-bg-1)] text-semi-color-primary shadow-[inset_0_0_0_1px_rgba(var(--semi-blue-5),0.38)] dark:bg-[var(--semi-color-bg-2)]/90'
                        : 'text-semi-color-text-2 hover:bg-[var(--semi-color-fill-1)] hover:text-semi-color-text-0',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      }
    >
      <div
        className='relative h-96 p-3 pt-1'
        role='tabpanel'
        aria-labelledby={`dashboard-chart-tab-${activeChartTab}`}
      >
        {chartPanes}
      </div>
    </Card>
  );
};

export default ChartsPanel;
