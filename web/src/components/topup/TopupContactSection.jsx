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
import { Card, Typography, Button, Tag } from '@douyinfe/semi-ui';
import { SiTelegram } from 'react-icons/si';
import { Copy, ExternalLink, Headphones, QrCode } from 'lucide-react';
import { copy, showSuccess } from '../../helpers';

const { Text } = Typography;

const QQ_GROUP_ID = '1102347361';
const QQ_GROUP_LINK = 'https://qm.qq.com/q/HKewivEwY8';
const TELEGRAM_URL = 'https://t.me/+elDvHQyVxxozYjQ9';
const QR_SRC = '/qq-group-topup-qrcode.png';

const TopupContactSection = ({ t }) => {
  const handleCopyQQ = async () => {
    if (await copy(QQ_GROUP_ID)) {
      showSuccess(t('已复制'));
    }
  };

  const openQQGroupLink = () => {
    window.open(QQ_GROUP_LINK, '_blank', 'noopener,noreferrer');
  };

  const openTelegram = () => {
    window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className='mt-6' aria-labelledby='topup-contact-heading'>
      <Card className='!rounded-2xl overflow-hidden border-0 shadow-md ring-1 ring-[var(--semi-color-border)]'>
        {/* 顶栏：与充值卡片区分的轻量品牌带 */}
        <div className='relative px-5 py-5 sm:px-7 sm:py-6 border-b border-[var(--semi-color-border)] bg-gradient-to-br from-[var(--semi-color-bg-0)] via-transparent to-[var(--semi-color-fill-0)]'>
          <div className='flex items-start gap-4'>
            <div
              className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-1)] shadow-sm'
              aria-hidden
            >
              <Headphones className='h-5 w-5' strokeWidth={2} />
            </div>
            <div className='min-w-0 flex-1 pt-0.5'>
              <h2
                id='topup-contact-heading'
                className='text-base font-semibold tracking-tight text-[var(--semi-color-text-0)] sm:text-lg'
              >
                {t('联系我们')}
              </h2>
              <p className='mt-1.5 text-sm leading-relaxed text-[var(--semi-color-text-2)]'>
                {t('充值或支付遇到问题，可通过以下方式联系')}
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 lg:min-h-[320px]'>
          {/* QQ：左栏 — 群号 + 扫码 */}
          <div className='relative flex flex-col border-b border-[var(--semi-color-border)] p-6 sm:p-8 lg:border-b-0 lg:border-r'>
            <div className='flex flex-wrap items-center gap-2'>
              <Tag
                size='large'
                color='grey'
                className='!rounded-lg !px-2.5 !font-medium'
              >
                QQ
              </Tag>
              <Text strong className='text-[var(--semi-color-text-0)]'>
                {t('QQ 群')}
              </Text>
            </div>

            <div className='mt-4 flex flex-wrap items-center gap-2'>
              <span className='text-xs font-medium uppercase tracking-wide text-[var(--semi-color-text-2)]'>
                {t('群号')}
              </span>
              <div className='flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:flex-nowrap'>
                <code className='truncate rounded-lg bg-[var(--semi-color-fill-0)] px-3 py-1.5 font-mono text-sm font-semibold tabular-nums text-[var(--semi-color-text-0)] ring-1 ring-inset ring-[var(--semi-color-border)]'>
                  {QQ_GROUP_ID}
                </code>
                <div className='flex flex-wrap items-center gap-2'>
                  <Button
                    type='tertiary'
                    size='small'
                    icon={<Copy className='h-3.5 w-3.5' />}
                    onClick={handleCopyQQ}
                    className='!shrink-0 !rounded-lg'
                  >
                    {t('复制群号')}
                  </Button>
                  <Button
                    type='primary'
                    theme='light'
                    size='small'
                    icon={<ExternalLink className='h-3.5 w-3.5' />}
                    onClick={openQQGroupLink}
                    className='!shrink-0 !rounded-lg'
                  >
                    {t('打开加群链接')}
                  </Button>
                </div>
              </div>
            </div>

            <div className='mt-6 flex flex-1 flex-col items-center justify-end sm:mt-8'>
              <div className='relative w-full max-w-[232px]'>
                <div
                  className='absolute -inset-px rounded-[1.125rem] opacity-40 blur-sm'
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(var(--neo-p-rgb), 0.12), rgba(var(--neo-s-rgb), 0.08))',
                  }}
                  aria-hidden
                />
                <div className='relative rounded-2xl bg-[var(--semi-color-bg-0)] p-3.5 shadow-inner ring-1 ring-[var(--semi-color-border)]'>
                  <div className='overflow-hidden rounded-xl bg-white p-2 dark:bg-[var(--semi-color-bg-2)]'>
                    <img
                      src={QR_SRC}
                      alt={t('QQ 群二维码')}
                      width={200}
                      height={200}
                      className='h-auto w-full object-contain'
                      loading='lazy'
                      decoding='async'
                    />
                  </div>
                </div>
                <div className='mt-3 flex items-start justify-center gap-1.5 text-center'>
                  <QrCode
                    className='mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--semi-color-text-3)]'
                    aria-hidden
                  />
                  <span className='text-xs leading-snug text-[var(--semi-color-text-2)]'>
                    {t('扫一扫二维码加入 QQ 群')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Telegram：右栏 — 品牌色强调 */}
          <div className='relative flex flex-col justify-between bg-[var(--semi-color-fill-0)] p-6 sm:p-8'>
            <div
              className='pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]'
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(var(--neo-t-rgb), 0.1), transparent 55%)',
              }}
              aria-hidden
            />
            <div className='relative flex flex-1 flex-col items-center justify-center gap-5 text-center lg:py-2'>
              <div
                className='flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] text-[var(--semi-color-text-0)] shadow-sm'
              >
                <SiTelegram size={40} aria-hidden />
              </div>
              <div className='max-w-xs space-y-1'>
                <Text
                  strong
                  className='!text-base text-[var(--semi-color-text-0)]'
                >
                  Telegram
                </Text>
                <p className='text-sm leading-relaxed text-[var(--semi-color-text-2)]'>
                  {t('加入 Telegram 群组')}
                </p>
              </div>
              <Button
                type='primary'
                theme='solid'
                size='large'
                icon={<SiTelegram className='text-lg' />}
                onClick={openTelegram}
                className='!rounded-xl !px-8 !min-h-11 !font-medium shadow-sm'
              >
                {t('打开 Telegram')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default TopupContactSection;
