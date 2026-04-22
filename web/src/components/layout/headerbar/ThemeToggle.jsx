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
import { Button, Dropdown } from '@douyinfe/semi-ui';
import { RemixIcon } from '@/icons/semiRemix';
import { useActualTheme } from '../../../context/Theme';

const ThemeToggle = ({ theme, onThemeToggle, t }) => {
  const actualTheme = useActualTheme();

  const themeOptions = useMemo(
    () => [
      {
        key: 'light',
        icon: <RemixIcon icon='ri-sun-line' size={18} />,
        buttonIcon: <RemixIcon icon='ri-sun-line' size={18} />,
        label: t('浅色模式'),
        description: t('始终使用浅色主题'),
      },
      {
        key: 'dark',
        icon: <RemixIcon icon='ri-moon-line' size={18} />,
        buttonIcon: <RemixIcon icon='ri-moon-line' size={18} />,
        label: t('深色模式'),
        description: t('始终使用深色主题'),
      },
      {
        key: 'auto',
        icon: <RemixIcon icon='ri-computer-line' size={18} />,
        buttonIcon: <RemixIcon icon='ri-computer-line' size={18} />,
        label: t('自动模式'),
        description: t('跟随系统主题设置'),
      },
    ],
    [t],
  );

  const getItemClassName = (isSelected) =>
    isSelected
      ? '!bg-semi-color-primary-light-default !font-semibold'
      : 'hover:!bg-semi-color-fill-1';

  const currentButtonIcon = useMemo(() => {
    const currentOption = themeOptions.find((option) => option.key === theme);
    return currentOption?.buttonIcon || themeOptions[2].buttonIcon;
  }, [theme, themeOptions]);

  return (
    <Dropdown
      position='bottomRight'
      render={
        <Dropdown.Menu>
          {themeOptions.map((option) => (
            <Dropdown.Item
              key={option.key}
              icon={option.icon}
              onClick={() => onThemeToggle(option.key)}
              className={getItemClassName(theme === option.key)}
            >
              <div className='flex flex-col'>
                <span>{option.label}</span>
                <span className='text-xs text-semi-color-text-2'>
                  {option.description}
                </span>
              </div>
            </Dropdown.Item>
          ))}

          {theme === 'auto' && (
            <>
              <Dropdown.Divider />
              <div className='px-3 py-2 text-xs text-semi-color-text-2'>
                {t('当前跟随系统')}：
                {actualTheme === 'dark' ? t('深色') : t('浅色')}
              </div>
            </>
          )}
        </Dropdown.Menu>
      }
    >
      <span className='inline-flex' aria-label={t('切换主题')}>
        <Button
          icon={currentButtonIcon}
          theme='borderless'
          type='tertiary'
          className='neo-topbar-icon-btn'
          tabIndex={-1}
        />
      </span>
    </Dropdown>
  );
};

export default ThemeToggle;
