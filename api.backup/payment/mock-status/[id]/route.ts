import { NextRequest, NextResponse } from 'next/server';
import { paymentIntents } from '../../mock-payment/route';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Checking mock payment status for ID: ${id}`);
    
    // Check if this is a mock payment ID
    if (!id.startsWith('pi_mock_')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not a mock payment ID' 
        },
        { status: 400 }
      );
    }
    
    // Get the payment intent from our mock storage
    const paymentIntent = paymentIntents.get(id);
    
    if (!paymentIntent) {
      console.log(`Payment intent ${id} not found in mock storage`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment intent not found' 
        },
        { status: 404 }
      );
    }
    
    // For mock payments, we'll automatically transition to successful after 5 seconds
    const createdTime = new Date(paymentIntent.created_at).getTime();
    const now = Date.now();
    const elapsedSeconds = (now - createdTime) / 1000;
    
    let status = paymentIntent.status;
    
    if (elapsedSeconds > 5 && status === 'created') {
      status = 'succeeded';
      paymentIntent.status = status;
      paymentIntent.updated_at = new Date().toISOString();
    }
    
    return NextResponse.json({
      success: true,
      payment_intent: {
        ...paymentIntent,
        status
      },
      mock: true
    });
  } catch (error) {
    console.error('Error checking mock payment status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error checking payment status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
