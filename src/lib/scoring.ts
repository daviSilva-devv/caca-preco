import type { Decision } from './types.ts';

export type ScoreBreakdown = {
  belowAverage: number;
  nearMinimum: number;
  meaningfulDrop: number;
  deepDiscount: number;
  total: number;
};

export function calculateScoreBreakdown(
  price: number,
  average30: number,
  minimum90: number,
  dropPct: number
): ScoreBreakdown {
  const belowAverage = price < average30 ? 30 : 0;
  const nearMinimum = price <= minimum90 * 1.02 ? 40 : 0;
  const meaningfulDrop = dropPct >= 10 ? 20 : 0;
  const deepDiscount = price < average30 * 0.9 ? 10 : 0;
  const total = Math.min(belowAverage + nearMinimum + meaningfulDrop + deepDiscount, 100);

  return { belowAverage, nearMinimum, meaningfulDrop, deepDiscount, total };
}

export function calculateScore(price: number, average30: number, minimum90: number, dropPct: number) {
  return calculateScoreBreakdown(price, average30, minimum90, dropPct).total;
}

export function getDecision(score: number): Decision {
  if (score >= 75) return 'COMPRA AGORA';
  if (score >= 45) return 'ESPERA';
  return 'CARO';
}

export function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  }).format(value);
}
