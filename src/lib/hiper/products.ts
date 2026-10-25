import { fetchHiperAPI } from './client';
import { HiperProduct, HiperRawProduct, PaginatedResponse } from './types';
import { isAllowedCategory, CATEGORY_MAPPING, resolveSubcategoryFromId } from './categories';

// Mock catalog for when API is unavailable
const MOCK_PRODUCTS: HiperProduct[] = [
  {
    id: 'p1',
    name: 'Ração Golden Special Cães Adultos Frango e Carne 15kg',
    description: 'Ração Premium Especial indicada para cães adultos de porte médio e grande. Proporciona pelagem bonita e fezes firmes.',
    price: 159.90,
    promotionalPrice: 145.90,
    stock: 24,
    sku: 'GOLDEN-15KG',
    categoryId: 'cat-racoes-cao',
    categoryName: 'Rações Cão',
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80'],
    weight: 15,
    brand: 'PremierPet',
    isActive: true,
  },
  {
    id: 'p4',
    name: 'Ração GranPlus Choice Gatos Adultos Castrados 10kg',
    description: 'Alimento completo de alta qualidade para gatos castrados com controle de calorias.',
    price: 139.90,
    promotionalPrice: 129.90,
    stock: 18,
    sku: 'GRANPLUS-GATO-10KG',
    categoryId: 'cat-racoes-gato',
    categoryName: 'Rações Gato',
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80'],
    weight: 10,
    brand: 'GranPlus',
    isActive: true,
  },
  {
    id: 'p5',
    name: 'Shampoo Neutro Para Cães e Gatos Pet Clean 500ml',
    description: 'Limpeza suave com extrato de aveia para todos os tipos de pelagem.',
    price: 24.90,
    stock: 40,
    sku: 'SHAMPOO-PET-500',
    categoryId: 'cat-higiene-banho',
    categoryName: 'Higiene & Banho',
    images: ['https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&q=80'],
    weight: 0.5,
    brand: 'Pet Clean',
    isActive: true,
  },
  {
    id: 'p16',
    name: 'Ração Pedigree Nutrição Essencial Carne 15kg',
    description: 'Alimento completo para cães adultos de todas as raças. Rica em proteínas e com DHA para saúde cognitiva.',
    price: 119.90,
    promotionalPrice: 109.90,
    stock: 30,
    sku: 'PEDIGREE-15KG',
    categoryId: 'cat-racoes-cao',
    categoryName: 'Rações Cão',
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80'],
    weight: 15,
    brand: 'Pedigree',
    isActive: true,
  },
  {
    id: 'p17',
    name: 'Areia Sanitária para Gatos Pipicat Classic 12kg',
    description: 'Areia higiênica com alta absorção e controle de odor para gatos.',
    price: 39.90,
    stock: 50,
    sku: 'PIPICAT-12KG',
    categoryId: 'cat-higiene-banho',
    categoryName: 'Higiene & Banho',
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80'],
    weight: 12,
    brand: 'Pipicat',
    isActive: true,
  },
  {
    id: 'p18',
    name: 'Coleira Antipulgas e Carrapatos Seresto Cães até 8kg',
    description: 'Proteção contínua por até 8 meses contra pulgas e carrapatos. Sem cheiro e resistente à água.',
    price: 189.90,
    promotionalPrice: 169.90,
    stock: 12,
    sku: 'SERESTO-P',
    categoryId: 'cat-vermifugos',
    categoryName: 'Vermífugos',
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'],
    weight: 0.05,
    brand: 'Seresto',
    isActive: true,
  },
  {
    id: 'p19',
    name: 'Ração Whiskas Castrados Sabor Carne 10,1kg',
    description: 'Formulação especial para gatos castrados com controle de peso e bolas de pelo.',
    price: 129.90,
    stock: 22,
    sku: 'WHISKAS-CAST-10KG',
    categoryId: 'cat-racoes-gato',
    categoryName: 'Rações Gato',
    images: ['https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80'],
    weight: 10.1,
    brand: 'Whiskas',
    isActive: true,
  },
  {
    id: 'p20',
    name: 'Tapete Higiênico para Cães Super Secão 30 Unidades',
    description: 'Alta absorção com gel que neutraliza odores. Ideal para filhotes e cães de apartamento.',
    price: 49.90,
    promotionalPrice: 42.90,
    stock: 35,
    sku: 'TAPETE-HIG-30',
    categoryId: 'cat-acessorios-brinquedos',
    categoryName: 'Acessórios & Brinquedos',
    images: ['https://images.unsplash.com/photo-1583337130417-13104dec14a8?w=800&q=80'],
    weight: 2,
    brand: 'Super Secão',
    isActive: true,
  },
];

