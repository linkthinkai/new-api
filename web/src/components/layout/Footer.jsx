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

import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@douyinfe/semi-ui';
import { getFooterHTML, getLogo, getSystemName } from '../../helpers';
import { StatusContext } from '../../context/Status';

const FooterBar = () => {
  const { t } = useTranslation();
  const [footer, setFooter] = useState(getFooterHTML());
  const systemName = getSystemName();
  const logo = getLogo();
  const [statusState] = useContext(StatusContext);
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const currentYear = new Date().getFullYear();

  const customFooter = useMemo(
    () => (
      <footer
        className={`relative h-auto w-full overflow-hidden border-t border-[var(--glass-border)]/60 bg-[var(--glass-bg)]/90 px-4 backdrop-blur-md md:px-8 flex flex-col items-center justify-between ${
          isDemoSiteMode ? 'py-8 md:py-10' : 'py-2 md:py-2.5'
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-[length:48px_48px] bg-[linear-gradient(rgba(var(--neo-p-rgb),0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--neo-p-rgb),0.04)_1px,transparent_1px)] ${
            isDemoSiteMode ? 'opacity-[0.32]' : 'opacity-[0.12]'
          }`}
          aria-hidden
        />

        {isDemoSiteMode && (
          <div className='relative z-[1] flex flex-col md:flex-row justify-between w-full max-w-[1110px] mb-10 gap-8'>
            <div className='flex-shrink-0'>
              <img
                src={logo}
                alt={systemName}
                className='w-16 h-16 rounded-full bg-gray-800 p-1.5 object-contain'
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full'>
              <div className='text-left'>
                <p className='!text-semi-color-text-0 font-semibold mb-5'>
                  {t('关于我们')}
                </p>
                <div className='flex flex-col gap-4'>
                  <a
                    href='https://docs.newapi.pro/wiki/project-introduction/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    {t('关于项目')}
                  </a>
                  <a
                    href='https://docs.newapi.pro/support/community-interaction/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    {t('联系我们')}
                  </a>
                  <a
                    href='https://docs.newapi.pro/wiki/features-introduction/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    {t('功能特性')}
                  </a>
                </div>
              </div>

              <div className='text-left'>
                <p className='!text-semi-color-text-0 font-semibold mb-5'>
                  {t('文档')}
                </p>
                <div className='flex flex-col gap-4'>
                  <a
                    href='https://docs.newapi.pro/getting-started/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    {t('快速开始')}
                  </a>
                  <a
                    href='https://docs.newapi.pro/installation/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    {t('安装指南')}
                  </a>
                  <a
                    href='https://docs.newapi.pro/api/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    {t('API 文档')}
                  </a>
                </div>
              </div>

              <div className='text-left'>
                <p className='!text-semi-color-text-0 font-semibold mb-5'>
                  {t('相关项目')}
                </p>
                <div className='flex flex-col gap-4'>
                  <a
                    href='https://github.com/songquanpeng/one-api'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    One API
                  </a>
                  <a
                    href='https://github.com/novicezk/midjourney-proxy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    Midjourney-Proxy
                  </a>
                  <a
                    href='https://github.com/Calcium-Ion/neko-api-key-tool'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    neko-api-key-tool
                  </a>
                </div>
              </div>

              <div className='text-left'>
                <p className='!text-semi-color-text-0 font-semibold mb-5'>
                  {t('友情链接')}
                </p>
                <div className='flex flex-col gap-4'>
                  <a
                    href='https://github.com/Calcium-Ion/new-api-horizon'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    new-api-horizon
                  </a>
                  <a
                    href='https://github.com/coaidev/coai'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    CoAI
                  </a>
                  <a
                    href='https://www.gpt-load.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='!text-semi-color-text-1'
                  >
                    GPT-Load
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`relative z-[1] flex w-full max-w-[1110px] flex-col items-center justify-between gap-3 md:flex-row ${
            isDemoSiteMode ? 'md:gap-6' : 'md:gap-4'
          }`}
        >
          <div className='flex flex-wrap items-center gap-2'>
            <Typography.Text
              className={`!text-semi-color-text-2 ${isDemoSiteMode ? 'text-sm' : 'text-xs'}`}
            >
              © {currentYear} {systemName}. {t('版权所有')}
            </Typography.Text>
          </div>

          <div className={isDemoSiteMode ? 'text-sm' : 'text-xs'}>
            <span className='!text-semi-color-text-2'>
              {t('设计与开发由')}{' '}
            </span>
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='!text-semi-color-primary font-medium opacity-90 hover:opacity-100'
            >
              New API
            </a>
          </div>
        </div>
      </footer>
    ),
    [logo, systemName, t, currentYear, isDemoSiteMode],
  );

  useEffect(() => {
    loadFooter();
  }, []);

  return (
    <div className='w-full'>
      {footer ? (
        <footer className='relative flex h-auto w-full items-center justify-center overflow-hidden border-t border-[var(--glass-border)]/60 bg-[var(--glass-bg)]/90 px-4 py-2 backdrop-blur-md md:px-8 md:py-2.5'>
          <div className='flex w-full max-w-[1110px] flex-col items-center justify-between gap-2 md:flex-row md:gap-4'>
            <div
              className='custom-footer na-cb6feafeb3990c78 text-xs !text-semi-color-text-2 md:text-sm'
              dangerouslySetInnerHTML={{ __html: footer }}
            ></div>
            <div className='flex-shrink-0 text-xs md:text-sm'>
              <span className='!text-semi-color-text-2'>
                {t('设计与开发由')}{' '}
              </span>
              <a
                href='https://github.com/QuantumNous/new-api'
                target='_blank'
                rel='noopener noreferrer'
                className='!text-semi-color-primary font-medium opacity-90 hover:opacity-100'
              >
                New API
              </a>
            </div>
          </div>
        </footer>
      ) : (
        customFooter
      )}
    </div>
  );
};

export default FooterBar;
