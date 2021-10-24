import React, { useMemo } from 'react';

const n = (n) => Math.round(n * 1000) / 1000;

const parse = (p) => `${n(p.x)} ${n(p.y)}`;

function getTriangle(degrees) {
  const normDegrees = Math.max(30, Math.min(60, degrees - 15));
  const mid = (normDegrees * Math.PI) / 360;
  const dist = 5 / Math.cos(mid);

  const pl = {
    x: Math.cos(mid) * dist,
    y: Math.sin(mid) * dist,
  };

  const pr = {
    x: Math.cos(-mid) * dist,
    y: Math.sin(-mid) * dist,
  };

  return `M ${parse(pl)} Q 0 0 ${parse(pr)} T 10 0 T ${parse(pl)}`;
}

export default function ElementImage(props) {
  const { style, total, selected = 1, highlighted, onClick } = props;
  const elements = useMemo(
    () => Array.from({ length: total }, (_, i) => i),
    [total]
  );

  const degrees = useMemo(() => 360 / total, [total]);
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-12 -12 24 24"
      style={style}
    >
      {elements.map((i) => (
        <path
          key={i}
          transform={`rotate(${degrees * i} 0 0)`}
          d={getTriangle(degrees)}
          stroke={highlighted ? '#585800' : '#0000AA'}
          strokeWidth="0.5"
          fill={
            selected >= i ? (highlighted ? '#f1f100' : '#6666FF') : '#FFFFFF'
          }
        />
      ))}
    </svg>
  );
}
