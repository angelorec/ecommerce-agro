import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/hiper/orders';
import { checkAvailability } from '@/lib/hiper/stock';
import { z } from 'zod';

const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    cpfCnpj: z.string().min(11),
    phone: z.string().min(10),
  }),
  deliveryAddress: z.object({
    cep: z.string().length(8),
    street: z.string().min(2),
    number: z.string().min(1),
    neighborhood: z.string().min(2),
    city: z.string().min(2),
    state: z.string().length(2),
  }).optional(),
  pickupInStore: z.boolean().default(false),
  paymentMethod: z.enum(['pix', 'credit_card', 'boleto']),
  shippingCost: z.number().min(0),
  items: z.array(z.object({
    productId: z.string(),
    sku: z.string(),
    quantity: z.number().int().min(1),
    unitPrice: z.number().min(0),
    stock: z.number().int().min(0),
    images: z.array(z.string()),
    name: z.string(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
    categoryName: z.string().optional(),
    weight: z.number().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    promotionalPrice: z.number().optional(),
    isActive: z.boolean().optional(),
  })),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = orderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { customer, deliveryAddress, pickupInStore, paymentMethod, shippingCost, items } = validated.data;

    // 1. Check stock availability before creating order
    const stockChecks = await checkAvailability(
      items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
    );

    const unavailableItems = stockChecks.filter((s) => !s.isAvailable);
    if (unavailableItems.length > 0) {
      return NextResponse.json(
        {
          error: 'Estoque insuficiente',
          unavailableItems: unavailableItems.map((s) => ({
            productId: s.productId,
            requested: s.requested,
            available: s.available,
          })),
        },
        { status: 409 }
      );
    }

    // 2. Create the order on HIPER (auto-registers customer if new)
    const order = await createOrder(
      items.map((item) => ({
        product: {
          id: item.productId,
          sku: item.sku,
          name: item.name,
          description: item.description ?? '',
          price: item.price ?? item.unitPrice,
          promotionalPrice: item.promotionalPrice,
          stock: item.stock,
          categoryId: item.categoryId ?? '',
          categoryName: item.categoryName ?? '',
          images: item.images,
          weight: item.weight ?? 0,
          brand: item.brand ?? '',
          isActive: item.isActive ?? true,
        },
        quantity: item.quantity,
      })),
      customer,
      { deliveryAddress, pickupInStore, paymentMethod, shippingCost }
    );

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('[API /orders] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar pedido' },
      { status: 500 }
    );
  }
}
