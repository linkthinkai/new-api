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
import { IconFile } from '@/icons/semiRemix';
import { useNavigate } from 'react-router-dom';

const HomeQuickStart = ({ t, reduceMotion, easeSmooth, docsLink, stepKeys }) => {
  const navigate = useNavigate();

  return (
    <motion.section
      aria-labelledby='home-quickstart-title'
      className='neo-home-section border-b border-[var(--glass-border)]'
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.52, ease: easeSmooth }
      }
    >
      <div className='neo-home-section-inner'>
        <header className='neo-home-section-head flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <h2 id='home-quickstart-title' className='neo-home-section-title'>
              {t('首页快速开始标题')}
            </h2>
            <p className='neo-home-section-subtitle md:max-w-2xl'>
              {t('首页快速开始副标题')}
            </p>
          </div>
          <nav
            aria-labelledby='home-quickstart-title'
            className='flex flex-wrap gap-2'
          >
            <Button
              type='primary'
              theme='solid'
              className='!rounded-full'
              onClick={() => navigate('/console')}
            >
              {t('首页前往控制台')}
            </Button>
            {docsLink ? (
              <Button
                className='!rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md'
                icon={<IconFile />}
                onClick={() => window.open(docsLink, '_blank')}
              >
                {t('文档')}
              </Button>
            ) : null}
          </nav>
        </header>

        <ol className='mt-10 m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4'>
          {stepKeys.map((step, index) => (
            <li
              key={step.titleKey}
              className='neo-home-step-card glass-panel tech-border relative overflow-hidden'
            >
              <span className='neo-home-step-index' aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='neo-home-step-title'>{t(step.titleKey)}</h3>
              <p className='neo-home-step-desc'>{t(step.descKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
};

export default HomeQuickStart;
