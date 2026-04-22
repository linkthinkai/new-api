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
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AuthPageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className='auth-page-shell relative flex min-h-[calc(100dvh-var(--app-header-height))] flex-col overflow-hidden bg-[var(--semi-color-bg-1)]'>
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.22]'
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% -12%, rgba(var(--semi-blue-5), 0.14), transparent 52%), radial-gradient(ellipse 70% 45% at 100% 40%, rgba(139, 92, 246, 0.1), transparent 48%)',
        }}
        aria-hidden
      />
      <div
        className='pointer-events-none absolute inset-0 bg-neo-noise bg-[length:256px_256px] opacity-[0.35] dark:opacity-[0.2]'
        aria-hidden
      />
      <div
        className='blur-ball blur-ball-indigo'
        style={{ top: '-80px', right: '-80px', transform: 'none' }}
        aria-hidden
      />
      <div
        className='blur-ball blur-ball-teal'
        style={{ top: '48%', left: '-120px' }}
        aria-hidden
      />

      <header className='relative z-20 shrink-0 px-4 pt-2 sm:px-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-1.5 text-sm text-[var(--semi-color-text-2)] transition-colors hover:text-[var(--semi-color-text-0)]'
        >
          <ArrowLeft className='h-4 w-4' aria-hidden />
          {t('返回首页')}
        </Link>
      </header>

      {/* flex-1 + justify-center：在「顶栏 + 返回」之下将表单区垂直居中；shell 已用 min-h 对齐可视高度，避免多余滚动 */}
      <div className='relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8'>
        <div className='w-full max-w-[440px]'>{children}</div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
