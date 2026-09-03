import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/catalog';

type AlertPayload = {
  productId?: unknown;
  targetPrice?: unknown;
  channel?: unknown;
};

const channels = new Set(['web', 'ios', 'android', 'whatsapp', 'telegram']);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AlertPayload;
    const productId = typeof payload.productId === 'string' ? payload.productId.trim() : '';

    if (!productId || !getProductById(productId)) {
      return NextResponse.json({ ok: false, error: 'productId inválido.' }, { status: 400 });
    }

    if (payload.targetPrice !== undefined && (typeof payload.targetPrice !== 'number' || payload.targetPrice <= 0)) {
      return NextResponse.json({ ok: false, error: 'targetPrice inválido.' }, { status: 400 });
    }

    const channel = typeof payload.channel === 'string' && channels.has(payload.channel) ? payload.channel : 'web';

    return NextResponse.json({
      ok: true,
      persisted: false,
      alert: {
        id: `demo_${productId}_${Date.now()}`,
        productId,
        targetPrice: payload.targetPrice ?? null,
        channel,
        status: 'demo'
      }
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, persisted: false, alerts: [] });
}
