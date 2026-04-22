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

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distIndex = resolve(__dirname, '../dist/index.html');

const dom = new JSDOM(
  '<!DOCTYPE html><html><head></head><body></body></html>',
  { url: 'http://localhost', pretendToBeVisual: true },
);

const { window } = dom;
for (const key of [
  'Element',
  'SVGElement',
  'HTMLElement',
  'Document',
  'DocumentFragment',
  'Event',
  'Node',
  'Text',
  'Comment',
  'DOMParser',
  'localStorage',
  'sessionStorage',
]) {
  if (window[key] != null) {
    globalThis[key] = window[key];
  }
}
globalThis.window = window;
globalThis.document = window.document;

// lottie-web（Semi 间接依赖）在模块加载时会探测 canvas
window.HTMLCanvasElement.prototype.getContext = function getContextMock() {
  return {
    canvas: this,
    fillStyle: '',
    strokeStyle: '',
    save: () => {},
    restore: () => {},
    fillRect: () => {},
    clearRect: () => {},
    beginPath: () => {},
    closePath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fill: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    transform: () => {},
    setTransform: () => {},
    drawImage: () => {},
    measureText: () => ({ width: 0 }),
    arc: () => {},
    rect: () => {},
    clip: () => {},
    createImageData: () => ({ data: new Uint8ClampedArray(4) }),
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    putImageData: () => {},
  };
};

const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');
const { initPrerenderI18n } = await import('../src/prerender/i18n-instance.js');
const { default: PrerenderHome } = await import('../src/prerender/PrerenderHome.jsx');

const i18n = await initPrerenderI18n();
let html = readFileSync(distIndex, 'utf8');
const appHtml = renderToString(
  React.createElement(PrerenderHome, { i18n }),
);
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  console.error('prerender-home: dist/index.html 中未找到', marker);
  process.exit(1);
}
html = html.replace(marker, `<div id="root">${appHtml}</div>`);
writeFileSync(distIndex, html);
console.log('prerender-home: 已写入 dist/index.html');
