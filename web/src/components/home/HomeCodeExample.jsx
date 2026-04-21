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
import { motion } from 'motion/react';
import { Button } from '@douyinfe/semi-ui';
import { IconCopy } from '@/icons/semiRemix';

const HomeCodeExample = ({
  t,
  serverAddress,
  reduceMotion,
  easeSmooth,
  onCopySnippet,
}) => {
  const snippet = useMemo(() => {
    const base = serverAddress.replace(/\/$/, '');
    return `curl "${base}/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{ "role": "user", "content": "Hello!" }]
  }'`;
  }, [serverAddress]);

  return (
    <motion.section
      className='neo-home-section border-b border-[var(--glass-border)]'
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.52, ease: easeSmooth }
      }
    >
      <div className='neo-home-section-inner'>
        <div className='neo-home-section-head'>
          <h2 className='neo-home-section-title'>{t('首页代码示例标题')}</h2>
          <p className='neo-home-section-subtitle'>{t('首页代码示例说明')}</p>
        </div>

        <div className='neo-home-code-panel'>
          <div className='neo-home-code-toolbar'>
            <span className='font-mono text-[11px] uppercase tracking-widest text-semi-color-text-2'>
              curl · chat/completions
            </span>
            <Button
              size='small'
              type='tertiary'
              icon={<IconCopy />}
              className='!rounded-lg'
              onClick={() => onCopySnippet(snippet)}
            >
              {t('首页复制示例')}
            </Button>
          </div>
          <pre className='neo-home-code-block'>
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </motion.section>
  );
};

export default HomeCodeExample;
