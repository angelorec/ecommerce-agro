import { NextRequest, NextResponse } from 'next/server';
import { createHiperOrder, getOrderStatus, cancelOrder } from '@/lib/hiper/orders';
import { z } from 'zod';

const orderSchema = z.object({
  customer: z.object({
    nome: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    cpf: z.string().min(11, 'CPF/CNPJ inválido'),
    telefone: z.string().min(10, 'Telefone inválido').default(''),
  }),
  address: z.object({
    cep: z.string().min(8, 'CEP inválido'),
    logradouro: z.string().min(2, 'Endereço é obrigatório'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().default(''),
    bairro: z.string().min(2, 'Bairro é obrigatório'),
    cidade: z.string().min(2, 'Cidade é obrigatória'),
    estado: z.string().length(2, 'Estado deve ter 2 letras'),
    codigoIbge: z.number().default(0),
  }).nullable(),
  paymentMethod: z.enum(['pix', 'cartao', 'boleto', 'dinheiro']),
  parcelas: z.number().int().min(1).max(12).default(1),
  shippingCost: z.number().min(0),
  pickupInStore: z.boolean().default(false),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    sku: z.string(),
    quantity: z.number().int().min(1),
    unitPrice: z.number().min(0),
    originalPrice: z.number().min(0),
    images: z.array(z.string()).default([]),
  })).min(1, 'Carrinho vazio'),
  observacao: z.string().default(''),
});

/**
 * POST /api/orders — Creates a new order on HIPER ERP
 */
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

    const { customer, address, paymentMethod, parcelas, shippingCost, items, observacao } = validated.data;

    // Map items to the CartItem-like shape that createHiperOrder expects
    const cartItems = items.map((item) => ({
      product: {
        id: item.productId,
        name: item.name,
        sku: item.sku,
        description: '',
        price: item.originalPrice,
        promotionalPrice: item.unitPrice !== item.originalPrice ? item.unitPrice : undefined,
        stock: 999,
        categoryId: '',
        categoryName: '',
        images: item.images,
        weight: 0,
        brand: '',
        isActive: true,
      },
      quantity: item.quantity,
    }));

    const orderResponse = await createHiperOrder(
      cartItems,
      customer,
      address,
      paymentMethod,
      shippingCost,
      parcelas,
      observacao
    );

    // Check for HIPER errors
    if (orderResponse.errors && orderResponse.errors.length > 0) {
      return NextResponse.json(
        { error: 'Erro ao criar pedido no HIPER', details: orderResponse.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: true, orderId: orderResponse.id, message: orderResponse.message },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /orders POST] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar pedido' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders?id=xxx — Consults an order status on HIPER ERP
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  if (!orderId) {
    return NextResponse.json({ error: 'ID do pedido é obrigatório' }, { status: 400 });
  }

  try {
    const status = await getOrderStatus(orderId);
    if (!status) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }
    return NextResponse.json(status);
  } catch (error) {
    console.error('[API /orders GET] Error:', error);
    return NextResponse.json({ error: 'Erro ao consultar pedido' }, { status: 500 });
  }
}
