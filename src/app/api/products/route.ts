import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductBySlug } from '@/lib/hiper/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = Number(searchParams.get('pageSize') ?? 20);
  const id = searchParams.get('id');

  try {
    if (id) {
      const product = await getProductBySlug(id);
      if (!product) {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
      }
      return NextResponse.json(product, {
        headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' },
      });
    }

    const result = await getProducts(page, pageSize);
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' },
    });
  } catch (error) {
    console.error('[API /products] Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
