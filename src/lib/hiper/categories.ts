import { fetchHiperAPI } from './client';
import { HiperCategory, HiperRawProduct } from './types';

/**
 * PETS sub-categories as configured in HIPER ERP.
 * The system now pulls sub-categories dynamically from products,
 * grouping them into user-friendly buckets.
 *
 * Known HIPER PETS sub-categories (mapped to friendly names):
 *   PETS, RAÇÃO CÃES, RAÇÃO GATOS, HIGIENE PET, ACESSÓRIOS PET,
 *   FARMÁCIA PET, PETISCOS CÃES, PETISCOS GATOS, AREIA GATOS,
 *   COLEIRAS E GUIAS, CAMAS E CASAS, BRINQUEDOS PET, etc.
 */

/**
 * Maps raw HIPER category names to friendly, grouped slugs/names.
 * Categories that contain similar products are merged into one.
 */
const CATEGORY_MAPPING: Record<string, { slug: string; name: string; group: string }> = {
  'PETS': { slug: 'pets', name: 'Todos os Pets', group: 'all' },
  // Cães
  'RAÇÃO CÃES': { slug: 'racao-caes', name: 'Ração Cães', group: 'caes' },
  'RAÇÕES CÃES': { slug: 'racao-caes', name: 'Ração Cães', group: 'caes' },
  'RACOES CAES': { slug: 'racao-caes', name: 'Ração Cães', group: 'caes' },
  'RAÇÃO CÃOS': { slug: 'racao-caes', name: 'Ração Cães', group: 'caes' },
  'PETISCOS CÃES': { slug: 'petiscos-caes', name: 'Petiscos Cães', group: 'caes' },
  'PETISCOS CAES': { slug: 'petiscos-caes', name: 'Petiscos Cães', group: 'caes' },
  // Gatos
  'RAÇÃO GATOS': { slug: 'racao-gatos', name: 'Ração Gatos', group: 'gatos' },
  'RAÇÕES GATOS': { slug: 'racao-gatos', name: 'Ração Gatos', group: 'gatos' },
  'RACOES GATOS': { slug: 'racao-gatos', name: 'Ração Gatos', group: 'gatos' },
  'PETISCOS GATOS': { slug: 'petiscos-gatos', name: 'Petiscos Gatos', group: 'gatos' },
  'AREIA GATOS': { slug: 'areia-gatos', name: 'Areia para Gatos', group: 'gatos' },
  'AREIA GATO': { slug: 'areia-gatos', name: 'Areia para Gatos', group: 'gatos' },
  'AREIAS GATOS': { slug: 'areia-gatos', name: 'Areia para Gatos', group: 'gatos' },
  // Higiene & Saúde
  'HIGIENE PET': { slug: 'higiene-pet', name: 'Higiene Pet', group: 'higiene' },
  'HIGIENE E BELEZA PET': { slug: 'higiene-pet', name: 'Higiene Pet', group: 'higiene' },
  'FARMÁCIA PET': { slug: 'farmacia-pet', name: 'Farmácia Pet', group: 'saude' },
  'FARMACIA PET': { slug: 'farmacia-pet', name: 'Farmácia Pet', group: 'saude' },
  'SAÚDE PET': { slug: 'farmacia-pet', name: 'Farmácia Pet', group: 'saude' },
  'SAUDE PET': { slug: 'farmacia-pet', name: 'Farmácia Pet', group: 'saude' },
  'ANTIPULGAS E CARRAPATOS': { slug: 'antipulgas', name: 'Antipulgas e Carrapatos', group: 'saude' },
  'ANTIPULGAS': { slug: 'antipulgas', name: 'Antipulgas e Carrapatos', group: 'saude' },
  'VERMIFUGOS PET': { slug: 'farmacia-pet', name: 'Farmácia Pet', group: 'saude' },
  'VERMÍFUGOS PET': { slug: 'farmacia-pet', name: 'Farmácia Pet', group: 'saude' },
  // Acessórios
  'ACESSÓRIOS PET': { slug: 'acessorios-pet', name: 'Acessórios Pet', group: 'acessorios' },
  'ACESSORIOS PET': { slug: 'acessorios-pet', name: 'Acessórios Pet', group: 'acessorios' },
  'COLEIRAS E GUIAS': { slug: 'coleiras-guias', name: 'Coleiras e Guias', group: 'acessorios' },
  'COLEIRAS': { slug: 'coleiras-guias', name: 'Coleiras e Guias', group: 'acessorios' },
  'BRINQUEDOS PET': { slug: 'brinquedos-pet', name: 'Brinquedos Pet', group: 'acessorios' },
  'BRINQUEDOS': { slug: 'brinquedos-pet', name: 'Brinquedos Pet', group: 'acessorios' },
  'CAMAS E CASAS': { slug: 'camas-casas', name: 'Camas e Casas', group: 'acessorios' },
  'CAMAS': { slug: 'camas-casas', name: 'Camas e Casas', group: 'acessorios' },
  'COMEDOUROS E BEBEDOUROS': { slug: 'comedouros-bebedouros', name: 'Comedouros e Bebedouros', group: 'acessorios' },
  'COMEDOUROS': { slug: 'comedouros-bebedouros', name: 'Comedouros e Bebedouros', group: 'acessorios' },
  'TAPETES HIGIÊNICOS': { slug: 'tapetes-higienicos', name: 'Tapetes Higiênicos', group: 'higiene' },
  'TAPETES HIGIENICOS': { slug: 'tapetes-higienicos', name: 'Tapetes Higiênicos', group: 'higiene' },
  'TAPETE HIGIÊNICO': { slug: 'tapetes-higienicos', name: 'Tapetes Higiênicos', group: 'higiene' },
  // Transporte
  'TRANSPORTE PET': { slug: 'transporte-pet', name: 'Transporte Pet', group: 'acessorios' },
  'CAIXAS DE TRANSPORTE': { slug: 'transporte-pet', name: 'Transporte Pet', group: 'acessorios' },
};

