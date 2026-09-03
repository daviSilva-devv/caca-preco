import { calculateScore, getDecision } from './scoring.ts';
import type { Product, StoreName } from './types.ts';

type RawOffer = [store: StoreName, price: number, shipping: string];

type RawProduct = Omit<Product, 'score' | 'decision' | 'stores' | 'history' | 'dataMode'> & {
  stores: RawOffer[];
  history: number[];
};

const rawProducts: RawProduct[] = [
  {
    id: 'iphone-15-128',
    name: 'iPhone 15 128GB Preto',
    shortName: 'iPhone 15',
    category: 'Smartphones',
    currentPrice: 3899,
    average30: 4399,
    min90: 3849,
    max90: 4899,
    dropPct: 14,
    emoji: '📱',
    insight: 'Preço perto da mínima dos últimos 90 dias.',
    reason: 'Queda forte, várias ofertas simuladas e histórico favorável para compra agora.',
    history: [4599, 4499, 4449, 4399, 4299, 4199, 4099, 4049, 3999, 3899],
    stores: [
      ['Mercado Livre', 3899, 'Frete grátis'],
      ['Amazon', 3979, 'Prime'],
      ['Magalu', 4029, 'Retira loja'],
      ['Shopee', 4099, 'Cupom disponível']
    ]
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2ª geração USB-C',
    shortName: 'AirPods Pro 2',
    category: 'Áudio',
    currentPrice: 1599,
    average30: 1899,
    min90: 1549,
    max90: 2099,
    dropPct: 18,
    emoji: '🎧',
    insight: 'Oferta agressiva para fone premium.',
    reason: 'Desconto acima da média e preço muito próximo do menor ponto observado.',
    history: [2099, 1999, 1949, 1899, 1829, 1779, 1699, 1649, 1629, 1599],
    stores: [
      ['Amazon', 1599, 'Prime'],
      ['Mercado Livre', 1649, 'Frete grátis'],
      ['Magalu', 1699, 'Retira loja'],
      ['Shopee', 1749, 'Cupom disponível']
    ]
  },
  {
    id: 'ps5-slim',
    name: 'PlayStation 5 Slim Edição Digital',
    shortName: 'PS5 Slim',
    category: 'Games',
    currentPrice: 3199,
    average30: 3299,
    min90: 2899,
    max90: 3699,
    dropPct: 4,
    emoji: '🎮',
    insight: 'Ainda não é uma queda rara.',
    reason: 'Preço caiu pouco e já apareceu mais barato em ciclos recentes.',
    history: [3699, 3599, 3499, 3399, 3299, 3199, 3099, 2999, 3299, 3199],
    stores: [
      ['Magalu', 3199, 'Retira loja'],
      ['Amazon', 3299, 'Prime'],
      ['Mercado Livre', 3349, 'Frete grátis'],
      ['KaBuM', 3399, 'Sedex']
    ]
  },
  {
    id: 'rtx-4060',
    name: 'GeForce RTX 4060 8GB',
    shortName: 'RTX 4060',
    category: 'Hardware',
    currentPrice: 1849,
    average30: 2199,
    min90: 1829,
    max90: 2499,
    dropPct: 16,
    emoji: '🧊',
    insight: 'Menor faixa de preço em semanas.',
    reason: 'Score alto por queda recente, proximidade da mínima e bom preço vs. média.',
    history: [2499, 2399, 2299, 2249, 2199, 2099, 1999, 1949, 1899, 1849],
    stores: [
      ['KaBuM', 1849, 'Entrega rápida'],
      ['Mercado Livre', 1899, 'Frete grátis'],
      ['Amazon', 1969, 'Prime'],
      ['Magalu', 2049, 'Retira loja']
    ]
  },
  {
    id: 'geladeira-inverter',
    name: 'Geladeira Frost Free Inverter 425L',
    shortName: 'Geladeira Inverter',
    category: 'Casa',
    currentPrice: 3549,
    average30: 3699,
    min90: 3299,
    max90: 4199,
    dropPct: 5,
    emoji: '❄️',
    insight: 'Dá para esperar cupom melhor.',
    reason: 'Produto caro e volumoso; a diferença atual não compensa pressa.',
    history: [4199, 4099, 3999, 3899, 3799, 3699, 3599, 3499, 3699, 3549],
    stores: [
      ['Magalu', 3549, 'Frete calculado'],
      ['Mercado Livre', 3649, 'Frete grátis'],
      ['Amazon', 3799, 'Prime'],
      ['Shopee', 3899, 'Cupom disponível']
    ]
  }
];

export const products: Product[] = rawProducts.map((product) => {
  const score = calculateScore(product.currentPrice, product.average30, product.min90, product.dropPct);

  return {
    ...product,
    score,
    decision: getDecision(score),
    stores: product.stores.map(([store, price, shipping]) => ({ store, price, shipping, url: null })),
    history: product.history.map((price, index) => ({ label: `D${index + 1}`, price })),
    dataMode: 'synthetic-demo'
  };
});

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getBestOffer(product: Product) {
  return [...product.stores].sort((a, b) => a.price - b.price)[0] ?? null;
}
