export type SwipeAction = 'like' | 'pass' | 'alert';
export type LegacyDirection = 'like' | 'skip' | 'right' | 'left';

export type SwipePayload = {
  productId?: unknown;
  action?: unknown;
  direction?: unknown;
};

export function normalizeSwipeAction(payload: SwipePayload): SwipeAction | null {
  if (payload.action === 'like' || payload.action === 'pass' || payload.action === 'alert') {
    return payload.action;
  }

  if (payload.direction === 'like' || payload.direction === 'right') {
    return 'like';
  }

  if (payload.direction === 'skip' || payload.direction === 'left') {
    return 'pass';
  }

  return null;
}

export function normalizeProductId(value: unknown) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}
