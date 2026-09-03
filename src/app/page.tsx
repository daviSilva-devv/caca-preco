import Link from 'next/link';
import { ArrowRight, BellRing, Layers3, Radar } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/catalog';

export default function HomePage() {
  const buyNow = products.filter((product) => product.decision === 'COMPRA AGORA').length;

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">produto / frontend / decision layer</span>
          <h1>Descubra quando o preço realmente faz sentido.</h1>
          <p>Um experimento de descoberta de ofertas que transforma histórico de preço em uma decisão simples: comprar, esperar ou passar.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/swipe">Abrir swipe <ArrowRight size={17} /></Link>
            <Link className="secondary-button" href="#catalogo">Ver catálogo demo</Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-orbit" aria-hidden="true"><Radar size={34} /></div>
          <div className="hero-stat"><span>produtos demo</span><strong>{String(products.length).padStart(2, '0')}</strong></div>
          <div className="hero-stat"><span>compra agora</span><strong>{String(buyNow).padStart(2, '0')}</strong></div>
          <div className="hero-stat"><span>feeds reais</span><strong>00</strong></div>
          <p>O catálogo, preços e ofertas desta versão são sintéticos e existem apenas para demonstrar o produto.</p>
        </div>
      </section>

      <section className="feature-strip" aria-label="Capacidades do projeto">
        <div><Layers3 size={18} /><span>score determinístico</span></div>
        <div><Radar size={18} /><span>histórico de preço</span></div>
        <div><BellRing size={18} /><span>contrato de alertas</span></div>
      </section>

      <section className="section" id="catalogo">
        <div className="section-heading">
          <div><span className="eyebrow">catálogo sintético</span><h2>Decisões antes do checkout.</h2></div>
          <p>Os cards preservam a ideia original do Caça Preço sem fingir integrações de marketplace que ainda não existem.</p>
        </div>
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="section architecture-preview">
        <div><span className="eyebrow">public boundary</span><h2>O produto já tem forma. Os dados reais vêm depois.</h2></div>
        <div className="boundary-grid">
          <article><strong>IMPLEMENTADO</strong><p>Swipe, score, catálogo, histórico, comparação, páginas e APIs de demonstração.</p></article>
          <article><strong>DEMO</strong><p>Preços, lojas, alertas e registros de swipe são sintéticos ou não persistidos.</p></article>
          <article><strong>ROADMAP</strong><p>Integrações oficiais, autenticação, banco, afiliados e push notifications.</p></article>
        </div>
      </section>
    </>
  );
}
