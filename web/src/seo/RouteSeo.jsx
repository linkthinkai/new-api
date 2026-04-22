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

import React, { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusContext } from '../context/Status';
import { getSystemName } from '../helpers';
import {
  buildOgImageUrl,
  OG_IMAGE_PATH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_TYPE_WEBSITE,
} from './ogConstants';
import { buildDocumentTitle, resolveSeoConfig } from './seoContent';

/**
 * 随路由与语言更新 <title>、description、Open Graph 与 noindex 等，利于搜索引擎与分享预览。
 */
function RouteSeo() {
  const { pathname, search, hash } = useLocation();
  const { i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);

  const siteName = statusState?.status?.system_name || getSystemName();
  const config = useMemo(
    () => resolveSeoConfig(pathname, i18n.language),
    [pathname, i18n.language],
  );
  const title = useMemo(
    () => buildDocumentTitle(siteName, config),
    [siteName, config],
  );

  const htmlLang = i18n.language && i18n.language.toLowerCase().startsWith('en')
    ? 'en'
    : 'zh';

  const origin =
    typeof window !== 'undefined' ? window.location.origin : '';
  const pathOnly = `${pathname}${search}${hash}`;
  const canonical =
    origin ? `${origin}${pathOnly || '/'}` : pathOnly || '/';

  const imageUrl = buildOgImageUrl(origin);

  const ogLocale = config.lang === 'en' ? 'en_US' : 'zh_CN';
  const ogLocaleAlt = config.lang === 'en' ? 'zh_CN' : 'en_US';

  const websiteJsonLd = useMemo(() => {
    if (pathname !== '/' || !config.index) {
      return null;
    }
    const json = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: origin ? `${origin}/` : '/',
      description: config.description,
    };
    if (origin) {
      json.image = `${origin}${OG_IMAGE_PATH}`;
    }
    return JSON.stringify(json);
  }, [pathname, config.index, config.description, siteName, origin]);

  return (
    <Helmet htmlAttributes={{ lang: htmlLang }}>
      <title>{title}</title>
      <meta
        name='description'
        content={config.description}
        lang={config.lang}
      />
      {config.index ? (
        <meta name='robots' content='index, follow' />
      ) : (
        <meta name='robots' content='noindex, follow' />
      )}
      {canonical && <link rel='canonical' href={canonical} />}

      <meta property='og:type' content={OG_TYPE_WEBSITE} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={config.description} />
      <meta property='og:locale' content={ogLocale} />
      <meta property='og:locale:alternate' content={ogLocaleAlt} />
      {canonical && <meta property='og:url' content={canonical} />}
      {imageUrl ? (
        <>
          <meta property='og:image' content={imageUrl} />
          <meta property='og:image:width' content={String(OG_IMAGE_WIDTH)} />
          <meta property='og:image:height' content={String(OG_IMAGE_HEIGHT)} />
          <meta property='og:image:type' content='image/png' />
          <meta property='og:image:alt' content={siteName} />
        </>
      ) : null}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={config.description} />
      {imageUrl ? (
        <>
          <meta name='twitter:image' content={imageUrl} />
          <meta name='twitter:image:alt' content={siteName} />
        </>
      ) : null}

      {websiteJsonLd && (
        <script type='application/ld+json'>{websiteJsonLd}</script>
      )}
    </Helmet>
  );
}

export default RouteSeo;
