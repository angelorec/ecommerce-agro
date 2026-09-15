import { fetchHiperAPI } from './client';
import { HiperCategory, PaginatedResponse } from './types';

// Mock data for development
const MOCK_CATEGORIES: HiperCategory[] = [
  { id: '1', name: 'Pets', slug: 'pets' },
  { id: '2', name: 'Grandes Animais', slug: 'grandes-animais' },
  { id: '3', name: 'Avícola', slug: 'avicola' },
  { id: '4', name: 'Peixes e Alevinos', slug: 'peixes' },
];

// Set to false once HIPER_API_URL is confirmed and the real endpoint is available
const USE_MOCKS = !process.env.HIPER_API_URL || process.env.HIPER_API_URL === 'https://api.hiper.com.br';

export async function getCategories(): Promise<HiperCategory[]> {
  if (USE_MOCKS) {
    return MOCK_CATEGORIES;
  }

  try {
    // Note: Endpoint may need adjustment based on final HIPER documentation
    const response = await fetchHiperAPI<PaginatedResponse<HiperCategory>>('/api/v1/categorias');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories from HIPER:', error);
    // Fallback to mocks even in production if API fails during initial load
    return MOCK_CATEGORIES;
  }
}
