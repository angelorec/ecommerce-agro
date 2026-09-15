import { fetchHiperAPI } from './client';
import { HiperProduct, PaginatedResponse } from './types';

const MOCK_PRODUCTS: HiperProduct[] = [
  {
    id: 'p1',
    name: 'Ração Golden Special Cães Adultos Frango e Carne 15kg',
    description: 'Ração Premium Especial indicada para cães adultos.',
    price: 159.90,
    promotionalPrice: 145.90,
    stock: 24,
    sku: 'GOLDEN-15KG',
    categoryId: '1',
    categoryName: 'Pets',
    images: ['/images/placeholder-product.jpg'],
    weight: 15,
    brand: 'PremierPet',
    isActive: true,
  },
  {
    id: 'p2',
    name: 'Sal Mineral Fosbovi Confinamento 30kg',
    description: 'Suplemento mineral pronto para uso em bovinos de corte.',
    price: 115.50,
    stock: 50,
    sku: 'FOSBOVI-30KG',
    categoryId: '2',
    categoryName: 'Grandes Animais',
    images: ['/images/placeholder-product.jpg'],
    weight: 30,
    brand: 'Tortuga',
    isActive: true,
  },
  {
    id: 'p3',
    name: 'Ração Inicial Para Pintinhos 5kg',
    description: 'Ração balanceada para fase inicial de aves.',
    price: 35.90,
    stock: 12,
    sku: 'AVES-INICIAL-5',
    categoryId: '3',
    categoryName: 'Avícola',
    images: ['/images/placeholder-product.jpg'],
    weight: 5,
    brand: 'Supra',
    isActive: true,
  }
];

// Set to false once HIPER_API_URL is confirmed and the real endpoint is available
const USE_MOCKS = !process.env.HIPER_API_URL || process.env.HIPER_API_URL === 'https://api.hiper.com.br';

export async function getProducts(page = 1, pageSize = 20): Promise<PaginatedResponse<HiperProduct>> {
  if (USE_MOCKS) {
    return {
      data: MOCK_PRODUCTS,
      total: MOCK_PRODUCTS.length,
      page,
      pageSize,
      totalPages: 1
    };
  }

  try {
    return await fetchHiperAPI<PaginatedResponse<HiperProduct>>(`/api/v1/produtos?page=${page}&pageSize=${pageSize}`);
  } catch (error) {
    console.error('Error fetching products from HIPER:', error);
    return { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  }
}

export async function getFeaturedProducts(): Promise<HiperProduct[]> {
  if (USE_MOCKS) {
    return MOCK_PRODUCTS.slice(0, 5);
  }

  try {
    // Assuming there's a parameter or flag for featured products
    const response = await fetchHiperAPI<PaginatedResponse<HiperProduct>>('/api/v1/produtos?destaque=true&pageSize=5');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products from HIPER:', error);
    return MOCK_PRODUCTS.slice(0, 5);
  }
}

export async function getProductBySlug(id: string): Promise<HiperProduct | null> {
  if (USE_MOCKS) {
    return MOCK_PRODUCTS.find(p => p.id === id || p.sku.toLowerCase() === id) || null;
  }

  try {
    return await fetchHiperAPI<HiperProduct>(`/api/v1/produtos/${id}`);
  } catch (error) {
    console.error(`Error fetching product ${id} from HIPER:`, error);
    return null;
  }
}
