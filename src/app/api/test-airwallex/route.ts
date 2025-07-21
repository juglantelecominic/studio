import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
    const API_KEY = process.env.AIRWALLEX_API_KEY;
    const BASE_URL = process.env.AIRWALLEX_BASE_URL;

    if (!CLIENT_ID || !API_KEY) {
      return NextResponse.json({
        error: 'Missing credentials',
        hasClientId: !!CLIENT_ID,
        hasApiKey: !!API_KEY,
      });
    }

    // Test authentication with different formats
    const testMethods = [];

    // Method 1: Headers
    try {
      const response1 = await axios.post(
        `${BASE_URL}/api/v1/authentication/login`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': CLIENT_ID,
            'x-api-key': API_KEY,
          },
        }
      );
      testMethods.push({ method: 'headers', success: true, data: response1.data });
    } catch (error) {
      testMethods.push({ 
        method: 'headers', 
        success: false, 
        error: axios.isAxiosError(error) ? {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        } : 'Unknown error'
      });
    }

    // Method 2: Body
    try {
      const response2 = await axios.post(
        `${BASE_URL}/api/v1/authentication/login`,
        {
          client_id: CLIENT_ID,
          api_key: API_KEY,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      testMethods.push({ method: 'body', success: true, data: response2.data });
    } catch (error) {
      testMethods.push({ 
        method: 'body', 
        success: false, 
        error: axios.isAxiosError(error) ? {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        } : 'Unknown error'
      });
    }

    return NextResponse.json({
      baseUrl: BASE_URL,
      clientIdPresent: !!CLIENT_ID,
      apiKeyPresent: !!API_KEY,
      testResults: testMethods,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed', details: error },
      { status: 500 }
    );
  }
}
