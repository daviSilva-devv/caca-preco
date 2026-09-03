import { NextResponse } from 'next/server';
import { normalizeProductId, normalizeSwipeAction, type SwipePayload } from '@/lib/swipe-action';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SwipePayload;
    const productId = normalizeProductId(payload?.productId);
    const action = normalizeSwipeAction(payload ?? {});

    if (!productId || !action) {
      return NextResponse.json({ ok: false, error: 'Payload inválido.' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      productId,
      action,
      persisted: false,
      message: 'Swipe validado no modo demo.'
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 });
  }
}
