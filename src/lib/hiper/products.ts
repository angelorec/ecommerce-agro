import { fetchHiperAPI } from './client';
import { HiperProduct, HiperRawProduct, PaginatedResponse } from './types';

// Complete agro-rancho products mock catalog with high quality images
const MOCK_PRODUCTS: HiperProduct[] = [
  // PETS
  {
    id: 'p1',
    name: 'Ração Golden Special Cães Adultos Frango e Carne 15kg',
    description: 'Ração Premium Especial indicada para cães adultos de porte médio e grande. Proporciona pelagem bonita e fezes firmes.',
    price: 159.90,
    promotionalPrice: 145.90,
    stock: 24,
    sku: 'GOLDEN-15KG',
    categoryId: 'cat-pets',
    categoryName: 'Pets',
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
    categoryId: 'cat-pets',
    categoryName: 'Pets',
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
    categoryId: 'cat-pets',
    categoryName: 'Pets',
    images: ['https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&q=80'],
    weight: 0.5,
    brand: 'Pet Clean',
    isActive: true,
  },

  // GRANDES ANIMAIS
  {
    id: 'p2',
    name: 'Sal Mineral Fosbovi Confinamento 30kg',
    description: 'Suplemento mineral pronto para uso em bovinos de corte em engorda acelerada.',
    price: 115.50,
    stock: 50,
    sku: 'FOSBOVI-30KG',
    categoryId: 'cat-grandes',
    categoryName: 'Grandes Animais',
    images: ['https://images.unsplash.com/photo-1570042707222-67258386377e?w=800&q=80'],
    weight: 30,
    brand: 'Tortuga',
    isActive: true,
  },
  {
    id: 'p6',
    name: 'Ração Bovinos de Leite Lactação 40kg',
    description: 'Ração concentrada 22% proteína bruta para alta produção leiteira.',
    price: 98.90,
    promotionalPrice: 89.90,
    stock: 35,
    sku: 'Bov-LEITE-40KG',
    categoryId: 'cat-grandes',
    categoryName: 'Grandes Animais',
    images: ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=800&q=80'],
    weight: 40,
    brand: 'Supra Agro',
    isActive: true,
  },
  {
    id: 'p7',
    name: 'Endectocida Pour-On Para Bovinos 1 Litro',
    description: 'Controle eficaz de vermes gastrointestinais, carrapatos e mosca do chifre.',
    price: 148.00,
    stock: 15,
    sku: 'POURON-1L',
    categoryId: 'cat-grandes',
    categoryName: 'Grandes Animais',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'],
    weight: 1,
    brand: 'Ourofino',
    isActive: true,
  },

  // AVÍCOLA
  {
    id: 'p3',
    name: 'Ração Inicial Para Pintinhos 5kg',
    description: 'Ração balanceada para fase inicial de aves de postura e corte.',
    price: 35.90,
    stock: 12,
    sku: 'AVES-INICIAL-5',
    categoryId: 'cat-avicola',
    categoryName: 'Avícola',
    images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80'],
    weight: 5,
    brand: 'Supra',
    isActive: true,
  },
  {
    id: 'p8',
    name: 'Comedouro Tubular Plástico Aves 12kg',
    description: 'Comedouro com regulagem de altura e prato reforçado para granja.',
    price: 49.90,
    stock: 22,
    sku: 'COMED-TUB-12',
    categoryId: 'cat-avicola',
    categoryName: 'Avícola',
    images: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80'],
    weight: 1.2,
    brand: 'Inplasul',
    isActive: true,
  },

  // PEIXES E ALEVINOS
  {
    id: 'p9',
    name: 'Ração Extrusada Para Tilápias 32% Proteína 15kg',
    description: 'Alimento flutuante para alta conversão alimentar de peixes de água doce.',
    price: 89.90,
    promotionalPrice: 79.90,
    stock: 30,
    sku: 'TILAPIA-32-15KG',
    categoryId: 'cat-peixes',
    categoryName: 'Peixes e Alevinos',
    images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80'],
    weight: 15,
    brand: 'Nutripiscis',
    isActive: true,
  },

  // EQUINOS
  {
    id: 'p10',
    name: 'Ração Equinos Trabalho e Cavalgada 25kg',
    description: 'Força e energia com melaço de cana e óleos vegetais de alta digestibilidade.',
    price: 78.50,
    stock: 20,
    sku: 'EQUINO-TRAB-25KG',
    categoryId: 'cat-equinos',
    categoryName: 'Equinos',
    images: ['https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80'],
    weight: 25,
    brand: 'Presence',
    isActive: true,
  },
  {
    id: 'p11',
    name: 'Suplemento Eletrolítico Para Equinos 1kg',
    description: 'Reposição rápida de eletrólitos perdidos pelo suor durante atividades intensas.',
    price: 65.00,
    stock: 14,
    sku: 'ELETROLIT-1KG',
    categoryId: 'cat-equinos',
    categoryName: 'Equinos',
    images: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80'],
    weight: 1,
    brand: 'Vetnil',
    isActive: true,
  },

  // VACINAS E REMÉDIOS
  {
    id: 'p12',
    name: 'Vacina Aftosa Ourovac 50 Doses',
    description: 'Imunização eficaz contra febre aftosa para rebanho bovino e bubalino.',
    price: 185.00,
    stock: 45,
    sku: 'VAC-AFTOSA-50D',
    categoryId: 'cat-vacinas',
    categoryName: 'Vacinas e Remédios',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'],
    weight: 0.3,
    brand: 'Ourofino Saúde Animal',
    isActive: true,
  },
  {
    id: 'p13',
    name: 'Anti-inflamatório Flunixin Meglumine 50ml',
    description: 'Alívio rápido de dor e inflamação para bovinos e eqüinos.',
    price: 52.90,
    promotionalPrice: 47.90,
    stock: 28,
    sku: 'FLUNIXIN-50ML',
    categoryId: 'cat-vacinas',
    categoryName: 'Vacinas e Remédios',
    images: ['https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80'],
    weight: 0.1,
    brand: 'Chemotecnica',
    isActive: true,
  },

  // ACESSÓRIOS & FERRAMENTAS
  {
    id: 'p14',
    name: 'Bota Galocha Sem Biqueira Preta Cano Médio',
    description: 'Bota impermeável de PVC reforçada para uso agrícola e trabalho no campo.',
    price: 69.90,
    stock: 25,
    sku: 'BOTA-PVC-PRETA',
    categoryId: 'cat-acessorios',
    categoryName: 'Acessórios & Ferramentas',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    weight: 1.5,
    brand: 'Vulcabras',
    isActive: true,
  },
  {
    id: 'p15',
    name: 'Pulverizador Manual de Costa 20 Litros',
    description: 'Compressão prévia com gatilho de trava e lança ajustável de inox.',
    price: 219.00,
    promotionalPrice: 199.90,
    stock: 10,
    sku: 'PULVERIZ-20L',
    categoryId: 'cat-acessorios',
    categoryName: 'Acessórios & Ferramentas',
    images: ['https://images.unsplash.com/photo-1592417817098-8f3d6ef23a85?w=800&q=80'],
    weight: 4,
    brand: 'Jacto',
    isActive: true,
  }
];

