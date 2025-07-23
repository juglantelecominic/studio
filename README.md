# Juglant Telecom Inc. Website

This is a Next.js website for Juglant Telecom Inc. with integrated payment processing using Airwallex.

🌐 **Live Website**: [https://juglantelecominc.com/](https://juglantelecominc.com/)

## Features

- Modern IT services showcase
- Case studies and insights
- Contact form with email integration
- **Integrated payment processing** with Airwallex
- Responsive design with header and footer components
- Mock payment fallback for development/testing

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:9002](http://localhost:9002) for development or [http://localhost:3000](http://localhost:3000) for production.

## Payment System

The site includes a robust payment system with Airwallex integration:

- **Real Payments**: Integration with Airwallex payment gateway
- **Mock Payments**: Fallback system for development and testing
- **Automatic Failover**: Falls back to mock payments if authentication fails
- **Environment-based**: Controlled via `USE_MOCK_PAYMENTS` environment variable

### Payment Configuration

For production deployment, configure these environment variables:

```bash
AIRWALLEX_CLIENT_ID=your_production_client_id
AIRWALLEX_API_KEY=your_production_api_key
AIRWALLEX_BASE_URL=https://api.airwallex.com
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://juglantelecominc.com
USE_MOCK_PAYMENTS=false
```

## Documentation

- [Production Deployment Guide](./docs/PRODUCTION_DEPLOYMENT.md)
- [Payment Setup](./docs/PAYMENT_SETUP.md)
- [Airwallex Integration](./docs/AIRWALLEX_INTEGRATION.md)
- [Payment Status](./docs/PAYMENT_STATUS.md)
- [Troubleshooting](./docs/AIRWALLEX_TROUBLESHOOTING.md)

## Deployment

### GitHub Pages (Current)
The site is automatically deployed to GitHub Pages via GitHub Actions.

### Production with Real Payments
For production deployment with real payment processing:

1. Copy `.env.production.template` to `.env.local`
2. Configure production Airwallex credentials
3. Set `USE_MOCK_PAYMENTS=false`
4. Deploy to your hosting platform (Vercel, Netlify, etc.)

See [Production Deployment Guide](./docs/PRODUCTION_DEPLOYMENT.md) for detailed instructions.

## Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Development with file watching
npm run dev
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Payments**: Airwallex API integration
- **TypeScript**: Full type safety
- **Deployment**: GitHub Pages / Vercel ready
