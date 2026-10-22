import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/hiper/categories';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' },
    });
  } catch (error) {
    console.error('[API /categories GET] Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
