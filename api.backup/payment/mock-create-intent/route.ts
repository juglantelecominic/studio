import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, customerEmail, customerName } = body;

    console.log('Mock payment request:', { amount, currency, customerEmail, customerName });

    // Validate required fields
    if (!amount || !currency) {
      return NextResponse.json(
        { error: 'Amount and currency are required' },
        { status: 400 }
      );
    }

    // Simulate a successful payment intent creation
    const mockPaymentIntent = {
      id: `pi_mock_${Date.now()}`,
      request_id: `req_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(parseFloat(amount) * 100),
      currency: currency.toUpperCase(),
      merchant_order_id: `order_${Date.now()}`,
      status: 'created',
      created_at: new Date().toISOString(),
      client_secret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      payment_intent: mockPaymentIntent,
      client_secret: mockPaymentIntent.client_secret,
      message: 'Mock payment intent created successfully',
    });
  } catch (error) {
    console.error('Mock payment error:', error);
    return NextResponse.json(
      { error: 'Failed to create mock payment intent' },
      { status: 500 }
    );
  }
}
