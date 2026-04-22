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

/**
 * 构建后生成 dist/sitemap.xml，并在有站点根 URL 时向 dist/robots.txt 追加 Sitemap:。
 * 可收录路径来自 src/seo/sitemapPublicPaths.js（与 seoContent 中 index: true 一致）。
 *
 * 用法：SITEMAP_BASE_URL=https://你的正式域名  bun run build
 * 支持环境变量：SITEMAP_BASE_URL 或 VITE_SITEMAP_BASE_URL
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITEMAP_URL_ENTRIES } from '../src/seo/sitemapPublicPaths.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const sitemapFile = join(distDir, 'sitemap.xml');
const robotsFile = join(distDir, 'robots.txt');

function normalizeBase(u) {
  if (!u || typeof u !== 'string') return '';
  return u.replace(/\/+$/, '');
}

const base = normalizeBase(
  process.env.SITEMAP_BASE_URL || process.env.VITE_SITEMAP_BASE_URL,
);

if (!base || !/^https?:\/\//i.test(base)) {
  console.warn(
    '[sitemap] 未设置 SITEMAP_BASE_URL（或 VITE_SITEMAP_BASE_URL），已跳过 sitemap / robots 中的 Sitemap 行。部署示例: SITEMAP_BASE_URL=https://example.com bun run build',
  );
  process.exit(0);
}

const lastmod = new Date().toISOString().split('T')[0];

function locFor(path) {
  if (path === '/') {
    return `${base}/`;
  }
  return `${base}${path}`;
}

const urlBlocks = SITEMAP_URL_ENTRIES.map(
  (e) => `  <url>
    <loc>${locFor(e.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join('\n')}
</urlset>
`;

if (!existsSync(distDir)) {
  console.error('[sitemap] 未找到 dist/，请先执行 vite build');
  process.exit(1);
}

writeFileSync(sitemapFile, xml, 'utf8');
console.log(
  `[sitemap] 已写入 dist/sitemap.xml（${SITEMAP_URL_ENTRIES.length} 条）`,
);

if (existsSync(robotsFile)) {
  const sitemapLine = `Sitemap: ${base}/sitemap.xml`;
  const lines = readFileSync(robotsFile, 'utf8').split(/\r?\n/);
  const withoutDirective = lines.filter((line) => {
    const t = line.trim();
    if (t.startsWith('#')) return true;
    return !/^\s*Sitemap\s*:\s*/i.test(line);
  });
  const out = `${withoutDirective.join('\n').replace(/\s*$/, '')}\n\n${sitemapLine}\n`;
  writeFileSync(robotsFile, out, 'utf8');
  console.log('[sitemap] 已更新 dist/robots.txt 中的 Sitemap 声明');
} else {
  console.warn(
    '[sitemap] 未找到 dist/robots.txt，请确保 public/robots.txt 存在并已被复制到 dist',
  );
}
