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

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../../helpers';

const DEBOUNCE_MS = 500;

/**
 * 向服务端上报当前前端路由，用于全站访问统计（含 IP 与中文地区解析）
 */
export default function SiteVisitBeacon() {
  const location = useLocation();
  const timerRef = useRef(null);
  const lastPathRef = useRef('');

  useEffect(() => {
    const fullPath = `${location.pathname}${location.search || ''}`;
    if (fullPath === lastPathRef.current) {
      return;
    }
    lastPathRef.current = fullPath;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      API.get('/api/site_visit/ping', {
        params: { path: fullPath },
        skipErrorHandler: true,
      }).catch(() => {});
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.pathname, location.search]);

  return null;
}
