import axios from 'axios';

// Set up Airwallex API constants
const AIRWALLEX_BASE_URL = process.env.AIRWALLEX_BASE_URL || 'https://api-demo.airwallex.com';
const CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
const API_KEY = process.env.AIRWALLEX_API_KEY;

// API paths as per Airwallex documentation
// https://www.airwallex.com/docs/api?v=2021-02-28
const API_PATHS = {
  AUTHENTICATION: '/api/v1/authentication/login',
  PAYMENT_INTENTS_CREATE: '/api/v1/pa/payment_intents/create',
  PAYMENT_INTENTS_CONFIRM: (id: string) => `/api/v1/pa/payment_intents/${id}/confirm`,
  PAYMENT_INTENTS_GET: (id: string) => `/api/v1/pa/payment_intents/${id}`,
};

interface AirwallexTokenResponse {
  token: string;
  expires_at: string;
}

interface PaymentIntentRequest {
  request_id: string; // Required by Airwallex API
  amount: number;
  currency: string;
  merchant_order_id?: string;
  order?: {
    products?: Array<{
      name: string;
      quantity: number;
      unit_price: number;
      desc?: string;
    }>;
  };
  customer?: {
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
  };
}

interface PaymentIntentResponse {
  id: string;
  request_id: string;
  amount: number;
  currency: string;
  merchant_order_id: string;
  status: string;
  created_at: string;
  client_secret: string;
}

// Get access token from Airwallex
export async function getAirwallexToken(): Promise<string> {
  try {
    // Check for required credentials
    if (!CLIENT_ID || !API_KEY) {
      throw new Error('Missing Airwallex credentials. Please check your environment variables.');
    }

    console.log('Attempting authentication with Airwallex...');
    console.log('Base URL:', AIRWALLEX_BASE_URL);
    console.log('Client ID:', CLIENT_ID?.substring(0, 8) + '...');
    
    // Try multiple authentication methods in sequence
    const authMethods = [
      // Method 1: Headers with empty JSON body (using fetch)
      async () => {
        console.log('Trying auth method 1: Headers with fetch and empty JSON body');
        const response = await fetch(`${AIRWALLEX_BASE_URL}${API_PATHS.AUTHENTICATION}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': CLIENT_ID,
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({}), // Empty JSON body
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Status ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        if (!data.token) throw new Error('No token in response');
        
        console.log('Method 1 successful, token received');
        return data.token;
      },
      
      // Method 2: Headers with empty string body (using fetch)
      async () => {
        console.log('Trying auth method 2: Headers with fetch and empty string body');
        const response = await fetch(`${AIRWALLEX_BASE_URL}${API_PATHS.AUTHENTICATION}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': CLIENT_ID,
            'x-api-key': API_KEY,
          },
          body: '', // Empty string body
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Status ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        if (!data.token) throw new Error('No token in response');
        
        console.log('Method 2 successful, token received');
        return data.token;
      },
      
      // Method 3: Credentials in body (using fetch)
      async () => {
        console.log('Trying auth method 3: Credentials in body with fetch');
        const response = await fetch(`${AIRWALLEX_BASE_URL}${API_PATHS.AUTHENTICATION}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            api_key: API_KEY,
          }),
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Status ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        if (!data.token) throw new Error('No token in response');
        
        console.log('Method 3 successful, token received');
        return data.token;
      },
      
      // Method 4: Headers with axios
      async () => {
        console.log('Trying auth method 4: Headers with axios');
        const response = await axios({
          method: 'post',
          url: `${AIRWALLEX_BASE_URL}${API_PATHS.AUTHENTICATION}`,
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': CLIENT_ID,
            'x-api-key': API_KEY,
          },
          data: {},
        });
        
        if (!response.data.token) throw new Error('No token in response');
        console.log('Method 4 successful, token received');
        return response.data.token;
      },
      
      // Method 5: Credentials in body with axios
      async () => {
        console.log('Trying auth method 5: Credentials in body with axios');
        const response = await axios({
          method: 'post',
          url: `${AIRWALLEX_BASE_URL}${API_PATHS.AUTHENTICATION}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            client_id: CLIENT_ID,
            api_key: API_KEY,
          },
        });
        
        if (!response.data.token) throw new Error('No token in response');
        console.log('Method 5 successful, token received');
        return response.data.token;
      },
    ];
    
    // Try each authentication method in sequence
    for (let i = 0; i < authMethods.length; i++) {
      try {
        const token = await authMethods[i]();
        console.log(`Authentication successful using method ${i + 1}`);
        return token;
      } catch (error: any) {
        console.error(`Auth method ${i + 1} failed:`, error.message || String(error));
        // Continue to next method
      }
    }
    
    throw new Error('All authentication methods failed');
  } catch (error) {
    console.error('Error getting Airwallex token:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Request URL:', error.config?.url);
    }
    
    // Throw a more helpful error message
    if (!CLIENT_ID || !API_KEY) {
      throw new Error('Missing Airwallex API credentials. Please set AIRWALLEX_CLIENT_ID and AIRWALLEX_API_KEY environment variables.');
    } else {
      throw new Error('Failed to authenticate with Airwallex. Please check your API credentials and network connectivity.');
    }
  }
}

