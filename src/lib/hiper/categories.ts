import { fetchHiperAPI } from './client';
import { HiperCategory, HiperRawProduct } from './types';

/**
 * ══════════════════════════════════════════════════════════════════════
 * HIPER CATEGORY MAPPING — Based on the exact hierarchy from HIPER ERP
 * ══════════════════════════════════════════════════════════════════════
 *
 * HIPER hierarchy (from the screenshot):
 *
 *   PASSÁROS
 *     └─ Gaiolas
 *   PEIXES
 *   PETS
 *     ├─ Acessórios/ Brinquedos  → PETS
 *     ├─ Higiene & Banho
 *     ├─ Pesticos                → PETS
 *     ├─ Rações Cão              → PETS
 *     └─ Rações Gato             → PETS
 *   Pássaros ON
 *   Rações Avícola
 *   Vermífugos
 *
 * Each entry maps a raw HIPER category name (uppercased) to:
 *   - slug:   URL-safe identifier
 *   - name:   User-friendly display name
 *   - parent: Parent group slug (for hierarchy) or null if top-level
 */

const CATEGORY_MAPPING: Record<string, { slug: string; name: string; parent: string | null }> = {
  // ── PETS sub-categories ──────────────────────────────────────────
  'PETS':                       { slug: 'pets',                  name: 'Todos os Pets',          parent: null },
  'RAÇÕES CÃO':                { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RACOES CAO':                 { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RAÇÕES CÃ0':                { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RAÇÃO CÃO':                 { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RACAO CAO':                  { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RAÇÃO CÃES':                 { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RAÇÕES CÃES':                { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },
  'RACOES CAES':                { slug: 'racoes-cao',            name: 'Rações Cão',             parent: 'pets' },

  'RAÇÕES GATO':               { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },
  'RACOES GATO':                { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },
  'RAÇÃO GATO':                 { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },
  'RACAO GATO':                 { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },
  'RAÇÃO GATOS':                { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },
  'RAÇÕES GATOS':               { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },
  'RACOES GATOS':               { slug: 'racoes-gato',           name: 'Rações Gato',            parent: 'pets' },

  'PESTICOS':                   { slug: 'petiscos',              name: 'Petiscos',               parent: 'pets' },
  'PETISCOS':                   { slug: 'petiscos',              name: 'Petiscos',               parent: 'pets' },
  'PETISCOS CÃES':              { slug: 'petiscos',              name: 'Petiscos',               parent: 'pets' },
  'PETISCOS CAES':              { slug: 'petiscos',              name: 'Petiscos',               parent: 'pets' },
  'PETISCOS GATOS':             { slug: 'petiscos',              name: 'Petiscos',               parent: 'pets' },

  'ACESSÓRIOS/ BRINQUEDOS':    { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSORIOS/ BRINQUEDOS':    { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSÓRIOS/BRINQUEDOS':     { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSORIOS/BRINQUEDOS':     { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSÓRIOS / BRINQUEDOS':   { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSORIOS / BRINQUEDOS':   { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSÓRIOS PET':             { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'ACESSORIOS PET':             { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'BRINQUEDOS PET':             { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },
  'BRINQUEDOS':                 { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos', parent: 'pets' },

  'HIGIENE & BANHO':           { slug: 'higiene-banho',         name: 'Higiene & Banho',        parent: 'pets' },
  'HIGIENE E BANHO':           { slug: 'higiene-banho',         name: 'Higiene & Banho',        parent: 'pets' },
  'HIGIENE PET':               { slug: 'higiene-banho',         name: 'Higiene & Banho',        parent: 'pets' },
  'HIGIENE E BELEZA PET':      { slug: 'higiene-banho',         name: 'Higiene & Banho',        parent: 'pets' },

  // ── PASSÁROS ─────────────────────────────────────────────────────
  'PASSÁROS':                  { slug: 'passaros',              name: 'Pássaros',               parent: null },
  'PASSAROS':                  { slug: 'passaros',              name: 'Pássaros',               parent: null },
  'PÁSSAROS':                  { slug: 'passaros',              name: 'Pássaros',               parent: null },

  'GAIOLAS':                   { slug: 'gaiolas',               name: 'Gaiolas',                parent: 'passaros' },

  'PÁSSAROS ON':               { slug: 'passaros-on',           name: 'Pássaros ON',            parent: 'passaros' },
  'PASSAROS ON':               { slug: 'passaros-on',           name: 'Pássaros ON',            parent: 'passaros' },

  // ── PEIXES ───────────────────────────────────────────────────────
  'PEIXES':                    { slug: 'peixes',                name: 'Peixes',                 parent: null },

  // ── RAÇÕES AVÍCOLA ───────────────────────────────────────────────
  'RAÇÕES AVÍCOLA':            { slug: 'racoes-avicola',        name: 'Rações Avícola',         parent: null },
  'RACOES AVICOLA':            { slug: 'racoes-avicola',        name: 'Rações Avícola',         parent: null },
  'RAÇÃO AVÍCOLA':             { slug: 'racoes-avicola',        name: 'Rações Avícola',         parent: null },
  'RACAO AVICOLA':             { slug: 'racoes-avicola',        name: 'Rações Avícola',         parent: null },
  'RAÇÕES AVICOLA':            { slug: 'racoes-avicola',        name: 'Rações Avícola',         parent: null },

  // ── VERMÍFUGOS ───────────────────────────────────────────────────
  'VERMÍFUGOS':                { slug: 'vermifugos',            name: 'Vermífugos',             parent: null },
  'VERMIFUGOS':                { slug: 'vermifugos',            name: 'Vermífugos',             parent: null },
};

/**
 * Set of ALL allowed HIPER category names (uppercased).
 */
const ALLOWED_CATEGORIES: Set<string> = new Set(Object.keys(CATEGORY_MAPPING));

/**
 * ══════════════════════════════════════════════════════════════════════
 * HIPER SUBCATEGORY ID MAP — Maps `categoriaDoProdutoId` UUIDs to slugs
 * ══════════════════════════════════════════════════════════════════════
 *
 * In the HIPER ERP, ALL products under the PETS tree have their
 * `categoria` field set to "PETS" (the top-level group). The ACTUAL
 * subcategory (Rações Cão, Rações Gato, Petiscos, etc.) is only
 * identifiable via the `categoriaDoProdutoId` UUID.
 *
 * This mapping was built by analyzing all PETS products and grouping
 * them by `categoriaDoProdutoId`, then manually verifying the product
 * names to confirm each UUID's corresponding subcategory.
 *
 * When HIPER adds new subcategory IDs, they must be added here.
 * Use the /api/debug-categories3 route (temporary) to discover them.
 */
const HIPER_SUBCATEGORY_ID_MAP: Record<string, { slug: string; name: string }> = {
  // ── Rações Cão ──────────────────────────────────────────────────
  'ff071bca-dbef-4728-99f2-b65840fb5535': { slug: 'racoes-cao',            name: 'Rações Cão' },
  '6d274086-5d10-42d9-b0e9-405a9846a28f': { slug: 'racoes-cao',            name: 'Rações Cão' },

  // ── Rações Gato ─────────────────────────────────────────────────
  'c528d0bc-0be5-4f36-89ba-9c70d561e1e8': { slug: 'racoes-gato',           name: 'Rações Gato' },

  // ── Acessórios / Brinquedos ─────────────────────────────────────
  '2331e1c2-bd2f-43d0-b5fe-a47bb88160a5': { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos' },
  'f84b3560-8159-465c-9a16-712832b0af4b': { slug: 'acessorios-brinquedos', name: 'Acessórios & Brinquedos' },

  // ── Petiscos ────────────────────────────────────────────────────
  '396de921-e47c-4107-a90e-7dad5efa07c0': { slug: 'petiscos',              name: 'Petiscos' },

  // ── Higiene & Banho ─────────────────────────────────────────────
  '379491d8-5cf9-4a5f-803d-8f183f015abc': { slug: 'higiene-banho',         name: 'Higiene & Banho' },

  // ── Genérico / Teste (classified as Rações Cão by default) ──────
  '2badab5c-e13b-47fc-8f61-2f53efcc3a8f': { slug: 'racoes-cao',            name: 'Rações Cão' },
};

/**
 * Resolves a HIPER `categoriaDoProdutoId` to the actual subcategory
 * slug and name. Returns null if the ID is not mapped.
 */
export function resolveSubcategoryFromId(
  categoriaDoProdutoId: string | null | undefined
): { slug: string; name: string } | null {
  if (!categoriaDoProdutoId) return null;
  return HIPER_SUBCATEGORY_ID_MAP[categoriaDoProdutoId] ?? null;
}

/**
 * Returns true if a HIPER category name is one of the allowed categories
 * (PETS, Pássaros, Peixes, Avícola, Vermífugos and their sub-categories).
 */
export function isAllowedCategory(name: string): boolean {
  const normalized = name.trim().toUpperCase();
  if (ALLOWED_CATEGORIES.has(normalized)) return true;

  // Normalize accents and try again
  const noAccents = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (ALLOWED_CATEGORIES.has(noAccents)) return true;

  // Heuristic fallback for unknown variants
  for (const key of ALLOWED_CATEGORIES) {
    const keyNoAccents = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (keyNoAccents === noAccents) return true;
  }

  return false;
}

/** @deprecated Use isAllowedCategory instead */
export const isPetsCategory = isAllowedCategory;

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
  let mapping = CATEGORY_MAPPING[normalized];

  // Try with accent normalization
  if (!mapping) {
    const noAccents = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const [key, val] of Object.entries(CATEGORY_MAPPING)) {
      const keyNoAccents = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (keyNoAccents === noAccents) {
        mapping = val;
        break;
      }
    }
  }

  if (mapping) {
    return {
      id: rawId || mapping.slug,
      name: mapping.name,
      slug: mapping.slug,
      parentId: mapping.parent ?? undefined,
    };
  }

  // Fallback for unknown categories
  const slug = toSlug(rawName);
  return {
    id: rawId || slug,
    name: rawName.trim(),
    slug,
    parentId: undefined,
  };
}

/**
 * Defines the preferred display order for categories.
 * Categories appearing earlier in this list show first.
 */
const DISPLAY_ORDER: string[] = [
  'racoes-cao',
  'racoes-gato',
  'petiscos',
  'acessorios-brinquedos',
  'higiene-banho',
  'vermifugos',
  'passaros',
  'gaiolas',
  'passaros-on',
  'peixes',
  'racoes-avicola',
];

// Fallback mock subcategories (only used when API is unavailable)
const FALLBACK_CATEGORIES: HiperCategory[] = [
  { id: 'cat-racoes-cao',            name: 'Rações Cão',              slug: 'racoes-cao',            parentId: 'pets' },
  { id: 'cat-racoes-gato',           name: 'Rações Gato',             slug: 'racoes-gato',           parentId: 'pets' },
  { id: 'cat-petiscos',              name: 'Petiscos',                slug: 'petiscos',              parentId: 'pets' },
  { id: 'cat-acessorios-brinquedos', name: 'Acessórios & Brinquedos', slug: 'acessorios-brinquedos', parentId: 'pets' },
  { id: 'cat-higiene-banho',         name: 'Higiene & Banho',         slug: 'higiene-banho',         parentId: 'pets' },
  { id: 'cat-vermifugos',            name: 'Vermífugos',              slug: 'vermifugos' },
  { id: 'cat-passaros',              name: 'Pássaros',                slug: 'passaros' },
  { id: 'cat-gaiolas',               name: 'Gaiolas',                 slug: 'gaiolas',               parentId: 'passaros' },
  { id: 'cat-peixes',                name: 'Peixes',                  slug: 'peixes' },
  { id: 'cat-racoes-avicola',        name: 'Rações Avícola',          slug: 'racoes-avicola' },
];

const USE_MOCKS = process.env.USE_HIPER_MOCK === 'true' || !process.env.HIPER_API_KEY;

/**
 * Fetches categories from HIPER ERP by extracting unique categories
 * from actual products. Only returns categories that have at least 1 product.
 * Categories with zero products are automatically excluded.
 */
export async function getCategories(): Promise<HiperCategory[]> {
  if (USE_MOCKS) {
    return FALLBACK_CATEGORIES;
  }

  try {
    const rawData = await fetchHiperAPI<HiperRawProduct[] | { produtos?: HiperRawProduct[] }>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );
    const produtos = Array.isArray(rawData) ? rawData : (rawData?.produtos || []);

    if (produtos.length === 0) {
      return FALLBACK_CATEGORIES;
    }

    // Only consider active, non-removed products in allowed categories
    const allowedProducts = produtos.filter(
      (p) => !p.removido && p.ativo && p.categoria && isAllowedCategory(p.categoria)
    );

    if (allowedProducts.length === 0) {
      return FALLBACK_CATEGORIES;
    }

    // Extract unique categories from real products (only categories with products)
    const categoriesMap = new Map<string, { category: HiperCategory; productCount: number }>();

    allowedProducts.forEach((p) => {
      let mapped: HiperCategory;

      // For PETS products, try to resolve the real subcategory from the UUID
      const normalized = p.categoria.trim().toUpperCase();
      const subcatFromId = resolveSubcategoryFromId(p.categoriaDoProdutoId);

      if (normalized === 'PETS' && subcatFromId) {
        // Use the resolved subcategory
        mapped = {
          id: p.categoriaDoProdutoId || subcatFromId.slug,
          name: subcatFromId.name,
          slug: subcatFromId.slug,
          parentId: 'pets',
        };
      } else {
        mapped = mapCategory(p.categoria, p.categoriaDoProdutoId);
      }

      // Skip the generic "Todos os Pets" — not a browsable sub-category
      if (mapped.slug === 'pets') return;

      if (categoriesMap.has(mapped.slug)) {
        categoriesMap.get(mapped.slug)!.productCount += 1;
      } else {
        categoriesMap.set(mapped.slug, { category: mapped, productCount: 1 });
      }
    });

    // Sort by preferred display order, then by product count for unknowns
    const sorted = Array.from(categoriesMap.values())
      .sort((a, b) => {
        const orderA = DISPLAY_ORDER.indexOf(a.category.slug);
        const orderB = DISPLAY_ORDER.indexOf(b.category.slug);
        const posA = orderA === -1 ? 999 : orderA;
        const posB = orderB === -1 ? 999 : orderB;
        if (posA !== posB) return posA - posB;
        return b.productCount - a.productCount;
      })
      .map(({ category }) => category);

    if (sorted.length === 0) {
      return FALLBACK_CATEGORIES;
    }

    return sorted;
  } catch (error) {
    console.error('Error fetching categories from HIPER:', error);
    return FALLBACK_CATEGORIES;
  }
}

export { CATEGORY_MAPPING, ALLOWED_CATEGORIES };
