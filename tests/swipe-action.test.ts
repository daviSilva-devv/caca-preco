import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProductId, normalizeSwipeAction } from '../src/lib/swipe-action.ts';

test('keeps canonical like action', () => {
  assert.equal(normalizeSwipeAction({ action: 'like' }), 'like');
});

test('keeps canonical pass and alert actions', () => {
  assert.equal(normalizeSwipeAction({ action: 'pass' }), 'pass');
  assert.equal(normalizeSwipeAction({ action: 'alert' }), 'alert');
});

test('maps legacy right to like', () => {
  assert.equal(normalizeSwipeAction({ direction: 'right' }), 'like');
});

test('maps legacy left and skip to pass', () => {
  assert.equal(normalizeSwipeAction({ direction: 'left' }), 'pass');
  assert.equal(normalizeSwipeAction({ direction: 'skip' }), 'pass');
});

test('rejects unknown swipe actions', () => {
  assert.equal(normalizeSwipeAction({ action: 'maybe' }), null);
});

test('normalizes non-empty product ids', () => {
  assert.equal(normalizeProductId('  iphone-15-128  '), 'iphone-15-128');
  assert.equal(normalizeProductId('   '), null);
  assert.equal(normalizeProductId(123), null);
});
