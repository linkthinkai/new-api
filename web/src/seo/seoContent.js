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

/** @typedef {{ title?: string, description: string, index: boolean, homeTitleOnly?: boolean }} SeoConfig */

/** 可收录的 path 与 sitemapPublicPaths.js 中的列表应对齐（新公开页时两处同步改）。 */

const HOME = {
  zh: {
    description:
      '一站式 AI 大模型聚合与 API 网关：将 OpenAI、Claude、Gemini、Azure 及多种 LLM 统一接入同一套接口，支持协议互转与 OpenAI 兼容端点，集中管理渠道、密钥、用量与计费。个人开发者与企业团队一套 Base URL 即可多模型灵活切换，成本与调用透明可观测、可运维，稳定高可用，适用于联调、生产与多环境隔离，让 AI 能力落地更快、更稳、更可控。',
  },
  en: {
    description:
      'One API gateway for OpenAI, Claude, Gemini & more: compatible APIs, cross-format routing, keys & usage. Switch models with one Base URL—clarity, speed, control.',
  },
};

/** 精确 path -> SEO（title 为页面段，渲染为「{title} - {siteName}」，首页仅有站点名时见 homeTitleOnly） */
const BY_PATH = {
  '/': {
    zh: { ...HOME.zh, index: true, homeTitleOnly: true },
    en: { ...HOME.en, index: true, homeTitleOnly: true },
  },
  '/about': {
    zh: {
      title: '关于我们',
      description:
        '了解平台定位、开源 new-api 技术栈与能力边界：多模型聚合、统一鉴权与运维理念，帮助您判断本服务是否适合开发测试、生产 traffic 或企业级 AI 中台场景。',
      index: true,
    },
    en: {
      title: 'About',
      description:
        'Learn what this platform does, how it relates to the new-api open-source stack, and where it fits—from experiments to production AI traffic and team-wide governance.',
      index: true,
    },
  },
  '/pricing': {
    zh: {
      title: '模型定价',
      description:
        '按模型与用量维度的公开计价与计费说明，快速估算对话、补全与多模态调用成本，便于做预算、选模型与对比不同供应商与倍率策略。',
      index: true,
    },
    en: {
      title: 'Model pricing',
      description:
        'Model-level pricing and billing rules so you can estimate chat, completion, and multimodal costs—compare options, plan budgets, and pick the right models with confidence.',
      index: true,
    },
  },
  '/user-agreement': {
    zh: {
      title: '用户协议',
      description:
        '使用本 AI 网关服务前请完整阅读用户协议：权利义务、可接受使用范围、服务变更与责任限制，保障您与平台双方的合规与清晰预期。',
      index: true,
    },
    en: {
      title: 'User agreement',
      description:
        'Read the terms of use before you rely on this AI gateway: acceptable use, rights and responsibilities, service changes, and limitations—clarity for you and the platform.',
      index: true,
    },
  },
  '/privacy-policy': {
    zh: {
      title: '隐私政策',
      description:
        '我们如何处理账户信息、使用数据与日志：收集目的、存储与安全措施、您的权利与删除渠道，在提供 AI 聚合能力的同时尊重数据最小化与隐私合规。',
      index: true,
    },
    en: {
      title: 'Privacy policy',
      description:
        'How we handle account, usage, and log data: why we collect it, how we secure it, and your rights—including deletion—while we run this AI aggregation service responsibly.',
      index: true,
    },
  },
  '/login': {
    zh: { title: '登录', description: '用户登录。', index: false },
    en: { title: 'Log in', description: 'User sign in.', index: false },
  },
  '/register': {
    zh: { title: '注册', description: '创建新账户。', index: false },
    en: { title: 'Sign up', description: 'Create an account.', index: false },
  },
  '/reset': {
    zh: { title: '找回密码', description: '通过邮箱重设密码。', index: false },
    en: { title: 'Password reset', description: 'Reset your password by email.', index: false },
  },
  '/user/reset': {
    zh: { title: '重设密码', description: '完成密码重设。', index: false },
    en: { title: 'Confirm password reset', description: 'Complete password reset.', index: false },
  },
  '/setup': {
    zh: { title: '初始化安装', description: '站点安装向导。', index: false },
    en: { title: 'Setup', description: 'Initial installation wizard.', index: false },
  },
  '/forbidden': {
    zh: { title: '无权限', description: '您没有权限访问该资源。', index: false },
    en: { title: 'Forbidden', description: 'You do not have permission to access this resource.', index: false },
  },
  '/console': {
    zh: { title: '控制台', description: '用户与用量概览。', index: false },
    en: { title: 'Console', description: 'Usage overview.', index: false },
  },
  '/chat2link': {
    zh: { title: '聊天链接', description: '从链接进入对话。', index: false },
    en: { title: 'Chat from link', description: 'Open a chat from a link.', index: false },
  },
  '_not_found': {
    zh: { title: '页面未找到', description: '您访问的页面不存在。', index: false },
    en: { title: 'Not found', description: 'The page does not exist.', index: false },
  },
  '_private': {
    zh: { title: '控制台', description: '账户与资源管理。', index: false },
    en: { title: 'Console', description: 'Account and resource management.', index: false },
  },
  '_oauth': {
    zh: { title: '授权回调', description: 'OAuth 授权处理中。', index: false },
    en: { title: 'OAuth callback', description: 'OAuth redirect handling.', index: false },
  },
};

/**
 * @param {string} pathname
 * @param {string} language i18n 语言
 * @returns {SeoConfig & { lang: 'zh' | 'en' }}
 */
export function resolveSeoConfig(pathname, language) {
  const lang = language && language.toLowerCase().startsWith('en') ? 'en' : 'zh';
  if (BY_PATH[pathname]) {
    return { ...BY_PATH[pathname][lang], lang };
  }
  if (pathname.startsWith('/console')) {
    return { ...BY_PATH._private[lang], lang };
  }
  if (pathname.startsWith('/oauth/')) {
    return { ...BY_PATH._oauth[lang], lang };
  }
  if (pathname.startsWith('/oauth')) {
    return { ...BY_PATH._oauth[lang], lang };
  }
  return { ...BY_PATH._not_found[lang], lang };
}

/**
 * 页面标题展示：除首页外为「{seg} - {siteName}」
 * @param {string} siteName
 * @param {SeoConfig & { lang: 'zh' | 'en' }} config
 */
export function buildDocumentTitle(siteName, config) {
  if (config.homeTitleOnly) {
    return siteName;
  }
  if (config.title) {
    return `${config.title} - ${siteName}`;
  }
  return siteName;
}
