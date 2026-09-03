import test from 'node:test';
import assert from 'node:assert/strict';
import { getBestOffer, getProductById, products } from '../src/lib/catalog.ts';
import { calculateScore, getDecision } from '../src/lib/scoring.ts';

test('public catalog contains unique product ids', () => {
  const ids = products.map((product) => product.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every public product is explicitly synthetic', () => {
  assert.ok(products.length > 0);
  assert.ok(products.every((product) => product.dataMode === 'synthetic-demo'));
});

test('catalog decisions match the scoring rule', () => {
  for (const product of products) {
    const score = calculateScore(product.currentPrice, product.average30, product.min90, product.dropPct);
    assert.equal(product.score, score);
    assert.equal(product.decision, getDecision(score));
  }
});

test('best offer returns the minimum store price', () => {
  const product = products[0];
  assert.ok(product);
  const best = getBestOffer(product);
  assert.equal(best?.price, Math.min(...product.stores.map((offer) => offer.price)));
});

test('product lookup returns known ids and rejects unknown ids', () => {
  assert.equal(getProductById('rtx-4060')?.shortName, 'RTX 4060');
  assert.equal(getProductById('missing-product'), undefined);
});
