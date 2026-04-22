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
} from '@/icons/semiRemix';
import { useNavigate } from 'react-router-dom';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

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
        <header className='mb-6 flex flex-col gap-6 md:mb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8'>
          <div className='text-center lg:text-left'>
            <div className='mb-2 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3 lg:justify-start'>
              <h2
                id='home-providers-title'
                className='m-0 font-display text-xl font-semibold text-semi-color-text-0 md:text-2xl'
              >
                {t('支持众多的大模型供应商')}
              </h2>
              <span className='font-mono text-xs uppercase tracking-[0.2em] text-semi-color-text-2'>
                {t('首页供应商数量标签')}
              </span>
            </div>
            <p className='mx-auto mt-2 max-w-xl text-sm text-semi-color-text-2 lg:mx-0 lg:text-base'>
              {t('首页供应商区说明')}
            </p>
          </div>
          <nav
            aria-labelledby='home-providers-title'
            className='flex flex-wrap items-center justify-center gap-2 lg:justify-end'
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
          className='glass-panel tech-border m-0 flex list-none flex-wrap items-center justify-center gap-4 rounded-[1.25rem] p-6 sm:gap-6 sm:p-8 md:gap-8 lg:gap-10'
        >
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Moonshot size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <OpenAI size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <XAI size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Zhipu.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Volcengine.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Cohere.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Claude.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Gemini.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Suno size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Minimax.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Wenxin.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Spark.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Qingyan.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <DeepSeek.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Qwen.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Midjourney size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Grok size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <AzureAI.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Hunyuan.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <Xinference.Color size={40} />
          </li>
          <li className='flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12'>
            <span className='font-display text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl'>
              30+
            </span>
          </li>
        </ul>
      </div>
    </motion.section>
  );
};

export default HomeProviders;
