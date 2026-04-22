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

/** 对应 web/public/logo.png，构建后位于站点根路径 */
export const OG_IMAGE_PATH = '/logo.png';

/** 与 public/logo.png 资源一致，用于 og:image:width/height */
export const OG_IMAGE_WIDTH = 1024;
export const OG_IMAGE_HEIGHT = 1024;

/** 全站主类型：多页 SPA 的落地站与列表类页面使用 website */
export const OG_TYPE_WEBSITE = 'website';

/**
 * @param {string} origin window.location.origin，无则返回相对路径
 */
export function buildOgImageUrl(origin) {
  if (!origin) {
    return OG_IMAGE_PATH;
  }
  return `${origin}${OG_IMAGE_PATH}`;
}
