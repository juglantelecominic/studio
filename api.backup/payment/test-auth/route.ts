import { NextRequest, NextResponse } from 'next/server';
import { getAirwallexToken } from '@/lib/airwallex';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log("Testing Airwallex authentication with multi-method approach...");
    
    // Add detailed environment info for debugging
    const envInfo = {
      base_url: process.env.AIRWALLEX_BASE_URL || 'not set',
      client_id_exists: !!process.env.AIRWALLEX_CLIENT_ID,
      api_key_exists: !!process.env.AIRWALLEX_API_KEY,
      client_id_length: process.env.AIRWALLEX_CLIENT_ID?.length || 0,
      api_key_length: process.env.AIRWALLEX_API_KEY?.length || 0,
      client_id_preview: process.env.AIRWALLEX_CLIENT_ID ? 
        `${process.env.AIRWALLEX_CLIENT_ID.substring(0, 5)}...` : 'not set',
      api_key_preview: process.env.AIRWALLEX_API_KEY ? 
        `${process.env.AIRWALLEX_API_KEY.substring(0, 5)}...` : 'not set',
    };
    
    console.log("Environment configuration:", envInfo);
    
    // Track authentication time for performance monitoring
    const startTime = Date.now();
    const token = await getAirwallexToken();
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    
    console.log(`Authentication completed in ${timeTaken}ms`);
    
    if (!token) {
      throw new Error("Authentication process completed but no token was returned");
    }
    
    // Only return a prefix of the token for security reasons
    return NextResponse.json({
      success: true,
      message: "Authentication successful with multi-method approach",
      tokenPrefix: token.substring(0, 10) + "...",
      tokenLength: token.length,
      timestamp: new Date().toISOString(),
      timeTakenMs: timeTaken,
      environment: envInfo
    });
  } catch (error) {
    console.error("Authentication test failed:", error);
    
    let errorMessage = "Unknown error";
    let errorDetails: Record<string, any> = {};
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails.stack = error.stack;
      
      // Include additional properties that may be present in custom error types
      Object.getOwnPropertyNames(error).forEach(prop => {
        if (prop !== 'message' && prop !== 'stack') {
          const value = (error as any)[prop];
          if (typeof value !== 'function') {
            errorDetails[prop] = value;
          }
        }
      });
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: errorDetails,
      timestamp: new Date().toISOString(),
      environment: {
        base_url: process.env.AIRWALLEX_BASE_URL || 'not set',
        client_id_exists: !!process.env.AIRWALLEX_CLIENT_ID,
        api_key_exists: !!process.env.AIRWALLEX_API_KEY
      }
    }, { status: 500 });
  }
}
