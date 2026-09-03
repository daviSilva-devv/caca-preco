'use client';

import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { BellRing } from 'lucide-react';
import { products } from '@/lib/catalog';

export default function AlertsPage() {
  const searchParams = useSearchParams();
  const defaultProduct = searchParams.get('produto') ?? products[0]?.id ?? '';
  const [productId, setProductId] = useState(defaultProduct);
  const [targetPrice, setTargetPrice] = useState('');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setReceipt(null);

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId, targetPrice: targetPrice ? Number(targetPrice) : undefined, channel: 'web' })
      });
      const data = await response.json();
      setReceipt(data.ok ? data.alert.id : data.error ?? 'Falha ao criar alerta demo');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="alerts-page">
      <div className="page-intro">
        <span className="eyebrow">alert contract</span>
        <h1>Configure o gatilho. Sem fingir persistência.</h1>
        <p>A rota valida o pedido e devolve um recibo de demonstração. Nesta fase pública, nenhum alerta é armazenado.</p>
      </div>
      <form className="alert-form" onSubmit={submit}>
        <div className="alert-form-icon"><BellRing size={28} /></div>
        <label>Produto<select value={productId} onChange={(event) => setProductId(event.target.value)}>{products.map((product) => <option key={product.id} value={product.id}>{product.shortName}</option>)}</select></label>
        <label>Preço alvo (R$)<input inputMode="decimal" placeholder="Ex.: 1799" value={targetPrice} onChange={(event) => setTargetPrice(event.target.value)} /></label>
        <button className="primary-button" type="submit" disabled={pending}>{pending ? 'Criando…' : 'Criar alerta demo'}</button>
        <small>Demo only · persisted: false</small>
        {receipt ? <output className="alert-receipt">{receipt}</output> : null}
      </form>
    </section>
  );
}
