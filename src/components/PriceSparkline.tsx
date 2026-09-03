import type { PricePoint } from '@/lib/types';

export function PriceSparkline({ data, height = 96 }: { data: PricePoint[]; height?: number }) {
  if (data.length < 2) return null;

  const width = 320;
  const prices = data.map((point) => point.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const span = Math.max(max - min, 1);
  const padding = 8;

  const coordinates = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = padding + ((max - point.price) / span) * (height - padding * 2);
    return { x, y };
  });
  const points = coordinates.map(({ x, y }) => `${x},${y}`).join(' ');
  const last = coordinates.at(-1)!;

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Histórico de preço">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="4" fill="currentColor" />
    </svg>
  );
}
