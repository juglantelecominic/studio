import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Airwallex webhook received:', body);

    // Verify webhook signature (in production, you should verify this)
    const eventType = body.name;
    const paymentIntent = body.data?.object;

    switch (eventType) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', paymentIntent?.id);
        // Handle successful payment
        // You can update your database, send confirmation emails, etc.
        break;
        
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', paymentIntent?.id);
        // Handle failed payment
        break;
        
      case 'payment_intent.cancelled':
        console.log('Payment cancelled:', paymentIntent?.id);
        // Handle cancelled payment
        break;
        
      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
