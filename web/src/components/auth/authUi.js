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

/** 第三方 / OAuth 登录注册按钮统一样式 */
export const AUTH_OAUTH_BTN_CLASS =
  'w-full h-11 !rounded-xl justify-center border border-[var(--semi-color-border)] !bg-[var(--semi-color-bg-0)] hover:!bg-[var(--semi-color-fill-0)] transition-colors duration-200 shadow-sm';

/** 主操作：邮箱登录 / 注册入口 */
export const AUTH_PRIMARY_ENTRY_CLASS =
  'w-full min-h-[2.75rem] h-auto py-2.5 !rounded-xl !inline-flex !items-center !justify-center font-semibold leading-normal shadow-md';

/** 表单内主按钮（提交） */
export const AUTH_FORM_SUBMIT_CLASS =
  'w-full min-h-[2.75rem] h-auto py-2.5 !rounded-xl !inline-flex !items-center !justify-center font-semibold leading-normal';

/** 次要文字链接（去注册 / 去登录） */
export const AUTH_INLINE_LINK_CLASS =
  'font-medium text-[rgb(var(--semi-blue-5))] hover:underline underline-offset-2';

/** 协议内嵌链接 */
export const AUTH_POLICY_LINK_CLASS =
  'text-[rgb(var(--semi-blue-5))] hover:underline mx-0.5';
