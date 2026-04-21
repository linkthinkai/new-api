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
import {
  IconLink,
  IconApps,
  IconServer,
  IconCoinMoneyStroked,
} from '@/icons/semiRemix';

const FEATURE_ICONS = [
  IconLink,
  IconApps,
  IconServer,
  IconCoinMoneyStroked,
];

const HomeFeatureGrid = ({ t, reduceMotion, easeSmooth, featureKeys }) => {
  return (
    <motion.section
      className='neo-home-section border-b border-[var(--glass-border)]'
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.5, ease: easeSmooth }
      }
    >
      <div className='neo-home-section-inner'>
        <div className='neo-home-section-head'>
          <h2 className='neo-home-section-title'>{t('首页能力区标题')}</h2>
          <p className='neo-home-section-subtitle'>{t('首页能力区副标题')}</p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5'>
          {featureKeys.map((item, i) => {
            const Icon = FEATURE_ICONS[i] || IconLink;
            return (
              <div
                key={item.titleKey}
                className='neo-home-feature-card glass-panel tech-border'
              >
                <div className='neo-home-feature-icon-wrap'>
                  <Icon className='text-semi-color-primary text-2xl' />
                </div>
                <h3 className='neo-home-feature-title'>{t(item.titleKey)}</h3>
                <p className='neo-home-feature-desc'>{t(item.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default HomeFeatureGrid;
