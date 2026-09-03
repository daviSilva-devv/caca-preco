import type { Metadata } from 'next';
import { AlertForm } from '@/components/AlertForm';
import { getProductById, products } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Alertas' };

export default async function AlertsPage({ searchParams }: { searchParams: Promise<{ produto?: string }> }) {
  const query = await searchParams;
  const requested = query.produto;
  const defaultProductId = requested && getProductById(requested) ? requested : products[0]?.id ?? '';

  return (
    <section className="alerts-page">
      <div className="page-intro">
        <span className="eyebrow">alert contract</span>
        <h1>Configure o gatilho. Sem fingir persistência.</h1>
        <p>A rota valida o pedido e devolve um recibo de demonstração. Nesta fase pública, nenhum alerta é armazenado.</p>
      </div>
      <AlertForm defaultProductId={defaultProductId} />
    </section>
  );
}
