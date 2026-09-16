import { fetchHiperAPI } from './client';
import { HiperProduct, PaginatedResponse } from './types';

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

const USE_MOCKS = process.env.USE_HIPER_MOCK === 'true' || !process.env.HIPER_API_KEY;

/**
 * Normalizes raw HIPER ERP product payload into standard HiperProduct structure
 */
function normalizeHiperProduct(item: any): HiperProduct {
  const rawId = String(item.id || item.produtoId || item.codigoHiper || item.codigo || Math.random());
  const rawName = item.name || item.nome || item.descricao || item.titulo || 'Produto Rancho';
  const rawPrice = Number(item.price || item.preco || item.precoVenda || item.valor || 0);
  const rawPromoPrice = item.promotionalPrice || item.precoPromocional || item.precoOferta || item.valorPromocional;
  const rawStock = Number(item.stock || item.estoque || item.saldoEstoque || item.quantidade || 0);

  // Parse Images
  let images: string[] = [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    images = item.images.map((img: any) => (typeof img === 'string' ? img : img.url || img.caminho));
  } else if (Array.isArray(item.fotos) && item.fotos.length > 0) {
    images = item.fotos.map((img: any) => (typeof img === 'string' ? img : img.url || img.caminho));
  } else if (item.imagemPrincipal || item.fotoPrincipal || item.imagemUrl) {
    images = [item.imagemPrincipal || item.fotoPrincipal || item.imagemUrl];
  } else {
    images = ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80'];
  }

  // Parse Category
  const catObj = item.category || item.categoria || {};
  const catName = typeof catObj === 'string' ? catObj : catObj.nome || item.categoryName || item.categoriaNome || 'Geral';
  const catId = typeof catObj === 'object' ? (catObj.id || catObj.categoriaId || 'cat-geral') : (item.categoryId || 'cat-geral');

  return {
    id: rawId,
    name: rawName,
    description: item.description || item.descricaoCurta || item.detalhes || rawName,
    price: rawPrice > 0 ? rawPrice : 99.90,
    promotionalPrice: rawPromoPrice ? Number(rawPromoPrice) : undefined,
    stock: rawStock,
    sku: item.sku || item.codigoBarras || item.codigoRef || `SKU-${rawId}`,
    categoryId: String(catId),
    categoryName: String(catName),
    images,
    weight: Number(item.weight || item.peso || 1),
    brand: typeof item.brand === 'object' ? (item.brand.nome || 'Rancho') : (item.brand || item.marca || 'Rancho dos Pinheiros'),
    isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
  };
}

export async function getProducts(
  page = 1,
  pageSize = 50,
  categoryIdOrSlug?: string,
  search?: string
): Promise<PaginatedResponse<HiperProduct>> {
  if (USE_MOCKS) {
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

  try {
    let queryParams = `?page=${page}&pageSize=${pageSize}&somenteAtivos=true`;
    if (categoryIdOrSlug) queryParams += `&categoriaId=${encodeURIComponent(categoryIdOrSlug)}`;
    if (search) queryParams += `&busca=${encodeURIComponent(search)}`;

    const rawResponse = await fetchHiperAPI<any>(`/api/v1/produtos${queryParams}`);

    const rawList = Array.isArray(rawResponse)
      ? rawResponse
      : Array.isArray(rawResponse?.data)
      ? rawResponse.data
      : Array.isArray(rawResponse?.produtos)
      ? rawResponse.produtos
      : MOCK_PRODUCTS;

    const products = rawList.map(normalizeHiperProduct);

    return {
      data: products,
      total: rawResponse?.total || rawResponse?.totalItens || products.length,
      page,
      pageSize,
      totalPages: rawResponse?.totalPages || Math.ceil(products.length / pageSize) || 1,
    };
  } catch (error) {
    console.error('Error fetching products from HIPER:', error);

    // Filter mock as fallback
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

    return {
      data: filtered,
      total: filtered.length,
      page: 1,
      pageSize,
      totalPages: 1,
    };
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
    const raw = await fetchHiperAPI<any>(`/api/v1/produtos/${id}`);
    if (!raw) return null;
    return normalizeHiperProduct(raw);
  } catch (error) {
    console.error(`Error fetching product ${id} from HIPER:`, error);
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}
