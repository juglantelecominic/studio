import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/lib/airwallex';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, customerEmail, customerName, orderDetails } = body;

    console.log('Creating payment intent for:', { amount, currency, customerEmail, customerName });

    // Validate required fields
    if (!amount || !currency) {
      return NextResponse.json(
        { error: 'Amount and currency are required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.AIRWALLEX_CLIENT_ID || !process.env.AIRWALLEX_API_KEY) {
      console.error('Missing Airwallex credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create payment intent with Airwallex
    const paymentIntent = await createPaymentIntent({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toUpperCase(),
      merchant_order_id: `order_${Date.now()}`,
      customer: {
        email: customerEmail,
        first_name: customerName?.split(' ')[0],
        last_name: customerName?.split(' ').slice(1).join(' '),
      },
      order: {
        products: orderDetails || [
          {
            name: 'IT Consulting Service',
            quantity: 1,
            unit_price: Math.round(amount * 100),
            desc: 'Professional IT consulting services',
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      payment_intent: paymentIntent,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
