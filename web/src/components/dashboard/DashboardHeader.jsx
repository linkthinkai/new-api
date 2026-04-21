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
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconRefresh, IconSearch } from '@/icons/semiRemix';

const DashboardHeader = ({
  getGreeting,
  greetingVisible,
  showSearchModal,
  refresh,
  loading,
  t,
}) => {
  return (
    <div className='console-dashboard-header mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <h2
        className='text-xl font-semibold tracking-tight text-semi-color-text-0 transition-opacity duration-1000 ease-in-out sm:text-2xl'
        style={{ opacity: greetingVisible ? 1 : 0 }}
      >
        {getGreeting}
      </h2>
      <div className='dashboard-toolbar glass-panel flex items-center gap-2 rounded-2xl px-1.5 py-1.5'>
        <Tooltip content={t('搜索条件')} position='bottom'>
          <Button
            type='tertiary'
            theme='borderless'
            icon={<IconSearch size={18} />}
            onClick={showSearchModal}
            className='!rounded-xl !text-semi-color-text-1 hover:!bg-[var(--semi-color-fill-1)]'
            aria-label={t('搜索条件')}
          />
        </Tooltip>
        <span
          className='mx-0.5 hidden h-5 w-px bg-[var(--glass-border)] sm:inline'
          aria-hidden
        />
        <Tooltip content={t('刷新')} position='bottom'>
          <Button
            type='tertiary'
            theme='borderless'
            icon={<IconRefresh size={18} />}
            onClick={refresh}
            loading={loading}
            className='!rounded-xl !text-semi-color-text-1 hover:!bg-[var(--semi-color-fill-1)]'
            aria-label={t('刷新')}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DashboardHeader;
