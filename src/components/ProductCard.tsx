import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { currency } from '@/lib/scoring';
import { getBestOffer } from '@/lib/catalog';
import type { Product } from '@/lib/types';
import { DealBadge } from './DealBadge';
import { PriceSparkline } from './PriceSparkline';

export function ProductCard({ product }: { product: Product }) {
  const bestOffer = getBestOffer(product);

  return (
    <article className="product-card">
      <div className="product-card-head">
        <div className="product-emoji" aria-hidden="true">{product.emoji}</div>
        <Link className="icon-link" href={`/produto/${product.id}`} aria-label={`Abrir ${product.shortName}`}>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <DealBadge decision={product.decision} score={product.score} />
      <p className="eyebrow">{product.category}</p>
      <h3>{product.shortName}</h3>
      <p className="product-insight">{product.insight}</p>

      <div className="price-row">
        <div>
          <span>Preço demo</span>
          <strong>{currency(product.currentPrice)}</strong>
        </div>
        <div className="drop-pill">-{product.dropPct}%</div>
      </div>

      <div className="chart-box">
        <PriceSparkline data={product.history} />
      </div>

      <div className="card-meta">
        <span>Melhor oferta simulada</span>
        <strong>{bestOffer ? `${bestOffer.store} · ${currency(bestOffer.price)}` : '—'}</strong>
      </div>
    </article>
  );
}
