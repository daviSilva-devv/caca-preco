import { currency } from '@/lib/scoring';
import type { StoreOffer } from '@/lib/types';

export function StoreComparison({ offers }: { offers: StoreOffer[] }) {
  const sorted = [...offers].sort((a, b) => a.price - b.price);

  return (
    <div className="store-table" role="table" aria-label="Comparação de lojas">
      {sorted.map((offer, index) => (
        <div className="store-row" role="row" key={`${offer.store}-${offer.price}`}>
          <div>
            <span className="rank">0{index + 1}</span>
            <strong>{offer.store}</strong>
          </div>
          <span>{offer.shipping}</span>
          <strong>{currency(offer.price)}</strong>
        </div>
      ))}
    </div>
  );
}
