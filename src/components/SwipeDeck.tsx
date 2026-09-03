'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Heart, RotateCcw, X } from 'lucide-react';
import { currency } from '@/lib/scoring';
import type { Product } from '@/lib/types';
import type { SwipeAction } from '@/lib/swipe-action';
import { DealBadge } from './DealBadge';
import { PriceSparkline } from './PriceSparkline';

const swipeThreshold = 110;

export function SwipeDeck({ products }: { products: Product[] }) {
  const [queue, setQueue] = useState(products);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const current = queue[0];
  const remaining = useMemo(() => queue.length, [queue.length]);

  async function register(action: SwipeAction) {
    if (!current) return;

    const product = current;
    setQueue((items) => items.slice(1));
    setLastAction(`${product.shortName} · ${action}`);

    try {
      await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId: product.id, action })
      });
    } catch {
      // Public demo: the gesture still advances locally if the route is unavailable.
    }
  }

  function reset() {
    setQueue(products);
    setLastAction(null);
  }

  if (!current) {
    return (
      <section className="swipe-empty">
        <span className="eyebrow">fim do deck</span>
        <h2>Você viu todos os produtos do demo.</h2>
        <p>Os gestos são demonstrativos e não são persistidos no servidor.</p>
        <button className="primary-button" type="button" onClick={reset}>
          <RotateCcw size={17} /> Recomeçar
        </button>
        {lastAction ? <small>Última ação: {lastAction}</small> : null}
      </section>
    );
  }

  return (
    <section className="swipe-stage">
      <div className="swipe-counter">{remaining} no deck</div>

      <AnimatePresence mode="popLayout">
        <motion.article
          key={current.id}
          className="swipe-card"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.65}
          whileDrag={{ rotate: 2, scale: 1.015 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > swipeThreshold) void register('like');
            if (info.offset.x < -swipeThreshold) void register('pass');
          }}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <div className="swipe-visual" aria-hidden="true"><span>{current.emoji}</span></div>

          <div className="swipe-copy">
            <div className="swipe-title-row">
              <div>
                <p className="eyebrow">{current.category}</p>
                <h2>{current.shortName}</h2>
              </div>
              <DealBadge decision={current.decision} score={current.score} />
            </div>

            <p className="swipe-insight">{current.insight}</p>

            <div className="swipe-price-grid">
              <div><span>agora</span><strong>{currency(current.currentPrice)}</strong></div>
              <div><span>média 30d</span><strong>{currency(current.average30)}</strong></div>
              <div><span>mín. 90d</span><strong>{currency(current.min90)}</strong></div>
            </div>

            <div className="chart-box"><PriceSparkline data={current.history} height={82} /></div>
            <p className="swipe-reason">{current.reason}</p>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="swipe-actions" aria-label="Ações do swipe">
        <button type="button" className="action-button danger" onClick={() => void register('pass')} aria-label="Passar"><X size={22} /></button>
        <button type="button" className="action-button alert" onClick={() => void register('alert')} aria-label="Criar alerta demo"><Bell size={21} /></button>
        <button type="button" className="action-button like" onClick={() => void register('like')} aria-label="Gostei"><Heart size={21} /></button>
      </div>

      <p className="gesture-hint">arraste ← para passar · → para salvar · o sino demonstra um alerta</p>
    </section>
  );
}
