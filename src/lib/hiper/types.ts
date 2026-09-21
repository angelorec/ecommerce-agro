// ── Internal App Types ──────────────────────────────────────────────

export interface HiperProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  stock: number;
  sku: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  weight: number;
  brand: string;
  isActive: boolean;
  unit?: string;
  variations?: HiperProductVariation[];
  wholesaleActive?: boolean;
  wholesalePrices?: { unitPrice: number; quantity: number }[];
}

export interface HiperProductVariation {
  id: string;
  active: boolean;
  barcode: string;
  code: number;
  variationTypeA: string;
  variationNameA: string;
  variationTypeB: string | null;
  variationNameB: string | null;
  stock: number;
}

export interface HiperCategory {
  id: string;
  name: string;
  parentId?: string;
  slug: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── Raw HIPER API Response Types ────────────────────────────────────

/** Raw product as returned by GET /api/v1/produtos/pontoDeSincronizacao */
export interface HiperRawProduct {
  pontoDeSincronizacao: number;
  removido: boolean;
  altura: number;
  ativo: boolean;
  categoria: string;
  categoriaDoProdutoId: string;
  codigo: number;
  codigoDeBarras: string;
  comprimento: number;
  descricao: string | null;
  grade: boolean;
  id: string;
  imagem: string;
  imagensAdicionais: { imagem: string }[];
  largura: number;
  marca: string;
  ncm: string;
  nome: string;
  peso: number;
  preco: number;
  produtoPrimarioId: string;
  quantidadeEmEstoque: number;
  quantidadeMinimaEmEstoque: number;
  unidade: string;
  variacao: HiperRawVariation[];
  variacaoAtiva: boolean;
  atacadoAtivo: boolean;
  precoAtacado?: {
    precos: { precoUnitario: number; quantidade: number }[];
  };
}

export interface HiperRawVariation {
  variacaoAtiva: boolean;
  codigo: number;
  codigoDeBarras: string;
  id: string;
  nomeVariacaoA: string;
  nomeVariacaoB: string | null;
  quantidadeEmEstoque: number;
  quantidadeEmEstoqueReservado: number;
  quantidadeMinimaEmEstoque: number;
  tipoVariacaoA: string;
  tipoVariacaoB: string | null;
}

/** Raw stock response from GET /api/v1/estoques/pontoDeSincronizacao */
export interface HiperRawStock {
  pontoDeSincronizacao: number;
  produtoId: string;
  quantidadeEmEstoque: number;
  quantidadeMinimaEmEstoque: number;
  errors: string[];
  message: string | null;
}

/** Payload for POST /api/v1/pedido-de-venda/ */
export interface HiperOrderPayload {
  cliente: {
    documento: string;
    email: string;
    inscricaoEstadual: string;
    nomeDoCliente: string;
    nomeFantasia: string;
  };
  enderecoDeCobranca: {
    bairro: string;
    cep: string;
    codigoIbge: number;
    complemento: string;
    logradouro: string;
    numero: string;
  };
  enderecoDeEntrega: {
    bairro: string;
    cep: string;
    codigoIbge: number;
    complemento: string;
    logradouro: string;
    numero: string;
  };
  itens: {
    produtoId: string;
    quantidade: number;
    precoUnitarioBruto: number;
    precoUnitarioLiquido: number;
  }[];
  meiosDePagamento: {
    idMeioDePagamento: number;
    parcelas: number;
    valor: number;
  }[];
  numeroPedidoDeVenda: string;
  observacaoDoPedidoDeVenda: string;
  valorDoFrete: number;
  Marketplace?: {
    Cnpj: string;
    Nome: string;
  };
}

/** Response from POST /api/v1/pedido-de-venda/ */
export interface HiperOrderResponse {
  id: string;
  errors: string[];
  message: string;
}

/** Response from GET /api/v1/pedido-de-venda/eventos/{id} */
export interface HiperOrderStatusResponse {
  cancelado: boolean;
  codigoDaSituacaoDeProcessamento: number;
  codigoDoPedidoDeVenda: string;
  data: string;
  eventos: {
    chaveDocumentoFiscal: string | null;
    codigoDoTipoDeEvento: number;
    data: string;
    observacao: string;
    tipoDocumentoFiscal: string | null;
    urlArquivoXml: string | null;
  }[];
  pedidoDeVendaId: string;
  errors: string[];
  message: string | null;
}

/** Response from PUT /api/v1/pedido-de-venda/cancelar/{id} */
export interface HiperCancelOrderResponse {
  errors: string[];
  message: string;
}

/** HIPER Payment Method IDs */
export const HIPER_PAYMENT_METHODS = {
  dinheiro: 1,
  cheque: 2,
  devolucao: 3,
  cartao_credito: 4,
  cartao_debito: 5,
  crediario: 6,
  cartao_voucher: 11,
  pix: 12,
} as const;
