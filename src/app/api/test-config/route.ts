import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const clientId = process.env.AIRWALLEX_CLIENT_ID;
    const apiKey = process.env.AIRWALLEX_API_KEY;
    const baseUrl = process.env.AIRWALLEX_BASE_URL;

    return NextResponse.json({
      success: true,
      hasClientId: !!clientId,
      hasApiKey: !!apiKey,
      baseUrl: baseUrl,
      clientIdLength: clientId?.length || 0,
      apiKeyLength: apiKey?.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check configuration' },
      { status: 500 }
    );
  }
}
