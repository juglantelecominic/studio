# Payment System Setup Guide

This guide explains how to set up and troubleshoot the Airwallex payment integration in this project.

## Environment Variables

To use the payment system, you need to set up environment variables. Create a file called `.env.local` in the root directory with the following content:

```
# Airwallex API Credentials
AIRWALLEX_CLIENT_ID=your_client_id_here
AIRWALLEX_API_KEY=your_api_key_here
AIRWALLEX_BASE_URL=https://api-demo.airwallex.com
```

Replace `your_client_id_here` and `your_api_key_here` with your actual Airwallex API credentials.

## Common Issues and Fixes

### 500 Internal Server Error when creating payment

If you encounter a 500 error when submitting the payment form:

1. **Check environment variables**: Make sure your `.env.local` file exists and contains the correct Airwallex credentials.

2. **Check server logs**: Look at your terminal output for error messages from the server.

3. **API credentials**: Verify that your Airwallex API credentials are correct and active.

4. **Network issues**: Ensure you have a stable internet connection and can access the Airwallex API.

### Testing the API

You can test your Airwallex API credentials with the following command:

```bash
# PowerShell
$headers = @{
    "x-client-id" = "your_client_id_here"
    "x-api-key" = "your_api_key_here"
    "Content-Type" = "application/json"
}
Invoke-RestMethod -Method Post -Uri "https://api-demo.airwallex.com/api/v1/authentication/login" -Headers $headers
```

If this returns a token, your API credentials are working correctly.

## Airwallex Test Cards

For testing in the Airwallex checkout:

- **Card Number**: 4012 0010 3714 1112
- **CVC**: Any 3 digits
- **Expiry Date**: Any future date
- **Name**: Any name

## Debugging Tips

1. Check for errors in the browser console
2. Look at the Network tab in browser developer tools to see API responses
3. Check server logs for detailed error messages
4. Verify your `.env.local` file has the correct credentials

## Production Setup

For production, update your `.env.production` file to use the production Airwallex URL:

```
AIRWALLEX_BASE_URL=https://api.airwallex.com
```
