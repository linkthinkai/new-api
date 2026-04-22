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
import { Button, Input, ScrollList, ScrollItem } from '@douyinfe/semi-ui';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
} from '@/icons/semiRemix';
import { useNavigate } from 'react-router-dom';

const HomeHero = ({
  t,
  isChinese,
  isMobile,
  reduceMotion,
  easeSmooth,
  heroListVariants,
  heroItemVariants,
  isDemoSiteMode,
  docsLink,
  version,
  serverAddress,
  endpointItems,
  endpointIndex,
  setEndpointIndex,
  handleCopyBaseURL,
  heroHighlights,
}) => {
  const navigate = useNavigate();

  return (
    <motion.section
      aria-labelledby='home-hero-title'
      className='relative isolate w-full min-h-[520px] md:min-h-[600px] lg:min-h-[640px] overflow-hidden border-b border-[var(--glass-border)]'
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.45, ease: easeSmooth }
      }
    >
      <div className='home-hero-backdrop' aria-hidden>
        <motion.span
          className='blur-ball blur-ball-indigo blur-ball--hero block'
          initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 1.1, ease: easeSmooth }
          }
        />
        <motion.span
          className='blur-ball blur-ball-teal blur-ball--hero block'
          initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.2, ease: easeSmooth, delay: 0.08 }
          }
        />
      </div>
      <span
        className='pointer-events-none absolute inset-0 z-[1] block opacity-[0.55] dark:opacity-[0.35] bg-neo-noise bg-[length:256px_256px]'
        aria-hidden
      />

      <div className='relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16'>
        <motion.div
          className='grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14'
          variants={heroListVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.header
            className='text-center lg:col-span-6 lg:text-left'
            variants={heroItemVariants}
          >
            <p
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-1.5 text-[11px] font-semibold text-semi-color-text-2 shadow-sm backdrop-blur-md ${isChinese ? 'tracking-wide' : 'uppercase tracking-[0.28em]'}`}
            >
              <span className='h-2 w-2 shrink-0 animate-pulse rounded-full bg-semi-color-primary' />
              {t('首页徽章')}
            </p>

            <h1
              id='home-hero-title'
              className={`font-display text-4xl font-extrabold leading-[1.06] text-semi-color-text-0 sm:text-5xl lg:text-6xl xl:text-7xl ${isChinese ? 'tracking-wide' : 'tracking-tight'}`}
            >
              {t('首页Hero标题上')}
              <span className='mt-2 block shine-text lg:mt-3'>
                {t('首页Hero标题下')}
              </span>
            </h1>

            <p className='mx-auto mt-6 max-w-xl text-base leading-relaxed text-semi-color-text-1 md:text-lg lg:mx-0'>
              {t('首页Hero导语')}
            </p>

            <ul className='mx-auto mt-6 flex max-w-xl list-none flex-col gap-2 p-0 text-left text-sm text-semi-color-text-2 lg:mx-0'>
              {heroHighlights.map((key) => (
                <li key={key} className='flex items-start gap-2'>
                  <span
                    className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-semi-color-primary'
                    aria-hidden
                  />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            <nav
              aria-labelledby='home-hero-title'
              className='mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start'
            >
              <Button
                theme='solid'
                type='primary'
                size={isMobile ? 'default' : 'large'}
                className='!rounded-full px-8 font-semibold shadow-sm'
                icon={<IconPlay />}
                onClick={() => navigate('/console')}
              >
                {t('首页Hero主按钮')}
              </Button>
              {isDemoSiteMode && version ? (
                <Button
                  size={isMobile ? 'default' : 'large'}
                  className='flex items-center !rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 backdrop-blur-md'
                  icon={<IconGithubLogo />}
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
                    size={isMobile ? 'default' : 'large'}
                    className='flex items-center !rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 backdrop-blur-md'
                    icon={<IconFile />}
                    onClick={() => window.open(docsLink, '_blank')}
                  >
                    {t('首页Hero次按钮')}
                  </Button>
                )
              )}
            </nav>
          </motion.header>

          <motion.aside
            aria-label='Base URL'
            className='lg:col-span-6'
            variants={heroItemVariants}
          >
            <div className='neo-hero-panel p-5 md:p-7'>
              <div className='mb-4 flex items-center justify-between gap-3'>
                <span className='font-mono text-[11px] font-medium uppercase tracking-widest text-semi-color-text-2'>
                  BASE_ENDPOINT
                </span>
                <span className='rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-0.5 font-mono text-[10px] text-semi-color-primary'>
                  TLS · LIVE
                </span>
              </div>
              <Input
                readonly
                value={serverAddress}
                className='!rounded-2xl !border-[var(--glass-border)] !bg-[var(--glass-bg)] font-mono text-sm shadow-inner'
                size={isMobile ? 'default' : 'large'}
                suffix={
                  <div className='flex items-center gap-2'>
                    <ScrollList
                      bodyHeight={32}
                      style={{
                        border: 'unset',
                        boxShadow: 'unset',
                        background: 'transparent',
                      }}
                    >
                      <ScrollItem
                        mode='wheel'
                        cycled={true}
                        list={endpointItems}
                        selectedIndex={endpointIndex}
                        onSelect={({ index }) => setEndpointIndex(index)}
                      />
                    </ScrollList>
                    <Button
                      type='primary'
                      onClick={handleCopyBaseURL}
                      icon={<IconCopy />}
                      className='!rounded-xl'
                    />
                  </div>
                }
              />
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeHero;