// Create payment intent
export async function createPaymentIntent(
  paymentData: PaymentIntentRequest
): Promise<PaymentIntentResponse> {
  try {
    // Validate critical parameters
    if (!paymentData.amount || !paymentData.currency || !paymentData.request_id) {
      throw new Error('Missing required payment data: amount, currency, and request_id are required');
    }

    // Get token for authentication - retry up to 3 times if needed
    let token = '';
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        attempts++;
        token = await getAirwallexToken();
        if (token) {
          console.log(`Successfully obtained auth token on attempt ${attempts}`);
          break;
        }
      } catch (authError) {
        console.error(`Authentication attempt ${attempts} failed:`, authError);
        if (attempts >= maxAttempts) throw authError;
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Log the payment data being sent
    console.log('Sending payment data to Airwallex:', JSON.stringify(paymentData, null, 2));
    console.log('Using Airwallex API URL:', `${AIRWALLEX_BASE_URL}${API_PATHS.PAYMENT_INTENTS_CREATE}`);

    // Create payment intent as per Airwallex documentation
    // https://www.airwallex.com/docs/api?v=2021-02-28#/Payment_Acceptance/Payment_Intents/
    const response = await axios({
      method: 'post',
      url: `${AIRWALLEX_BASE_URL}${API_PATHS.PAYMENT_INTENTS_CREATE}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: paymentData,
      timeout: 15000, // 15 second timeout
    });

    if (!response.data || !response.data.client_secret) {
      throw new Error('Invalid response from Airwallex API: Missing client_secret');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Request URL:', error.config?.url);
      console.error('Request data:', error.config?.data);
      
      // Check for specific error types
      if (error.response?.status === 401) {
        throw new Error('Authentication failed: Invalid or expired token');
      } else if (error.response?.status === 400) {
        throw new Error(`Bad request: ${JSON.stringify(error.response.data)}`);
      }
    }
    
    // Re-throw with the original error message if available
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to create payment intent');
    }
  }
}

// Confirm payment intent
export async function confirmPaymentIntent(
  paymentIntentId: string,
  paymentMethodId: string
): Promise<PaymentIntentResponse> {
  try {
    const token = await getAirwallexToken();

    const response = await axios.post<PaymentIntentResponse>(
      `${AIRWALLEX_BASE_URL}${API_PATHS.PAYMENT_INTENTS_CONFIRM(paymentIntentId)}`,
      {
        payment_method_id: paymentMethodId,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    throw new Error('Failed to confirm payment');
  }
}

// Get payment intent status
export async function getPaymentIntentStatus(
  paymentIntentId: string
): Promise<PaymentIntentResponse> {
  try {
    const token = await getAirwallexToken();

    const response = await axios.get<PaymentIntentResponse>(
      `${AIRWALLEX_BASE_URL}${API_PATHS.PAYMENT_INTENTS_GET(paymentIntentId)}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting payment intent status:', error);
    throw new Error('Failed to get payment status');
  }
}