/**
 * List of HIPER category names that belong to the PETS universe.
 * Any product whose `categoria` (uppercase/trimmed) matches one of these
 * is displayed on the e-commerce.
 */
const PETS_UNIVERSE: Set<string> = new Set(Object.keys(CATEGORY_MAPPING));

/**
 * Returns true if a HIPER category name belongs to the PETS universe.
 * Works with both the old "PETS" category and the new sub-categories.
 */
export function isPetsCategory(name: string): boolean {
  const normalized = name.trim().toUpperCase();
  if (PETS_UNIVERSE.has(normalized)) return true;
  // Fallback: if the name contains "PET" or "CÃ" or "GAT" it's likely a PETS sub-category
  if (normalized.includes('PET') || normalized.includes('CÃ') || normalized.includes('CAE')
      || normalized.includes('GAT')) return true;
  return false;
}

/**
 * Normalizes a raw HIPER category name into a friendly slug.
 */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Maps a raw HIPER category name to a user-friendly category object.
 */
function mapCategory(rawName: string, rawId: string): HiperCategory {
  const normalized = rawName.trim().toUpperCase();
  const mapping = CATEGORY_MAPPING[normalized];

  if (mapping) {
    return {
      id: rawId || mapping.slug,
      name: mapping.name,
      slug: mapping.slug,
      parentId: mapping.group !== 'all' ? 'pets' : undefined,
    };
  }

  // Fallback for unknown PETS sub-categories
  const slug = toSlug(rawName);
  return {
    id: rawId || slug,
    name: rawName.trim(),
    slug,
    parentId: 'pets',
  };
}

// Fallback mock subcategories (only used when API is unavailable)
const FALLBACK_SUBCATEGORIES: HiperCategory[] = [
  { id: 'cat-racao-caes', name: 'Ração Cães', slug: 'racao-caes', parentId: 'pets' },
  { id: 'cat-racao-gatos', name: 'Ração Gatos', slug: 'racao-gatos', parentId: 'pets' },
  { id: 'cat-higiene-pet', name: 'Higiene Pet', slug: 'higiene-pet', parentId: 'pets' },
  { id: 'cat-acessorios-pet', name: 'Acessórios Pet', slug: 'acessorios-pet', parentId: 'pets' },
  { id: 'cat-farmacia-pet', name: 'Farmácia Pet', slug: 'farmacia-pet', parentId: 'pets' },
  { id: 'cat-petiscos-caes', name: 'Petiscos Cães', slug: 'petiscos-caes', parentId: 'pets' },
];

const USE_MOCKS = process.env.USE_HIPER_MOCK === 'true' || !process.env.HIPER_API_KEY;

/**
 * Fetches categories from HIPER ERP by extracting unique sub-categories
 * from actual products. Only returns categories that have at least 1 product.
 * Categories with zero products are automatically excluded.
 */
export async function getCategories(): Promise<HiperCategory[]> {
  if (USE_MOCKS) {
    return FALLBACK_SUBCATEGORIES;
  }

  try {
    const rawData = await fetchHiperAPI<HiperRawProduct[] | { produtos?: HiperRawProduct[] }>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );
    const produtos = Array.isArray(rawData) ? rawData : (rawData?.produtos || []);

    if (produtos.length === 0) {
      return FALLBACK_SUBCATEGORIES;
    }

    // Only consider active, non-removed products in the PETS universe
    const petsProducts = produtos.filter(
      (p) => !p.removido && p.ativo && p.categoria && isPetsCategory(p.categoria)
    );

    if (petsProducts.length === 0) {
      return FALLBACK_SUBCATEGORIES;
    }

    // Extract unique categories from real products (only categories with products)
    const categoriesMap = new Map<string, { category: HiperCategory; productCount: number }>();

    petsProducts.forEach((p) => {
      const mapped = mapCategory(p.categoria, p.categoriaDoProdutoId);

      // Skip the generic "Todos os Pets" category — it's not a real sub-category
      if (mapped.slug === 'pets') return;

      if (categoriesMap.has(mapped.slug)) {
        const entry = categoriesMap.get(mapped.slug)!;
        entry.productCount += 1;
      } else {
        categoriesMap.set(mapped.slug, { category: mapped, productCount: 1 });
      }
    });

    // Sort by product count (most products first) for better UX
    const sorted = Array.from(categoriesMap.values())
      .sort((a, b) => b.productCount - a.productCount)
      .map(({ category }) => category);

    if (sorted.length === 0) {
      return FALLBACK_SUBCATEGORIES;
    }

    return sorted;
  } catch (error) {
    console.error('Error fetching categories from HIPER:', error);
    return FALLBACK_SUBCATEGORIES;
  }
}

/**
 * Gets the CATEGORY_MAPPING for use by other modules.
 */
export { CATEGORY_MAPPING, PETS_UNIVERSE };
