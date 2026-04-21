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

import React from 'react';
import { Card, Skeleton, Button } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StatSparkline from './StatSparkline';

const StatsCards = ({ groupedStatsData, loading, CARD_PROPS }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='console-dashboard-stats'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {groupedStatsData.map((group, idx) => (
          <Card
            key={idx}
            {...CARD_PROPS}
            bordered={false}
            data-dash-variant={group.variant || 'wallet'}
            className='dashboard-stat-card glass-panel w-full !rounded-2xl border-0 !shadow-none transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] dark:hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.55)]'
            bodyStyle={{ padding: '0 1rem 0.875rem' }}
            title={group.title}
          >
            <div className='flex flex-col divide-y divide-[var(--glass-border)]/55'>
              {group.items.map((item, itemIdx) => {
                const hasTrend =
                  Array.isArray(item.trendData) && item.trendData.length > 0;
                const showSpark = loading || hasTrend;

                return (
                  <div
                    key={itemIdx}
                    className={`dashboard-stat-row flex min-h-[3.75rem] items-center justify-between gap-3 py-3 first:pt-2 last:pb-2 ${
                      item.onClick
                        ? 'cursor-pointer rounded-lg -mx-1 px-1 transition-colors hover:bg-[var(--semi-color-fill-0)]/65 dark:hover:bg-[var(--semi-color-fill-0)]/35'
                        : ''
                    } `}
                    onClick={item.onClick}
                    role={item.onClick ? 'button' : undefined}
                  >
                    <div className='flex min-w-0 flex-1 items-center gap-2.5'>
                      <div
                        className='dashboard-stat-icon-well flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] text-[0.95rem]'
                        data-tone={item.avatarColor}
                      >
                        {item.icon}
                      </div>
                      <div className='min-w-0'>
                        <div className='text-[11px] font-medium leading-snug text-semi-color-text-2'>
                          {item.title}
                        </div>
                        <div className='mt-0.5 truncate text-[15px] font-semibold tabular-nums leading-snug tracking-tight text-semi-color-text-0'>
                          <Skeleton
                            loading={loading}
                            active
                            placeholder={
                              <Skeleton.Paragraph
                                active
                                rows={1}
                                style={{
                                  width: '72px',
                                  height: '20px',
                                  marginTop: '2px',
                                }}
                              />
                            }
                          >
                            {item.value}
                          </Skeleton>
                        </div>
                      </div>
                    </div>
                    <div className='flex shrink-0 items-center justify-end'>
                      {item.title === t('当前余额') ? (
                        <Button
                          size='small'
                          type='primary'
                          theme='solid'
                          className='!rounded-full !px-3 !text-xs font-medium shadow-sm'
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/console/topup');
                          }}
                        >
                          {t('充值')}
                        </Button>
                      ) : showSpark ? (
                        <div className='dashboard-stat-sparkline flex h-[2.45rem] w-[6.25rem] shrink-0 items-center justify-end'>
                          {loading ? (
                            <div className='h-7 w-[5rem] animate-pulse rounded-lg bg-[var(--semi-color-fill-2)]/90' />
                          ) : (
                            <StatSparkline
                              data={item.trendData}
                              color={item.trendColor}
                            />
                          )}
                        </div>
                      ) : (
                        <span
                          className='flex h-[2.45rem] w-[6.25rem] items-center justify-center rounded-lg border border-dashed border-[var(--glass-border)]/80 text-xs text-semi-color-text-3'
                          title={t('暂无可展示数据')}
                        >
                          —
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
