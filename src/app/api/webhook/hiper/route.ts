import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log('[HIPER Webhook /api/webhook/hiper]:', JSON.stringify(payload, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook do HIPER ERP recebido com sucesso',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[HIPER Webhook Error]:', error);
    return NextResponse.json({ success: true, note: 'Payload recebido' }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: 'HIPER ERP Webhook Listener — Rancho dos Pinheiros',
  });
}
