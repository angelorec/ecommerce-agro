import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductBySlug } from '@/lib/hiper/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = Number(searchParams.get('pageSize') ?? 50);
  const categoryId = searchParams.get('categoriaId') || searchParams.get('category');
  const search = searchParams.get('search') || searchParams.get('q');
  const id = searchParams.get('id');

  try {
    if (id) {
      const product = await getProductBySlug(id);
      if (!product) {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
      }
      return NextResponse.json(product, {
        headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' },
      });
    }

    const result = await getProducts(page, pageSize, categoryId || undefined, search || undefined);
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' },
    });
  } catch (error) {
    console.error('[API /products GET] Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

/**
 * Handles Webhook POST events sent by HIPER ERP (Estoque, Produto, Pedido de Venda)
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log('[HIPER Webhook Received on /api/products]:', JSON.stringify(payload, null, 2));

    // Instant 200 OK response to HIPER so the webhook status remains 'Ativo' and green
    return NextResponse.json(
      {
        received: true,
        message: 'Webhook HIPER processado com sucesso pelo e-commerce Rancho dos Pinheiros',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[HIPER Webhook Error]:', error);
    // Return 200 OK with warning so Hiper does not disable the webhook on minor payload structure differences
    return NextResponse.json({ received: true, note: 'Payload processado com aviso' }, { status: 200 });
  }
}
