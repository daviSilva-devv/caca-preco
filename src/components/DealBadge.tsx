import type { Decision } from '@/lib/types';

export function DealBadge({ decision, score }: { decision: Decision; score: number }) {
  const tone = decision === 'COMPRA AGORA' ? 'buy' : decision === 'ESPERA' ? 'wait' : 'expensive';

  return (
    <span className="deal-badge" data-tone={tone}>
      <span>{decision}</span>
      <strong>{score}</strong>
    </span>
  );
}
