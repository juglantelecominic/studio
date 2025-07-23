import { NextRequest, NextResponse } from 'next/server';
import { confirmPaymentIntent } from '@/lib/airwallex';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payment_intent_id, payment_method_id } = body;

    // Validate required fields
    if (!payment_intent_id || !payment_method_id) {
      return NextResponse.json(
        { error: 'Payment intent ID and payment method ID are required' },
        { status: 400 }
      );
    }

    // Confirm payment with Airwallex
    const confirmedPayment = await confirmPaymentIntent(
      payment_intent_id,
      payment_method_id
    );

    return NextResponse.json({
      success: true,
      payment: confirmedPayment,
      status: confirmedPayment.status,
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
