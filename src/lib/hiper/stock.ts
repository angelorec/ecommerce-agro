import { fetchHiperAPI } from './client';

interface StockResult {
  productId: string;
  available: number;
  reserved: number;
  balance: number;
}

interface StockCheckResult {
  productId: string;
  requested: number;
  available: number;
  isAvailable: boolean;
}

export async function getStock(productId: string): Promise<StockResult | null> {
  try {
    return await fetchHiperAPI<StockResult>(`/api/v1/produtos/${productId}/estoque`);
  } catch (error) {
    console.error(`[HIPER Stock] Failed to get stock for product ${productId}:`, error);
    return null;
  }
}

export async function checkAvailability(
  items: Array<{ productId: string; quantity: number }>
): Promise<StockCheckResult[]> {
  const results = await Promise.allSettled(
    items.map(async (item) => {
      const stock = await getStock(item.productId);
      const available = stock?.balance ?? 0;
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
