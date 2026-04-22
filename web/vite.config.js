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

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.json': 'json',
      },
    },
  },
  build: {
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion/react'],
          'semi-ui': ['@douyinfe/semi-icons', '@douyinfe/semi-ui'],
          tools: ['axios', 'history', 'marked'],
          'react-components': [
            'react-dropzone',
            'react-fireworks',
            'react-telegram-login',
            'react-toastify',
            'react-turnstile',
          ],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
          vchart: ['@visactor/react-vchart', '@visactor/vchart'],
          mermaid: ['mermaid'],
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
