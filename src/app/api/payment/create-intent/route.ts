import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent, getAirwallexToken } from '@/lib/airwallex';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
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
      console.error('Missing Airwallex credentials in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Airwallex API credentials' },
        { status: 500 }
      );
    }

    // Generate unique request and order IDs
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const request_id = `req_${timestamp}_${randomString}`;
    const merchant_order_id = `order_${timestamp}_${randomString}`;

    // Create payment intent with Airwallex
    try {
      console.log('Creating payment intent with Airwallex using client ID:', process.env.AIRWALLEX_CLIENT_ID?.substring(0, 8) + '...');
      
      // Test authentication first
      console.log('Verifying authentication before creating payment intent...');
      try {
        const authToken = await getAirwallexToken();
        console.log('Authentication successful, token obtained');
      } catch (authError) {
        console.error('Authentication failed before creating payment intent:', authError);
        return NextResponse.json(
          { error: 'Authentication failed', details: authError instanceof Error ? authError.message : 'Unknown error' },
          { status: 401 }
        );
      }
      
      // Prepare the payment request payload
      const paymentRequest = {
        request_id,
        amount: Math.round(amount * 100) / 100, // Ensure proper decimal formatting
        currency: currency.toUpperCase(),
        merchant_order_id,
        customer: customerEmail ? {
          email: customerEmail,
          first_name: customerName?.split(' ')[0] || 'Customer',
          last_name: customerName?.split(' ').slice(1).join(' ') || 'Name',
        } : undefined,
        // Add order details if provided
        order: orderDetails ? {
          products: orderDetails
        } : undefined
      };
      
      console.log('Payment request payload:', JSON.stringify(paymentRequest, null, 2));
      
      const paymentIntent = await createPaymentIntent(paymentRequest);

      return NextResponse.json({
        success: true,
        payment_intent: paymentIntent,
        client_secret: paymentIntent.client_secret,
      });
    } catch (paymentError: any) {
      // Handle specific payment errors
      console.error('Airwallex API error:', paymentError);
      const errorMessage = paymentError.message || 'Failed to create payment intent';
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: paymentError.toString()
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { 
        error: 'Server error processing payment',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
