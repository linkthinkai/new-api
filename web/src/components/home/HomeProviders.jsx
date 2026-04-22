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
import { motion } from 'motion/react';
import { Button } from '@douyinfe/semi-ui';
import {
  IconGithubLogo,
  IconFile,
  IconPriceTag,
  IconLayers,
  IconApps,
  IconHistogram,
} from '@/icons/semiRemix';
import { useNavigate } from 'react-router-dom';

const UPSTREAM_CARDS = [
  {
    titleKey: '首页上游卡片1标题',
    descKey: '首页上游卡片1说明',
    Icon: IconLayers,
  },
  {
    titleKey: '首页上游卡片2标题',
    descKey: '首页上游卡片2说明',
    Icon: IconApps,
  },
  {
    titleKey: '首页上游卡片3标题',
    descKey: '首页上游卡片3说明',
    Icon: IconHistogram,
  },
];

const HomeProviders = ({
  t,
  reduceMotion,
  easeSmooth,
  isDemoSiteMode,
  version,
  docsLink,
}) => {
  const navigate = useNavigate();

  return (
    <motion.section
      aria-labelledby='home-providers-title'
      className='neo-home-section pb-16 md:pb-20'
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.55, ease: easeSmooth }
      }
    >
      <div className='neo-home-section-inner'>
        <header className='neo-home-section-head mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-8'>
          <div className='min-w-0 text-center md:text-left'>
            <h2
              id='home-providers-title'
              className='neo-home-section-title'
            >
              {t('首页上游生态标题')}
            </h2>
            <p className='neo-home-section-subtitle md:max-w-2xl'>
              {t('首页上游生态说明')}
            </p>
          </div>
          <nav
            aria-label={t('首页上游生态标题')}
            className='flex flex-shrink-0 flex-wrap items-center justify-center gap-2 md:justify-end'
          >
            <Button
              icon={<IconPriceTag />}
              className='!rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md'
              onClick={() => navigate('/pricing')}
            >
              {t('首页查看定价')}
            </Button>
            <Button
              type='primary'
              theme='solid'
              className='!rounded-full'
              onClick={() => navigate('/console')}
            >
              {t('首页进入控制台')}
            </Button>
            {isDemoSiteMode && version ? (
              <Button
                icon={<IconGithubLogo />}
                className='!rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md'
                onClick={() =>
                  window.open(
                    'https://github.com/QuantumNous/new-api',
                    '_blank',
                  )
                }
              >
                {version}
              </Button>
            ) : (
              docsLink && (
                <Button
                  icon={<IconFile />}
                  className='!rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md'
                  onClick={() => window.open(docsLink, '_blank')}
                >
                  {t('文档')}
                </Button>
              )
            )}
          </nav>
        </header>
        <ul
          role='list'
          className='m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5'
        >
          {UPSTREAM_CARDS.map(({ titleKey, descKey, Icon }) => (
            <li key={titleKey} className='min-w-0'>
              <article className='neo-home-feature-card glass-panel tech-border h-full'>
                <div className='neo-home-feature-icon-wrap'>
                  <Icon
                    className='text-semi-color-primary text-2xl'
                    aria-hidden
                  />
                </div>
                <h3 className='neo-home-feature-title'>{t(titleKey)}</h3>
                <p className='neo-home-feature-desc'>{t(descKey)}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default HomeProviders;
