# Production Deployment Guide

## Prerequisites

1. **Domain**: juglantelecominc.com (already configured)
2. **Airwallex Production Account**: Get production API credentials
3. **Hosting Platform**: Vercel, Netlify, or any Node.js hosting service

## Deployment Steps

### 1. Environment Variables Setup

Copy `.env.production.template` to `.env.local` (or configure in your hosting platform):

```bash
# Required Production Environment Variables
AIRWALLEX_CLIENT_ID=your_production_client_id
AIRWALLEX_API_KEY=your_production_api_key
AIRWALLEX_BASE_URL=https://api.airwallex.com
NEXTAUTH_SECRET=your_production_secret_at_least_32_characters_long
NEXTAUTH_URL=https://juglantelecominc.com
USE_MOCK_PAYMENTS=false
```

### 2. Airwallex Production Setup

1. **Switch to Production Environment**:
   - Change `AIRWALLEX_BASE_URL` from `https://api-demo.airwallex.com` to `https://api.airwallex.com`
   - Use production API credentials from Airwallex dashboard

2. **Configure Webhooks** (if needed):
   - Set webhook URL to: `https://juglantelecominc.com/api/webhooks/airwallex`

3. **Test Payment Flow**:
   - Use real credit cards (start with small amounts)
   - Verify redirects work correctly with production domain

### 3. Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### 4. Domain Configuration

Ensure your domain `juglantelecominc.com` points to your hosting service.

### 5. SSL Certificate

Make sure SSL is properly configured for secure payments.

## Testing in Production

1. **Test Authentication**: Visit `/api/payment/test-auth`
2. **Test Payment Flow**: Use the shop page with small amounts
3. **Verify Redirects**: Ensure Airwallex redirects work correctly

## Rollback Plan

If issues occur:
1. Set `USE_MOCK_PAYMENTS=true` to enable mock payments
2. This allows the site to continue functioning while debugging

## Monitoring

- Monitor server logs for payment errors
- Check Airwallex dashboard for transaction status
- Set up alerts for failed payments
