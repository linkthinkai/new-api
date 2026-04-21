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

import React, { useId, useMemo } from 'react';

/** Open Chaikin 角切割，保留端点，适合迷你趋势折线 */
function chaikinOpen(points, iterations) {
  if (points.length < 2 || iterations <= 0) return points;
  let pts = points.map((p) => [...p]);
  for (let iter = 0; iter < iterations; iter++) {
    const next = [];
    next.push(pts[0]);
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      next.push([
        0.75 * p[0] + 0.25 * q[0],
        0.75 * p[1] + 0.25 * q[1],
      ]);
      next.push([
        0.25 * p[0] + 0.75 * q[0],
        0.25 * p[1] + 0.75 * q[1],
      ]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

function pointsToLineD(points) {
  if (points.length === 0) return '';
  return points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(' ');
}

/**
 * 控制台统计卡迷你趋势：平滑折线 + 渐变面积，不修改原始数据语义（仅显示层缩放）。
 */
const StatSparkline = ({ data, color = '#3b82f6' }) => {
  const rawId = useId();
  const gradId = `stat-spark-${rawId.replace(/:/g, '')}`;

  const { lineD, areaD, dot } = useMemo(() => {
    const raw = Array.isArray(data)
      ? data.map((v) => Number(v)).filter((v) => !Number.isNaN(v))
      : [];
    if (raw.length === 0) return { lineD: '', areaD: '', dot: null };

    const W = 96;
    const H = 38;
    const padL = 2;
    const padR = 2;
    const padT = 6;
    const padB = 5;
    const iw = W - padL - padR;
    const ih = H - padT - padB;

    if (raw.length === 1) {
      const cx = padL + iw / 2;
      const cy = padT + ih / 2;
      return {
        lineD: '',
        areaD: '',
        dot: { cx, cy, r: 3 },
      };
    }

    let min = Math.min(...raw);
    let max = Math.max(...raw);
    if (min === max) {
      const bump = Math.abs(min) * 0.08 || 1;
      min -= bump;
      max += bump;
    } else {
      const span = max - min;
      min -= span * 0.1;
      max += span * 0.1;
    }

    const pts = raw.map((v, i) => {
      const x = padL + (i / (raw.length - 1)) * iw;
      const y = padT + (1 - (v - min) / (max - min)) * ih;
      return [x, y];
    });

    const smoothIt = raw.length >= 3 ? 2 : 0;
    const smooth = chaikinOpen(pts, smoothIt);
    const d = pointsToLineD(smooth);
    const first = smooth[0];
    const last = smooth[smooth.length - 1];
    const area = `${d} L ${last[0]} ${H - padB} L ${first[0]} ${H - padB} Z`;
    return { lineD: d, areaD: area, dot: null };
  }, [data]);

  if (dot) {
    return (
      <svg
        width='96'
        height='38'
        viewBox='0 0 96 38'
        className='stat-sparkline-svg block'
        aria-hidden
      >
        <circle
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={color}
          opacity={0.85}
        />
      </svg>
    );
  }

  if (!lineD) return null;

  return (
    <svg
      width='96'
      height='38'
      viewBox='0 0 96 38'
      className='stat-sparkline-svg block'
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor={color} stopOpacity='0.28' />
          <stop offset='70%' stopColor={color} stopOpacity='0.06' />
          <stop offset='100%' stopColor={color} stopOpacity='0' />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path
        d={lineD}
        fill='none'
        stroke={color}
        strokeWidth='1.65'
        strokeLinecap='round'
        strokeLinejoin='round'
        vectorEffect='non-scaling-stroke'
      />
    </svg>
  );
};

export default StatSparkline;
