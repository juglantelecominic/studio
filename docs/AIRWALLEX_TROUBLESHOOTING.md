# Troubleshooting Airwallex Payment Integration

## Configuration Error: "Invalid request against merchant configuration"

If you encounter the error:
```
Error: Bad request: {"code":"configuration_error","message":"Invalid request against merchant configuration. Please contact your account manager."}
```

### Possible Causes and Solutions:

1. **Account Configuration Issue**
   - Your Airwallex account may not be fully set up or configured for the payment types you're trying to process.
   - **Solution:** Contact your Airwallex account manager to ensure your account is properly configured.

2. **Missing Required Fields**
   - The API request may be missing fields required by your specific merchant configuration.
   - **Solution:** Review the Airwallex API documentation and ensure all required fields for your account are included.

3. **Currency Restrictions**
   - Your account may have restrictions on which currencies it can process.
   - **Solution:** Try using only currencies explicitly enabled for your account (e.g., USD).

4. **Testing vs Production Environment**
   - You might be using test credentials in production or vice versa.
   - **Solution:** Double check that you're using the correct API endpoint and credentials for your intended environment.

5. **Missing Product Information**
   - Some merchant configurations require detailed product information.
   - **Solution:** Make sure you're providing complete order details in the request.

## Using the Mock Payment System

For development purposes, we've implemented a mock payment system:

1. The application now uses the `/api/payment/mock-create-intent` endpoint instead of the real Airwallex API.
2. This allows development to proceed without needing to resolve Airwallex account issues.
3. The mock system simulates payment flows without making actual API calls.

### Testing the Mock Payment Flow

1. Fill out the payment form as usual
2. Submit the form
3. The system will simulate a successful payment process
4. After 2 seconds, the payment status will update to "succeeded"

### Reverting to the Real Payment System

Once your Airwallex account issues are resolved:

1. Open `src/components/sections/payment-form.tsx`
2. Replace `/api/payment/mock-create-intent` with `/api/payment/create-intent`
3. Uncomment the Airwallex checkout redirection code

## Additional Debugging Tips

1. **Enable Debug Logging in Airwallex**
   ```
   AIRWALLEX_DEBUG_MODE=true
   ```

2. **Check Network Requests**
   - Use browser developer tools to inspect the network request and response
   - Look for specific field errors in the response

3. **Verify API Version**
   - Ensure you're using an API version compatible with your account
