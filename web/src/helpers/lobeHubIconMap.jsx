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

import { Layers } from 'lucide-react';
import * as LobeHubIconModules from '@lobehub/icons/es/icons.js';

// 全量使用 @lobehub/icons 的品牌图标子集（见包内 es/icons.js），以支持如 Stepfun.Color、Baichuan.Color 等任意名称
// 注意：会增大打包体积；Layers 为 lucide 的通用回退
export const LOBE_HUB_ICON_COMPONENTS = {
  ...LobeHubIconModules,
  Layers,
};

export { Layers };
export * from '@lobehub/icons/es/icons.js';
