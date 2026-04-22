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
import HomeHero from '../../components/home/HomeHero';
import HomeFeatureGrid from '../../components/home/HomeFeatureGrid';
import HomeQuickStart from '../../components/home/HomeQuickStart';
import HomeCodeExample from '../../components/home/HomeCodeExample';
import HomeProviders from '../../components/home/HomeProviders';
import { FEATURE_KEYS, HERO_HIGHLIGHT_KEYS, STEP_KEYS } from './homeContentConstants';

/** 无远程自定义首页内容时的默认营销区块（构建时预渲染与客户端共用） */
const HomeDefaultMarketing = ({
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
  handleCopySnippet,
}) => (
  <>
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
      version={version}
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
      version={version}
      docsLink={docsLink}
    />
  </>
);

export default HomeDefaultMarketing;
