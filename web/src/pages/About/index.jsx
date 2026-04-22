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

import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import { marked } from 'marked';
import { Empty, Spin, Typography, Button } from '@douyinfe/semi-ui';
const { Title, Text } = Typography;
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from '@douyinfe/semi-illustrations';
import { useTranslation } from 'react-i18next';
import { IconLink } from '@douyinfe/semi-icons';

const isExternalPageUrl = (value) => {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (
    !trimmed.startsWith('https://') &&
    !trimmed.startsWith('http://')
  ) {
    return false;
  }
  try {
    new URL(trimmed);
    return true;
  } catch {
    return false;
  }
};

const About = () => {
  const { t } = useTranslation();
  const [about, setAbout] = useState('');
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const currentYear = new Date().getFullYear();

  const displayAbout = async () => {
    setAbout(localStorage.getItem('about') || '');
    const res = await API.get('/api/about');
    const { success, message, data } = res.data;
    if (success) {
      let aboutContent = data;
      if (!isExternalPageUrl(data)) {
        aboutContent = marked.parse(data);
      }
      setAbout(aboutContent);
      localStorage.setItem('about', aboutContent);
    } else {
      showError(message);
      setAbout(t('加载关于内容失败...'));
    }
    setAboutLoaded(true);
  };

  useEffect(() => {
    displayAbout().then();
  }, []);

  const customDescription = (
    <div className='about-page-empty-desc text-center max-w-lg mx-auto space-y-4'>
      <Text type='tertiary' className='block'>
        {t(
          '在此输入新的关于内容，支持 Markdown & HTML 代码。如果输入的是一个链接，则会使用该链接作为 iframe 的 src 属性，这允许你设置任意网页作为关于页面',
        )}
      </Text>
      <div className='text-sm text-[var(--semi-color-text-2)] space-y-2'>
        <p>
          {t('Link Think项目仓库地址：')}
          <a
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover ml-1'
          >
            https://github.com/QuantumNous/new-api
          </a>
        </p>
        <p>
          <a
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover'
          >
            NewAPI
          </a>{' '}
          {t('© {{currentYear}}', { currentYear })}{' '}
          <a
            href='https://github.com/QuantumNous'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover'
          >
            QuantumNous
          </a>{' '}
          {t('| 基于')}{' '}
          <a
            href='https://github.com/songquanpeng/one-api/releases/tag/v0.5.4'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover'
          >
            One API v0.5.4
          </a>{' '}
          © 2023{' '}
          <a
            href='https://github.com/songquanpeng'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover'
          >
            JustSong
          </a>
        </p>
        <p>
          {t('本项目根据')}
          <a
            href='https://github.com/songquanpeng/one-api/blob/v0.5.4/LICENSE'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover mx-0.5'
          >
            {t('MIT许可证')}
          </a>
          {t('授权，需在遵守')}
          <a
            href='https://www.gnu.org/licenses/agpl-3.0.html'
            target='_blank'
            rel='noopener noreferrer'
            className='text-semi-color-link hover:text-semi-color-link-hover mx-0.5'
          >
            {t('AGPL v3.0协议')}
          </a>
          {t('的前提下使用。')}
        </p>
      </div>
    </div>
  );

  if (!aboutLoaded) {
    return (
      <div className='about-page about-page--loading min-w-0 flex justify-center items-center min-h-[min(70vh,560px)] px-4'>
        <Spin size='large' />
      </div>
    );
  }

  if (about === '') {
    return (
      <div className='about-page about-page--empty min-w-0 px-4 py-10 sm:py-14'>
        <div className='about-page__hero mx-auto max-w-3xl mb-10 text-center'>
          <p className='about-page__eyebrow font-mono text-xs tracking-[0.2em] uppercase text-neo-accent-2 mb-3'>
            {t('关于')}
          </p>
          <Title
            heading={2}
            className='!font-display !text-[clamp(1.75rem,4vw,2.25rem)] !font-semibold !text-[var(--neo-ink)] !mb-0'
          >
            {t('关于我们')}
          </Title>
        </div>
        <div className='about-page__shell mx-auto max-w-2xl'>
          <div className='about-page__card about-page__card--empty'>
            <Empty
              image={
                <IllustrationConstruction
                  style={{ width: 140, height: 140 }}
                />
              }
              darkModeImage={
                <IllustrationConstructionDark
                  style={{ width: 140, height: 140 }}
                />
              }
              title={
                <span className='text-[var(--semi-color-text-0)]'>
                  {t('管理员暂时未设置任何关于内容')}
                </span>
              }
              description={customDescription}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isExternalPageUrl(about)) {
    const url = about.trim();
    return (
      <div className='about-page about-page--embed min-w-0 px-4 py-10 sm:py-12'>
        <div className='about-page__hero mx-auto max-w-3xl mb-8 text-center'>
          <p className='about-page__eyebrow font-mono text-xs tracking-[0.2em] uppercase text-neo-accent-2 mb-3'>
            {t('关于')}
          </p>
          <Title
            heading={2}
            className='!font-display !text-[clamp(1.5rem,3.5vw,2rem)] !font-semibold !text-[var(--neo-ink)] !mb-3'
          >
            {t('关于我们')}
          </Title>
          <Text type='tertiary' className='!text-[15px]'>
            {t('管理员设置了外部链接，点击下方按钮访问')}
          </Text>
        </div>
        <div className='about-page__shell mx-auto max-w-2xl'>
          <div className='about-page__card about-page__card--link flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8'>
            <div className='flex items-start gap-3 min-w-0 text-left'>
              <span className='mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--semi-color-primary)_12%,transparent)] text-[var(--semi-color-primary)]'>
                <IconLink size='large' />
              </span>
              <div className='min-w-0'>
                <Text strong className='!block !mb-1 truncate' title={url}>
                  {url}
                </Text>
                <Text type='tertiary' className='!text-sm'>
                  {t('在新标签页中打开')}
                </Text>
              </div>
            </div>
            <Button
              theme='solid'
              type='primary'
              className='shrink-0'
              onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            >
              {t('查看')}
            </Button>
          </div>
        </div>
        <div className='about-page__iframe-wrap mx-auto max-w-5xl mt-8 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-neo-glow-lg bg-[var(--semi-color-bg-0)]'>
          <iframe
            title={t('关于')}
            src={url}
            className='w-full min-h-[min(72vh,720px)] border-0 block bg-[var(--semi-color-bg-1)]'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='about-page about-page--content min-w-0 px-4 py-10 sm:py-14 lg:py-16'>
      <div className='about-page__hero mx-auto max-w-3xl mb-10 sm:mb-12 text-center'>
        <p className='about-page__eyebrow font-mono text-xs tracking-[0.2em] uppercase text-neo-accent-2 mb-3'>
          {t('关于')}
        </p>
        <Title
          heading={2}
          className='!font-display !text-[clamp(1.75rem,4vw,2.35rem)] !font-semibold !text-[var(--neo-ink)] !mb-0'
        >
          {t('关于我们')}
        </Title>
      </div>
      <div className='about-page__shell mx-auto max-w-3xl'>
        <article className='about-page__card'>
          <div
            className='about-prose'
            dangerouslySetInnerHTML={{ __html: about }}
          />
        </article>
      </div>
    </div>
  );
};

export default About;
