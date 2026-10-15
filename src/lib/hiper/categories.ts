import { fetchHiperAPI } from './client';
import { HiperCategory, HiperRawProduct } from './types';

/**
 * For now, only PETS category is synced with the ecommerce.
 * Other categories (Grandes Animais, Avícola, etc.) will be added later.
 */
const PETS_CATEGORY: HiperCategory = {
  id: 'cat-pets',
  name: 'Pets',
  slug: 'pets',
};

// Subcategories within PETS
const PETS_SUBCATEGORIES: HiperCategory[] = [
  { id: 'cat-pets', name: 'Pets', slug: 'pets' },
  { id: 'cat-pets-caes', name: 'Cães', slug: 'caes', parentId: 'cat-pets' },
  { id: 'cat-pets-gatos', name: 'Gatos', slug: 'gatos', parentId: 'cat-pets' },
  { id: 'cat-pets-higiene', name: 'Higiene e Beleza Pet', slug: 'higiene-pet', parentId: 'cat-pets' },
  { id: 'cat-pets-acessorios', name: 'Acessórios Pet', slug: 'acessorios-pet', parentId: 'cat-pets' },
];

const PETS_CATEGORY_NAME = 'PETS';

function isPetsCategory(name: string): boolean {
  return name.trim().toUpperCase() === PETS_CATEGORY_NAME;
}

const USE_MOCKS = process.env.USE_HIPER_MOCK === 'true' || !process.env.HIPER_API_KEY;

export async function getCategories(): Promise<HiperCategory[]> {
  if (USE_MOCKS) {
    return PETS_SUBCATEGORIES;
  }

  try {
    const rawData = await fetchHiperAPI<HiperRawProduct[] | { produtos?: HiperRawProduct[] }>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );
    const produtos = Array.isArray(rawData) ? rawData : (rawData?.produtos || []);

    if (produtos.length === 0) {
      return PETS_SUBCATEGORIES;
    }

    // Extract unique PETS-related categories only
    const categoriesMap = new Map<string, HiperCategory>();

    produtos.forEach((p) => {
      if (p.categoria && p.categoria.trim() !== '' && isPetsCategory(p.categoria)) {
        const catName = p.categoria;
        const slug = catName.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        if (!categoriesMap.has(slug)) {
          categoriesMap.set(slug, {
            id: p.categoriaDoProdutoId || slug,
            name: catName,
            slug: slug,
            parentId: undefined,
          });
        }
      }
    });

    const categories = Array.from(categoriesMap.values());

    if (categories.length === 0) {
      return PETS_SUBCATEGORIES;
    }

    return categories;
  } catch (error) {
    console.error('Error fetching categories from HIPER:', error);
    return PETS_SUBCATEGORIES;
  }
}
