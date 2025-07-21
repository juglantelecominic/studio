import axios from 'axios';

const AIRWALLEX_BASE_URL = process.env.AIRWALLEX_BASE_URL || 'https://api-demo.airwallex.com';
const CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
const API_KEY = process.env.AIRWALLEX_API_KEY;

interface AirwallexTokenResponse {
  token: string;
  expires_at: string;
}

interface PaymentIntentRequest {
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
    const response = await axios.post<AirwallexTokenResponse>(
      `${AIRWALLEX_BASE_URL}/api/v1/authentication/login`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': CLIENT_ID,
          'x-api-key': API_KEY,
        },
      }
    );

    return response.data.token;
  } catch (error) {
    console.error('Error getting Airwallex token:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw new Error('Failed to authenticate with Airwallex');
  }
}

// Create payment intent
export async function createPaymentIntent(
  paymentData: PaymentIntentRequest
): Promise<PaymentIntentResponse> {
  try {
    const token = await getAirwallexToken();

    const response = await axios.post<PaymentIntentResponse>(
      `${AIRWALLEX_BASE_URL}/api/v1/pa/payment_intents/create`,
      paymentData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
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
      `${AIRWALLEX_BASE_URL}/api/v1/pa/payment_intents/${paymentIntentId}/confirm`,
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
      `${AIRWALLEX_BASE_URL}/api/v1/pa/payment_intents/${paymentIntentId}`,
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
