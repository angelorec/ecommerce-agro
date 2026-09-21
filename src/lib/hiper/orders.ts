import { fetchHiperAPI } from './client';
import {
  HiperOrderPayload,
  HiperOrderResponse,
  HiperOrderStatusResponse,
  HiperCancelOrderResponse,
  HIPER_PAYMENT_METHODS,
} from './types';
import { CartItem } from '../cart';

// ── Public Interfaces for the Checkout Flow ─────────────────────────

export interface OrderCustomer {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
}

export interface OrderAddress {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoIbge?: number;
}

export type PaymentMethod = 'pix' | 'cartao' | 'boleto' | 'dinheiro';

// ── Order Creation ──────────────────────────────────────────────────

/**
 * Creates an order on HIPER ERP.
 * Endpoint: POST /api/v1/pedido-de-venda/
 * 
 * Maps our checkout form data into the exact HIPER payload structure.
 */
export async function createHiperOrder(
  cartItems: CartItem[],
  customer: OrderCustomer,
  address: OrderAddress | null,
  paymentMethod: PaymentMethod,
  shippingCost: number,
  parcelas = 1,
  observacao = ''
): Promise<HiperOrderResponse> {
  // Calculate totals
  const itemsTotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.product.promotionalPrice ?? item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  // Apply PIX discount if applicable
  const totalWithDiscount = paymentMethod === 'pix' 
    ? (itemsTotal + shippingCost) * 0.95 
    : itemsTotal + shippingCost;

  // Map payment method to HIPER ID
  const hiperPaymentId = mapPaymentMethod(paymentMethod);

  // Build the address objects — use billing = delivery for simplicity
  const addressPayload = address ? {
    bairro: address.bairro,
    cep: address.cep.replace(/\D/g, ''),
    codigoIbge: address.codigoIbge || 0,
    complemento: address.complemento || '',
    logradouro: address.logradouro,
    numero: address.numero,
  } : {
    bairro: '',
    cep: '',
    codigoIbge: 0,
    complemento: '',
    logradouro: '',
    numero: '',
  };

  const payload: HiperOrderPayload = {
    cliente: {
      documento: customer.cpf.replace(/\D/g, ''),
      email: customer.email,
      inscricaoEstadual: '',
      nomeDoCliente: customer.nome,
      nomeFantasia: '',
    },
    enderecoDeCobranca: addressPayload,
    enderecoDeEntrega: addressPayload,
    itens: cartItems.map((item) => {
      const unitPrice = item.product.promotionalPrice ?? item.product.price;
      return {
        produtoId: item.product.id,
        quantidade: item.quantity,
        precoUnitarioBruto: item.product.price,
        precoUnitarioLiquido: unitPrice,
      };
    }),
    meiosDePagamento: [
      {
        idMeioDePagamento: hiperPaymentId,
        parcelas,
        valor: totalWithDiscount,
      },
    ],
    numeroPedidoDeVenda: '',
    observacaoDoPedidoDeVenda: observacao || `Pedido via e-commerce Rancho dos Pinheiros`,
    valorDoFrete: shippingCost,
  };

  return await fetchHiperAPI<HiperOrderResponse>('/api/v1/pedido-de-venda/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Order Consultation ──────────────────────────────────────────────

/**
 * Consults an order's status and events on HIPER ERP.
 * Endpoint: GET /api/v1/pedido-de-venda/eventos/{id}
 */
export async function getOrderStatus(orderId: string): Promise<HiperOrderStatusResponse | null> {
  try {
    return await fetchHiperAPI<HiperOrderStatusResponse>(
      `/api/v1/pedido-de-venda/eventos/${encodeURIComponent(orderId)}`
    );
  } catch (error) {
    console.error(`[HIPER Orders] Failed to get order ${orderId}:`, error);
    return null;
  }
}

// ── Order Cancellation ──────────────────────────────────────────────

/**
 * Cancels an order on HIPER ERP.
 * Endpoint: PUT /api/v1/pedido-de-venda/cancelar/{id}
 */
export async function cancelOrder(orderId: string): Promise<HiperCancelOrderResponse> {
  return await fetchHiperAPI<HiperCancelOrderResponse>(
    `/api/v1/pedido-de-venda/cancelar/${encodeURIComponent(orderId)}`,
    { method: 'PUT' }
  );
}

// ── Helpers ─────────────────────────────────────────────────────────

function mapPaymentMethod(method: PaymentMethod): number {
  switch (method) {
    case 'pix':
      return HIPER_PAYMENT_METHODS.pix;
    case 'cartao':
      return HIPER_PAYMENT_METHODS.cartao_credito;
    case 'boleto':
      // HIPER doesn't have a boleto ID; map to dinheiro as closest
      return HIPER_PAYMENT_METHODS.dinheiro;
    case 'dinheiro':
      return HIPER_PAYMENT_METHODS.dinheiro;
    default:
      return HIPER_PAYMENT_METHODS.pix;
  }
}
