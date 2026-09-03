import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';
import { DealBadge } from '@/components/DealBadge';
import { PriceSparkline } from '@/components/PriceSparkline';
import { StoreComparison } from '@/components/StoreComparison';
import { getProductById } from '@/lib/catalog';
import { currency } from '@/lib/scoring';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product?.shortName ?? 'Produto' };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <section className="detail-page">
      <Link className="back-link" href="/"><ArrowLeft size={16} /> catálogo</Link>
      <div className="detail-hero">
        <div className="detail-visual" aria-hidden="true">{product.emoji}</div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category} · dados sintéticos</span>
          <h1>{product.name}</h1>
          <DealBadge decision={product.decision} score={product.score} />
          <p>{product.reason}</p>
          <div className="detail-price">
            <span>preço atual demo</span><strong>{currency(product.currentPrice)}</strong>
            <small>{product.dropPct}% abaixo do ponto de referência usado no demo</small>
          </div>
          <Link className="primary-button" href={`/alertas?produto=${product.id}`}><Bell size={17} /> Criar alerta demo</Link>
        </div>
      </div>

      <div className="detail-grid">
        <article className="detail-panel">
          <div className="panel-heading"><span>histórico</span><strong>10 pontos sintéticos</strong></div>
          <PriceSparkline data={product.history} height={180} />
          <div className="metric-grid">
            <div><span>média 30d</span><strong>{currency(product.average30)}</strong></div>
            <div><span>mínima 90d</span><strong>{currency(product.min90)}</strong></div>
            <div><span>máxima 90d</span><strong>{currency(product.max90)}</strong></div>
          </div>
        </article>
        <article className="detail-panel">
          <div className="panel-heading"><span>comparação</span><strong>ofertas demo</strong></div>
          <StoreComparison offers={product.stores} />
        </article>
      </div>
    </section>
  );
}
