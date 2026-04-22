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

import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from '@douyinfe/vite-plugin-semi';
import path from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';
const { vitePluginSemi } = pkg;

const analyze = process.env.ANALYZE === 'true';

/** @param {string} id */
function matchDep(id, pkg) {
  const normalized = id.replace(/\\/g, '/');
  if (!normalized.includes('/node_modules/')) return false;
  if (pkg.startsWith('@')) {
    const [scope, name] = pkg.split('/');
    return normalized.includes(`/node_modules/${scope}/${name}/`);
  }
  return normalized.includes(`/node_modules/${pkg}/`);
}

/** Rolldown：勿用已弃用的 output.manualChunks（大项目下易卡死）；用 codeSplitting.groups */
const VENDOR_CHUNK_GROUPS = [
  {
    name: 'react-core',
    test: (id) =>
      matchDep(id, 'react') ||
      matchDep(id, 'react-dom') ||
      matchDep(id, 'react-router-dom'),
  },
  { name: 'motion', test: (id) => matchDep(id, 'motion') },
  {
    name: 'semi-ui',
    test: (id) =>
      matchDep(id, '@douyinfe/semi-icons') ||
      matchDep(id, '@douyinfe/semi-ui'),
  },
  {
    name: 'tools',
    test: (id) =>
      matchDep(id, 'axios') ||
      matchDep(id, 'history') ||
      matchDep(id, 'marked'),
  },
  {
    name: 'react-components',
    test: (id) =>
      matchDep(id, 'react-dropzone') ||
      matchDep(id, 'react-fireworks') ||
      matchDep(id, 'react-telegram-login') ||
      matchDep(id, 'react-toastify') ||
      matchDep(id, 'react-turnstile'),
  },
  {
    name: 'i18n',
    test: (id) =>
      matchDep(id, 'i18next') ||
      matchDep(id, 'react-i18next') ||
      matchDep(id, 'i18next-browser-languagedetector'),
  },
  {
    name: 'vchart',
    test: (id) =>
      matchDep(id, '@visactor/react-vchart') || matchDep(id, '@visactor/vchart'),
  },
  { name: 'mermaid', test: (id) => matchDep(id, 'mermaid') },
];

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // @douyinfe/semi-ui@2.90+ 的 exports 未公开 dist/css，保留历史引用路径
      '@douyinfe/semi-ui/dist/css/semi.css': path.resolve(
        __dirname,
        'node_modules/@douyinfe/semi-ui/dist/css/semi.css',
      ),
      // roughjs 的 browser 入口为 IIFE，Rolldown 无法提供 default 导出；强制使用 ESM 构建
      roughjs: path.resolve(
        __dirname,
        'node_modules/roughjs/bundled/rough.esm.js',
      ),
    },
  },
  plugins: [
    command === 'serve' &&
      codeInspectorPlugin({
        bundler: 'vite',
      }),
    react({
      // 空数组为 truthy，使 build 走 SWC 分支；见 plugin-react-swc 源码
      plugins: [],
      parserConfig(id) {
        const f = id.split('?')[0];
        if (f.endsWith('.tsx')) {
          return { syntax: 'typescript', tsx: true, decorators: false };
        }
        if (f.endsWith('.ts') || f.endsWith('.mts')) {
          return { syntax: 'typescript', tsx: false, decorators: false };
        }
        if (f.endsWith('.jsx')) {
          return { syntax: 'ecmascript', jsx: true };
        }
        if (f.endsWith('.mdx')) {
          return { syntax: 'ecmascript', jsx: true };
        }
        if (f.endsWith('.js') && /\/src\//.test(f)) {
          return { syntax: 'ecmascript', jsx: true };
        }
        return undefined;
      },
    }),
    tailwindcss(),
    vitePluginSemi({
      cssLayer: true,
    }),
    analyze &&
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        open: false,
        template: 'treemap',
      }),
  ].filter(Boolean),
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
        '.json': 'json',
      },
    },
  },
  build: {
    reportCompressedSize: false,
    rolldownOptions: {
      // lottie-web（Semi 依赖）在播放器里对表达式使用 eval，Rolldown 会报 EVAL；与业务代码无关
      onLog(level, log, defaultHandler) {
        if (level !== 'warn' || typeof log !== 'object' || !log) {
          defaultHandler(level, log);
          return;
        }
        if (log.code === 'EVAL') {
          const id = log.id ?? '';
          const file = log.loc?.file ?? '';
          if (id.includes('lottie-web') || file.includes('lottie-web')) {
            return;
          }
        }
        defaultHandler(level, log);
      },
      output: {
        codeSplitting: {
          groups: VENDOR_CHUNK_GROUPS,
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://www.linkthinkai.com',
        changeOrigin: true,
      },
      '/mj': {
        target: 'https://www.linkthinkai.com',
        changeOrigin: true,
      },
      '/pg': {
        target: 'https://www.linkthinkai.com',
        changeOrigin: true,
      },
    },
  },
}));