const USE_MOCKS = process.env.USE_HIPER_MOCK === 'true' || !process.env.HIPER_API_KEY;

/**
 * Normalizes a category name to its mapped slug for filtering.
 */
function getCategorySlug(categoryName: string): string {
  const normalized = categoryName.trim().toUpperCase();
  const mapping = CATEGORY_MAPPING[normalized];
  if (mapping) return mapping.slug;

  // Fallback to generating a slug
  return categoryName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Normalizes raw HIPER ERP product payload into our internal HiperProduct structure.
 */
function normalizeHiperProduct(raw: HiperRawProduct): HiperProduct {
  const images: string[] = [];
  if (raw.imagem) {
    images.push(raw.imagem);
  }
  if (Array.isArray(raw.imagensAdicionais)) {
    for (const img of raw.imagensAdicionais) {
      if (img?.imagem) images.push(img.imagem);
    }
  }
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80');
  }

  const variations = Array.isArray(raw.variacao)
    ? raw.variacao.map((v) => ({
        id: v.id,
        active: v.variacaoAtiva,
        barcode: v.codigoDeBarras,
        code: v.codigo,
        variationTypeA: v.tipoVariacaoA,
        variationNameA: v.nomeVariacaoA,
        variationTypeB: v.tipoVariacaoB,
        variationNameB: v.nomeVariacaoB,
        stock: v.quantidadeEmEstoque,
      }))
    : undefined;

  const wholesalePrices = raw.precoAtacado?.precos?.map((p) => ({
    unitPrice: p.precoUnitario,
    quantity: p.quantidade,
  }));

  // Map the raw HIPER category to a friendly name using our mapping.
  // CRITICAL: For products with `categoria: "PETS"` (the generic parent),
  // resolve the actual subcategory using the `categoriaDoProdutoId` UUID.
  const rawCatName = raw.categoria || 'Geral';
  const normalized = rawCatName.trim().toUpperCase();
  const subcatFromId = resolveSubcategoryFromId(raw.categoriaDoProdutoId);

  let friendlyName: string;
  let catSlug: string;

  if (normalized === 'PETS' && subcatFromId) {
    // Subcategory resolved from categoriaDoProdutoId UUID
    friendlyName = subcatFromId.name;
    catSlug = subcatFromId.slug;
  } else {
    // Standard mapping from category name
    const mapping = CATEGORY_MAPPING[normalized];
    friendlyName = mapping?.name || rawCatName;
    catSlug = mapping?.slug || getCategorySlug(rawCatName);
  }

  return {
    id: raw.id,
    name: raw.nome || 'Produto Rancho',
    description: raw.descricao || raw.nome || '',
    price: raw.preco || 0,
    stock: raw.quantidadeEmEstoque || 0,
    sku: raw.codigoDeBarras || String(raw.codigo),
    categoryId: raw.categoriaDoProdutoId || catSlug,
    categoryName: friendlyName,
    images,
    weight: raw.peso || 0,
    brand: raw.marca || 'Rancho dos Pinheiros',
    isActive: raw.ativo && !raw.removido,
    unit: raw.unidade,
    variations,
    wholesaleActive: raw.atacadoAtivo,
    wholesalePrices,
  };
}

/**
 * Checks if a product matches a given category slug/id filter.
 * Products have been normalized so their categoryName is the resolved
 * subcategory (e.g. "Rações Cão") rather than the generic "PETS".
 */
function matchesCategory(product: HiperProduct, target: string): boolean {
  const t = target.toLowerCase();
  const productSlug = getCategorySlug(product.categoryName);

  // "pets" = show all PETS sub-category products
  if (t === 'pets' || t === 'cat-pets') {
    const PETS_SUBCATEGORY_SLUGS = [
      'racoes-cao', 'racoes-gato', 'petiscos',
      'acessorios-brinquedos', 'higiene-banho', 'pets',
    ];
    if (PETS_SUBCATEGORY_SLUGS.includes(productSlug)) return true;

    // Fallback: check CATEGORY_MAPPING parent
    const mapping = Object.values(CATEGORY_MAPPING).find(m => m.slug === productSlug);
    return mapping?.parent === 'pets' || productSlug === 'pets';
  }

  // "passaros" = show all Pássaros sub-category products
  if (t === 'passaros') {
    const mapping = Object.values(CATEGORY_MAPPING).find(m => m.slug === productSlug);
    return mapping?.parent === 'passaros' || productSlug === 'passaros';
  }

  // Direct match on the resolved slug
  if (productSlug === t) return true;

  // Direct match on category ID
  if (product.categoryId.toLowerCase() === t) return true;

  // Partial match on category name for flexibility
  const productCatNormalized = product.categoryName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (productCatNormalized.includes(t) || t.includes(productCatNormalized)) return true;

  return false;
}

