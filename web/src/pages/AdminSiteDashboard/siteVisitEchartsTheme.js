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

/** 从 Semi 设计变量读取，供 ECharts 与页面背景统一 */
export function getSemiEchartsTheme() {
  if (typeof document === 'undefined') {
    return {
      text: '#1c1f23',
      textSecondary: 'rgba(28, 31, 35, 0.62)',
      border: 'var(--semi-color-border, rgba(28, 31, 35, 0.08))',
      primary: 'var(--semi-color-primary, #0077fa)',
      fill0: 'var(--semi-color-fill-0, rgba(46, 50, 56, 0.05))',
    };
  }
  const root = document.documentElement;
  const g = (k) => getComputedStyle(root).getPropertyValue(k).trim();
  return {
    text: g('--semi-color-text-0') || '#1c1f23',
    textSecondary: g('--semi-color-text-2') || 'rgba(28, 31, 35, 0.62)',
    border: g('--semi-color-border') || 'rgba(28, 31, 35, 0.08)',
    primary: g('--semi-color-primary') || '#0077fa',
    fill0: g('--semi-color-fill-0') || 'rgba(46, 50, 56, 0.05)',
  };
}

export const CHART_MIN_HEIGHT = 320;
