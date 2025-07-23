# Airwallex Payment Integration Guide

This guide explains how the Airwallex payment integration is set up in this project, with reference to the official documentation.

## Configuration

### Environment Variables

The integration uses the following environment variables in `.env.local`:

```
AIRWALLEX_CLIENT_ID=SNY3pp-yQW-wPOU_yeRe4A
AIRWALLEX_API_KEY=2af336ee506dceb624a8fd82f10f18d09310207d31e3b3ad9d150fc79e0370cb6814c64b3fc0d9f066cb30d58ce44756
AIRWALLEX_BASE_URL=https://api-demo.airwallex.com
```

For production, you would use:
```
AIRWALLEX_BASE_URL=https://api.airwallex.com
```

## Implementation Details

### API Authentication

Authentication is implemented according to the [Airwallex API documentation](https://www.airwallex.com/docs/api?v=2021-02-28#/Authentication/API_Access/).

```typescript
// Authentication flow
const response = await axios({
  method: 'post',
  url: `${AIRWALLEX_BASE_URL}/api/v1/authentication/login`,
  headers: {
    'Content-Type': 'application/json',
    'x-client-id': CLIENT_ID,
    'x-api-key': API_KEY,
  },
});

// The token from the response is used for subsequent API calls
const token = response.data.token;
```

### Creating Payment Intents

Payment intents are created according to the [Payment Intents API](https://www.airwallex.com/docs/api?v=2021-02-28#/Payment_Acceptance/Payment_Intents/).

```typescript
const paymentIntent = await createPaymentIntent({
  request_id: `req_${uniqueId}`,
  amount: amount,
  currency: currency.toUpperCase(),
  merchant_order_id: `order_${uniqueId}`,
  customer: {
    email: customerEmail,
    first_name: firstName,
    last_name: lastName,
  },
});
```

### Checkout Flow

The checkout flow uses Airwallex's hosted payment page as documented in the [Checkout documentation](https://www.airwallex.com/docs/online-payments__checkout).

```typescript
// Determine if we're in demo or production environment
const isDemoEnvironment = paymentIntent.id.startsWith('int_demo_');

// Construct appropriate checkout URL
const checkoutUrl = isDemoEnvironment
  ? `https://checkout-demo.airwallex.com/checkout?intent_id=${paymentIntent.id}&client_secret=${paymentIntent.client_secret}`
  : `https://checkout.airwallex.com/checkout?intent_id=${paymentIntent.id}&client_secret=${paymentIntent.client_secret}`;
  
// Redirect user to checkout
window.location.href = checkoutUrl;
```

## Testing

### Test Cards

For testing in the Airwallex demo environment, use these test cards:

| Card Type | Card Number         | Expiry Date | CVC |
|-----------|---------------------|-------------|-----|
| Visa      | 4012 0010 3714 1112 | Any future  | Any |
| Mastercard| 5453 0100 0009 0022 | Any future  | Any |

### Testing Process

1. Fill out the payment form
2. Submit the form to create a payment intent
3. You will be redirected to Airwallex's checkout page
4. Enter test card details
5. Complete the payment
6. You will be redirected back to the application

## Webhooks

For production, set up webhooks to receive payment status updates. Configure these in the Airwallex dashboard and implement the webhook handler at `/api/webhooks/airwallex`.

## Digital Wallet Support

Airwallex supports Apple Pay and Google Pay through their hosted checkout page. No additional configuration is needed on your side.

For advanced digital wallet integration using the [Digital Wallet Tokens API](https://www.airwallex.com/docs/api?v=2021-02-28#/Issuing/Digital_Wallet_Tokens/), additional setup would be required.

## Troubleshooting

If you encounter errors:

1. Check the server logs for detailed error messages
2. Verify your API credentials are correct
3. Make sure the correct base URL is being used (demo vs production)
4. Check for any validation errors in the payment data
5. Ensure your account is properly set up for the payment methods you're using
