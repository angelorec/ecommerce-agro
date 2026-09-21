import { fetchHiperAPI } from './client';
import { HiperRawStock } from './types';

interface StockResult {
  productId: string;
  quantidadeEmEstoque: number;
  quantidadeMinimaEmEstoque: number;
}

interface StockCheckResult {
  productId: string;
  requested: number;
  available: number;
  isAvailable: boolean;
}

/**
 * Fetches stock for a single product from HIPER ERP.
 * Endpoint: GET /api/v1/estoques/pontoDeSincronizacao?ProdutoId={id}
 */
export async function getStock(productId: string): Promise<StockResult | null> {
  try {
    const raw = await fetchHiperAPI<HiperRawStock>(
      `/api/v1/estoques/pontoDeSincronizacao?ProdutoId=${encodeURIComponent(productId)}`
    );

    return {
      productId: raw.produtoId || productId,
      quantidadeEmEstoque: raw.quantidadeEmEstoque ?? 0,
      quantidadeMinimaEmEstoque: raw.quantidadeMinimaEmEstoque ?? 0,
    };
  } catch (error) {
    console.error(`[HIPER Stock] Failed to get stock for product ${productId}:`, error);
    return null;
  }
}

/**
 * Checks availability for multiple items against HIPER stock.
 */
export async function checkAvailability(
  items: Array<{ productId: string; quantity: number }>
): Promise<StockCheckResult[]> {
  const results = await Promise.allSettled(
    items.map(async (item) => {
      const stock = await getStock(item.productId);
      const available = stock?.quantidadeEmEstoque ?? 0;
      return {
        productId: item.productId,
        requested: item.quantity,
        available,
        isAvailable: available >= item.quantity,
      };
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<StockCheckResult> => r.status === "fulfilled")
    .map((r) => r.value);
}
