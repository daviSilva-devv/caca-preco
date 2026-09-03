import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/catalog';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json({ ok: false, error: 'Produto não encontrado.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, dataMode: 'synthetic-demo', product });
}
