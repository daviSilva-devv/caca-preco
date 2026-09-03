import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore, calculateScoreBreakdown, getDecision } from '../src/lib/scoring.ts';

test('gives 100 when every deal condition is satisfied', () => {
  assert.equal(calculateScore(80, 100, 79, 15), 100);
});

test('adds the below-average rule independently', () => {
  const score = calculateScoreBreakdown(95, 100, 80, 0);
  assert.equal(score.belowAverage, 30);
  assert.equal(score.meaningfulDrop, 0);
});

test('awards near-minimum points inside the 2 percent band', () => {
  const score = calculateScoreBreakdown(101, 100, 100, 0);
  assert.equal(score.nearMinimum, 40);
});

test('does not award meaningful-drop points below 10 percent', () => {
  const score = calculateScoreBreakdown(100, 100, 90, 9.99);
  assert.equal(score.meaningfulDrop, 0);
});

test('maps high scores to buy now', () => {
  assert.equal(getDecision(75), 'COMPRA AGORA');
});

test('maps middle scores to wait', () => {
  assert.equal(getDecision(45), 'ESPERA');
  assert.equal(getDecision(74), 'ESPERA');
});

test('maps low scores to expensive', () => {
  assert.equal(getDecision(44), 'CARO');
});
