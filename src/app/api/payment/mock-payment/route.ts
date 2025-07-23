import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Cache of created payment intents for status checks
const paymentIntents = new Map();

// Helper to generate random IDs
function generateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, customerEmail, customerName, orderDetails } = body;

    console.log('Mock payment intent request received:', { 
      amount, 
      currency, 
      customerEmail,
      customerName: customerName || 'Not provided',
      orderItems: orderDetails?.length || 0
    });

    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid amount provided' 
      }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create a mock payment intent
    const paymentId = generateId('pi_mock');
    const requestId = generateId('req');
    const orderId = generateId('order');
    
    const mockPaymentIntent = {
      id: paymentId,
      request_id: requestId,
      amount: parseFloat(amount),
      currency: currency?.toUpperCase() || 'USD',
      merchant_order_id: orderId,
      status: 'created',
      created_at: new Date().toISOString(),
      customer: {
        email: customerEmail || 'customer@example.com',
        name: customerName || 'Test Customer'
      },
      client_secret: `mock_secret_${Math.random().toString(36).substring(2, 15)}`,
      order_details: orderDetails || [],
    };

    // Store in our mock database for status checks
    paymentIntents.set(paymentId, {
      ...mockPaymentIntent,
      updated_at: new Date().toISOString()
    });

    // Log storage status
    console.log(`Created mock payment intent ${paymentId}. Total intents in memory: ${paymentIntents.size}`);

    return NextResponse.json({
      success: true,
      payment_intent: mockPaymentIntent,
      client_secret: mockPaymentIntent.client_secret,
      mock: true,
      checkout_url: `/api/payment/status/${paymentId}?mock=true`
    });
  } catch (error) {
    console.error('Mock payment error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create mock payment intent', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// Export the payment intents map for use by the status endpoint
export { paymentIntents };
