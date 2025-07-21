import { NextRequest, NextResponse } from 'next/server';
import { getPaymentIntentStatus } from '@/lib/airwallex';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentIntentId = params.id;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Get payment status from Airwallex
    const paymentStatus = await getPaymentIntentStatus(paymentIntentId);

    return NextResponse.json({
      success: true,
      payment: paymentStatus,
      status: paymentStatus.status,
    });
  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: 'Failed to get payment status' },
      { status: 500 }
    );
  }
}
