export type Decision = 'COMPRA AGORA' | 'ESPERA' | 'CARO';

export type StoreName = 'Mercado Livre' | 'Amazon' | 'Magalu' | 'Shopee' | 'KaBuM';

export type StoreOffer = {
  store: StoreName;
  price: number;
  shipping: string;
  url: string | null;
};

export type PricePoint = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  currentPrice: number;
  average30: number;
  min90: number;
  max90: number;
  dropPct: number;
  score: number;
  decision: Decision;
  insight: string;
  reason: string;
  emoji: string;
  stores: StoreOffer[];
  history: PricePoint[];
  dataMode: 'synthetic-demo';
};