const USE_MOCKS = process.env.USE_HIPER_MOCK === 'true' || !process.env.HIPER_API_TOKEN;

/**
 * Normalizes raw HIPER ERP product payload into our internal HiperProduct structure.
 * Maps exact fields from the HIPER /produtos/pontoDeSincronizacao response.
 */
function normalizeHiperProduct(raw: HiperRawProduct): HiperProduct {
  // Build images array: main image + additional images
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

  // Map variations
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

  // Map wholesale prices
  const wholesalePrices = raw.precoAtacado?.precos?.map((p) => ({
    unitPrice: p.precoUnitario,
    quantity: p.quantidade,
  }));

  return {
    id: raw.id,
    name: raw.nome || 'Produto Rancho',
    description: raw.descricao || raw.nome || '',
    price: raw.preco || 0,
    stock: raw.quantidadeEmEstoque || 0,
    sku: raw.codigoDeBarras || String(raw.codigo),
    categoryId: raw.categoriaDoProdutoId || 'cat-geral',
    categoryName: raw.categoria || 'Geral',
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
 * Fetches products from HIPER ERP using the pontoDeSincronizacao endpoint.
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
    // HIPER returns all products since a sync point; we start from 0 to get everything
    const rawResponse = await fetchHiperAPI<HiperRawProduct[] | any>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );

    // The response may be an array directly or wrapped
    const rawList: HiperRawProduct[] = Array.isArray(rawResponse)
      ? rawResponse
      : Array.isArray(rawResponse?.data)
      ? rawResponse.data
      : [];

    // Filter out removed and inactive products
    let products = rawList
      .filter((item) => !item.removido && item.ativo)
      .map(normalizeHiperProduct);

    // Client-side filtering since HIPER sync endpoint doesn't support query params
    if (categoryIdOrSlug) {
      const target = categoryIdOrSlug.toLowerCase();
      products = products.filter(
        (p) =>
          p.categoryId.toLowerCase() === target ||
          p.categoryName.toLowerCase().includes(target) ||
          p.categoryName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-') === target
      );
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

    // Paginate
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
    // Fetch all products and find by ID since HIPER doesn't have a single-product endpoint
    const allProducts = await fetchHiperAPI<HiperRawProduct[] | any>(
      '/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0'
    );

    const rawList: HiperRawProduct[] = Array.isArray(allProducts) ? allProducts : (allProducts?.data || []);
    const found = rawList.find((p) => p.id === id || String(p.codigo) === id || p.codigoDeBarras === id);

    if (!found) return null;
    return normalizeHiperProduct(found);
  } catch (error) {
    console.error(`Error fetching product ${id} from HIPER:`, error);
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}

/** Filter and paginate mock products */
function getFilteredMocks(
  page: number,
  pageSize: number,
  categoryIdOrSlug?: string,
  search?: string
): PaginatedResponse<HiperProduct> {
  let filtered = [...MOCK_PRODUCTS];

  if (categoryIdOrSlug) {
    const target = categoryIdOrSlug.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.categoryId.toLowerCase() === target ||
        p.categoryName.toLowerCase().includes(target) ||
        p.categoryName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-') === target
    );
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
