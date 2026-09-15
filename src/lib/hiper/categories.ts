import { fetchHiperAPI } from './client';
import { HiperCategory, PaginatedResponse } from './types';

// Full list of Agropecuária categories
const MOCK_CATEGORIES: HiperCategory[] = [
  { id: 'cat-pets', name: 'Pets', slug: 'pets' },
  { id: 'cat-grandes', name: 'Grandes Animais', slug: 'grandes-animais' },
  { id: 'cat-avicola', name: 'Avícola', slug: 'avicola' },
  { id: 'cat-peixes', name: 'Peixes e Alevinos', slug: 'peixes' },
  { id: 'cat-equinos', name: 'Equinos', slug: 'equinos' },
  { id: 'cat-vacinas', name: 'Vacinas e Remédios', slug: 'vacinas-remedios' },
  { id: 'cat-acessorios', name: 'Acessórios & Ferramentas', slug: 'acessorios' },
];

const USE_MOCKS = !process.env.HIPER_API_URL || process.env.HIPER_API_URL === 'https://api.hiper.com.br';

export async function getCategories(): Promise<HiperCategory[]> {
  if (USE_MOCKS) {
    return MOCK_CATEGORIES;
  }

  try {
    const rawData = await fetchHiperAPI<any>('/api/v1/categorias');
    const items = Array.isArray(rawData) ? rawData : (rawData?.data || MOCK_CATEGORIES);

    return items.map((item: any) => ({
      id: String(item.id || item.categoriaId || item.codigo || item.slug),
      name: item.name || item.nome || item.descricao || 'Categoria',
      slug: (item.slug || item.nome || item.name || 'categoria')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      parentId: item.parentId || item.categoriaPaiId,
    }));
  } catch (error) {
    console.error('Error fetching categories from HIPER:', error);
    return MOCK_CATEGORIES;
  }
}
