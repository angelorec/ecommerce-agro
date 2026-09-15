import { fetchHiperAPI } from './client';
import { CartItem } from '../cart';

export interface HiperOrderCustomer {
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
}

export interface HiperOrderAddress {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface HiperOrderPayload {
  customer: HiperOrderCustomer;
  deliveryAddress?: HiperOrderAddress;
  pickupInStore: boolean;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  items: Array<{
    productId: string;
    sku: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingCost: number;
  notes?: string;
}

export interface HiperOrder {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
}

export async function createOrder(
  cartItems: CartItem[],
  customer: HiperOrderCustomer,
  options: {
    deliveryAddress?: HiperOrderAddress;
    pickupInStore?: boolean;
    paymentMethod: 'pix' | 'credit_card' | 'boleto';
    shippingCost: number;
  }
): Promise<HiperOrder> {
  const payload: HiperOrderPayload = {
    customer,
    deliveryAddress: options.deliveryAddress,
    pickupInStore: options.pickupInStore ?? false,
    paymentMethod: options.paymentMethod,
    shippingCost: options.shippingCost,
    items: cartItems.map((item) => ({
      productId: item.product.id,
      sku: item.product.sku,
      quantity: item.quantity,
      unitPrice: item.product.promotionalPrice ?? item.product.price,
    })),
    notes: `Pedido via e-commerce Rancho dos Pinheiros`,
  };

  // Creates the order — HIPER auto-creates the customer if they don't exist
  return await fetchHiperAPI<HiperOrder>('/api/v1/pedidos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getOrder(orderId: string): Promise<HiperOrder | null> {
  try {
    return await fetchHiperAPI<HiperOrder>(`/api/v1/pedidos/${orderId}`);
  } catch (error) {
    console.error(`[HIPER Orders] Failed to get order ${orderId}:`, error);
    return null;
  }
}

export async function cancelOrder(orderId: string): Promise<boolean> {
  try {
    await fetchHiperAPI(`/api/v1/pedidos/${orderId}/cancelar`, { method: 'POST' });
    return true;
  } catch (error) {
    console.error(`[HIPER Orders] Failed to cancel order ${orderId}:`, error);
    return false;
  }
}