/**
 * Fetches products from HIPER ERP — syncs all PETS sub-categories.
 * Falls back to mock data if API is unavailable or mocks are enabled.
 */
export async function getProducts(
  page = 1,
  pageSize = 50,
  categoryIdOrSlug?: string,
  search?: string
): Promise<PaginatedResponse<HiperProduct>> {
  if (USE_MOCKS) {
    return getFilteredMocks(page, pageSize, categoryIdOrSlug, search);
  }

  try {
    const rawResponse = await fetchHiperAPI<HiperRawProduct[] | { produtos?: HiperRawProduct[]; data?: HiperRawProduct[] }>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );

    const rawList: HiperRawProduct[] = Array.isArray(rawResponse)
      ? rawResponse
      : Array.isArray(rawResponse?.produtos)
      ? rawResponse.produtos
      : Array.isArray(rawResponse?.data)
      ? rawResponse.data
      : [];

    // Filter: only ACTIVE, not REMOVED, and within allowed categories
    let products = rawList
      .filter((item) => !item.removido && item.ativo && isAllowedCategory(item.categoria || ''))
      .map(normalizeHiperProduct);

    // Category filter within PETS sub-categories
    if (categoryIdOrSlug) {
      products = products.filter((p) => matchesCategory(p, categoryIdOrSlug));
    }

    if (search) {
      const s = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.brand?.toLowerCase().includes(s) ||
          p.categoryName.toLowerCase().includes(s)
      );
    }

    // If API returns zero products, fall back to mocks
    if (products.length === 0 && !categoryIdOrSlug && !search) {
      console.warn('[HIPER] No products found from API, using mock data as fallback');
      return getFilteredMocks(page, pageSize, categoryIdOrSlug, search);
    }

    const total = products.length;
    const start = (page - 1) * pageSize;
    const paginated = products.slice(start, start + pageSize);

    return {
      data: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  } catch (error) {
    console.error('Error fetching products from HIPER:', error);
    return getFilteredMocks(page, pageSize, categoryIdOrSlug, search);
  }
}

export async function getFeaturedProducts(): Promise<HiperProduct[]> {
  const response = await getProducts(1, 8);
  return response.data;
}

export async function getProductBySlug(id: string): Promise<HiperProduct | null> {
  if (USE_MOCKS) {
    const product = MOCK_PRODUCTS.find((p) => p.id === id || p.sku.toLowerCase() === id.toLowerCase());
    return product || MOCK_PRODUCTS[0];
  }

  try {
    const allProducts = await fetchHiperAPI<HiperRawProduct[] | { produtos?: HiperRawProduct[]; data?: HiperRawProduct[] }>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );

    const rawList: HiperRawProduct[] = Array.isArray(allProducts)
      ? allProducts
      : Array.isArray(allProducts?.produtos)
      ? allProducts.produtos
      : (allProducts?.data || []);

    // Return products from any allowed category
    const found = rawList.find(
      (p) => (p.id === id || String(p.codigo) === id || p.codigoDeBarras === id)
             && isAllowedCategory(p.categoria || '')
    );

    if (!found) return null;
    return normalizeHiperProduct(found);
  } catch (error) {
    console.error(`Error fetching product ${id} from HIPER:`, error);
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}

function getFilteredMocks(
  page: number,
  pageSize: number,
  categoryIdOrSlug?: string,
  search?: string
): PaginatedResponse<HiperProduct> {
  let filtered = [...MOCK_PRODUCTS];

  if (categoryIdOrSlug) {
    filtered = filtered.filter((p) => matchesCategory(p, categoryIdOrSlug));
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.brand?.toLowerCase().includes(s) ||
        p.categoryName.toLowerCase().includes(s)
    );
  }

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    data: paginated,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.ceil(filtered.length / pageSize) || 1,
  };
}
