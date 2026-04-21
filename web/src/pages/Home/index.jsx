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

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import NoticeModal from '../../components/layout/NoticeModal';
import HomeHero from '../../components/home/HomeHero';
import HomeFeatureGrid from '../../components/home/HomeFeatureGrid';
import HomeQuickStart from '../../components/home/HomeQuickStart';
import HomeCodeExample from '../../components/home/HomeCodeExample';
import HomeProviders from '../../components/home/HomeProviders';

const HERO_HIGHLIGHT_KEYS = [
  '首页亮点·统一兼容',
  '首页亮点·多云聚合',
  '首页亮点·用量可视',
  '首页亮点·成本弹性',
];

const FEATURE_KEYS = [
  {
    titleKey: '首页能力·统一接口',
    descKey: '首页能力·统一接口描述',
  },
  {
    titleKey: '首页能力·聚合供应商',
    descKey: '首页能力·聚合供应商描述',
  },
  {
    titleKey: '首页能力·路由稳定',
    descKey: '首页能力·路由稳定描述',
  },
  {
    titleKey: '首页能力·成本可控',
    descKey: '首页能力·成本可控描述',
  },
];

const STEP_KEYS = [
  {
    titleKey: '首页步骤·注册与登录',
    descKey: '首页步骤·注册与登录描述',
  },
  {
    titleKey: '首页步骤·获取API密钥',
    descKey: '首页步骤·获取API密钥描述',
  },
  {
    titleKey: '首页步骤·替换BaseURL',
    descKey: '首页步骤·替换BaseURL描述',
  },
  {
    titleKey: '首页步骤·调用接口',
    descKey: '首页步骤·调用接口描述',
  },
];

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = useMemo(
    () => API_ENDPOINTS.map((e) => ({ value: e })),
    [],
  );
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isChinese = i18n.language.startsWith('zh');
  const reduceMotion = useReducedMotion();

  const easeSmooth = useMemo(() => [0.22, 1, 0.36, 1], []);

  const heroListVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.1,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    }),
    [reduceMotion],
  );

  const heroItemVariants = useMemo(
    () => ({
      hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: easeSmooth },
      },
    }),
    [easeSmooth, reduceMotion],
  );

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  const handleCopySnippet = async (snippet) => {
    const ok = await copy(snippet);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='w-full overflow-x-hidden'>
          <HomeHero
            t={t}
            isChinese={isChinese}
            isMobile={isMobile}
            reduceMotion={reduceMotion}
            easeSmooth={easeSmooth}
            heroListVariants={heroListVariants}
            heroItemVariants={heroItemVariants}
            isDemoSiteMode={isDemoSiteMode}
            docsLink={docsLink}
            version={statusState?.status?.version}
            serverAddress={serverAddress}
            endpointItems={endpointItems}
            endpointIndex={endpointIndex}
            setEndpointIndex={setEndpointIndex}
            handleCopyBaseURL={handleCopyBaseURL}
            heroHighlights={HERO_HIGHLIGHT_KEYS}
          />
          <HomeFeatureGrid
            t={t}
            reduceMotion={reduceMotion}
            easeSmooth={easeSmooth}
            featureKeys={FEATURE_KEYS}
          />
          <HomeQuickStart
            t={t}
            reduceMotion={reduceMotion}
            easeSmooth={easeSmooth}
            docsLink={docsLink}
            stepKeys={STEP_KEYS}
          />
          <HomeCodeExample
            t={t}
            serverAddress={serverAddress}
            reduceMotion={reduceMotion}
            easeSmooth={easeSmooth}
            onCopySnippet={handleCopySnippet}
          />
          <HomeProviders
            t={t}
            reduceMotion={reduceMotion}
            easeSmooth={easeSmooth}
            isDemoSiteMode={isDemoSiteMode}
            version={statusState?.status?.version}
            docsLink={docsLink}
          />
        </div>
      ) : (
        <div className='w-full overflow-x-hidden'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='h-screen w-full border-none'
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
