import type { Metadata } from 'next';
import { SwipeDeck } from '@/components/SwipeDeck';
import { products } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Swipe' };

export default function SwipePage() {
  return (
    <section className="swipe-page">
      <div className="page-intro">
        <span className="eyebrow">decision deck</span>
        <h1>Um feed de ofertas que você resolve com o polegar.</h1>
        <p>Arraste os cards e use o score como apoio. Nesta build pública, as ações são demonstrativas.</p>
      </div>
      <SwipeDeck products={products} />
    </section>
  );
}
