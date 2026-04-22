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

import React, { useMemo, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import '@douyinfe/semi-ui/react19-adapter';
import { LocaleProvider } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import { StatusContext } from '../context/Status';
import { PrerenderThemeProviders } from '../context/Theme';
import { API_ENDPOINTS } from '../constants/common.constant';
import HomeDefaultMarketing from '../pages/Home/HomeDefaultMarketing';

const noop = () => {};

function PrerenderHomeInner({ serverAddress }) {
  const { t, i18n } = useTranslation();
  const isChinese = i18n.language.startsWith('zh');
  const reduceMotion = true;
  const easeSmooth = useMemo(() => [0.22, 1, 0.36, 1], []);
  const heroListVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0,
          delayChildren: 0,
        },
      },
    }),
    [],
  );
  const heroItemVariants = useMemo(
    () => ({
      hidden: { opacity: 1, y: 0 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: easeSmooth },
      },
    }),
    [easeSmooth],
  );
  const endpointItems = useMemo(
    () => API_ENDPOINTS.map((e) => ({ value: e })),
    [],
  );
  const [endpointIndex, setEndpointIndex] = useState(0);

  return (
    <HomeDefaultMarketing
      t={t}
      isChinese={isChinese}
      isMobile={false}
      reduceMotion={reduceMotion}
      easeSmooth={easeSmooth}
      heroListVariants={heroListVariants}
      heroItemVariants={heroItemVariants}
      isDemoSiteMode={false}
      docsLink=''
      version=''
      serverAddress={serverAddress}
      endpointItems={endpointItems}
      endpointIndex={endpointIndex}
      setEndpointIndex={setEndpointIndex}
      handleCopyBaseURL={noop}
      handleCopySnippet={noop}
    />
  );
}

/**
 * 仅用于构建后注入 dist/index.html；语言固定 zh-CN，主题为 light。
 * 站点地址可通过环境变量 PRERENDER_SITE_ORIGIN 覆盖（用于展示 Base URL 文案）。
 */
export default function PrerenderHome({ i18n }) {
  const origin =
    (typeof process !== 'undefined' && process.env?.PRERENDER_SITE_ORIGIN) ||
    'https://example.com';
  const serverAddress = origin.replace(/\/$/, '');
  const statusState = {
    status: {
      server_address: serverAddress,
      docs_link: '',
      demo_site_enabled: false,
      version: '',
    },
  };

  return (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={['/']}>
        <LocaleProvider locale={zh_CN}>
          <StatusContext.Provider value={[statusState, noop]}>
            <PrerenderThemeProviders>
              <main
                className='w-full min-w-0 overflow-x-clip overflow-y-visible'
                id='home-page'
              >
                <PrerenderHomeInner serverAddress={serverAddress} />
              </main>
            </PrerenderThemeProviders>
          </StatusContext.Provider>
        </LocaleProvider>
      </MemoryRouter>
    </I18nextProvider>
  );
}
