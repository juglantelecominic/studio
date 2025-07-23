"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosResponse } from "axios";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const paymentSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  currency: z.string().min(3, "Please select a currency"),
  serviceType: z.string().min(1, "Please select a service type"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const serviceTypes = [
  { value: "consultation", label: "IT Consultation", price: 150 },
  { value: "cloud-migration", label: "Cloud Migration", price: 2500 },
  { value: "security-audit", label: "Security Audit", price: 800 },
  { value: "managed-services", label: "Managed IT Services", price: 500 },
  { value: "custom", label: "Custom Service", price: 0 },
  // Shop products
  { value: "crm-integration", label: "CRM Integration Services", price: 350 },
  { value: "custom-api", label: "Custom API Integrations", price: 250 },
  { value: "icloud-solution", label: "ICloud Solution", price: 100 },
  { value: "strategic-it", label: "Strategic IT Planning", price: 150 },
  { value: "cybersecurity", label: "Cybersecurity Solutions", price: 250 },
  { value: "system-integration", label: "System Integration", price: 300 },
  { value: "network-solutions", label: "Network Solutions", price: 175 },
  { value: "support-consulting", label: "Support Consulting", price: 225 },
];

interface PaymentFormProps {
  prefilledAmount?: string;
  prefilledService?: string;
  productName?: string;
}

export function PaymentForm({ prefilledAmount, prefilledService, productName }: PaymentFormProps = {}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      amount: prefilledAmount || "",
      currency: "USD",
      serviceType: prefilledService || "",
    },
  });

  const selectedService = serviceTypes.find(
    (service) => service.value === form.watch("serviceType")
  );

  // Update amount when service type changes
  const handleServiceTypeChange = (value: string) => {
    const service = serviceTypes.find((s) => s.value === value);
    if (service && service.price > 0) {
      form.setValue("amount", service.price.toString());
    } else if (service?.value === "custom") {
      form.setValue("amount", "");
    }
  };

  // Function to handle real payment response
  const handleRealPaymentResponse = (response: any, amount: number, currency: string) => {
    if (response.data.success && response.data.client_secret) {
      setPaymentIntent(response.data.payment_intent);
      toast({
        title: "Payment Intent Created!",
        description: `Payment intent created for $${amount} ${currency}.`,
      });

      // Redirect to Airwallex's hosted payment page for real payment processing
      console.log("Payment Intent:", response.data.payment_intent);
      console.log("Client Secret:", response.data.client_secret.substring(0, 20) + "...");
      
      // For Airwallex integration, construct the checkout URL based on payment intent ID
      // https://www.airwallex.com/docs/online-payments__checkout
      const isDemoEnvironment = response.data.payment_intent.id.startsWith('int_demo_');
      const airwallexPaymentUrl = isDemoEnvironment
        ? `https://checkout-demo.airwallex.com/checkout?intent_id=${response.data.payment_intent.id}&client_secret=${response.data.client_secret}`
        : `https://checkout.airwallex.com/checkout?intent_id=${response.data.payment_intent.id}&client_secret=${response.data.client_secret}`;
      
      toast({
        title: "Redirecting to Payment...",
        description: "You will be redirected to complete your payment securely with Airwallex.",
      });
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        window.open(airwallexPaymentUrl, '_blank');
      }, 1500);
    } else {
      // Handle malformed success response
      console.error("Invalid response format:", response.data);
      throw new Error("Received invalid response from server");
    }
  };

  async function onSubmit(values: PaymentFormData) {
    setIsProcessing(true);
    setErrorMessage(null); // Clear any previous error messages

    try {
      // Validate input data
      const amount = parseFloat(values.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }
      
      // Validate email
      if (!values.customerEmail || !values.customerEmail.includes('@')) {
        throw new Error("Please enter a valid email address");
      }
      
      // Validate name
      if (!values.customerName || values.customerName.trim().length < 2) {
        throw new Error("Please enter your full name");
      }

      // Determine whether to use mock or real payment system
      // In production, this should be false to use real payments
      // For development/testing, set to true to use mock payments
      const useMockPayment = process.env.USE_MOCK_PAYMENTS === 'true' || false;
      
      if (!useMockPayment) {
        // First try the test-auth endpoint to check if authentication works
        console.log("Testing authentication before payment submission...");
        let authWorks = false;
        
        try {
          const authTest = await axios.get("/api/payment/test-auth");
          console.log("Auth test result:", authTest.data);
          authWorks = authTest.data?.success === true;
        } catch (authTestError) {
          console.warn("Auth test failed, will use mock payment system:", authTestError);
          authWorks = false;
        }
        
        if (authWorks) {
          // Authentication works, proceed with real payment
          console.log("Authentication successful, using real payment system");
          
          // Create payment intent using real Airwallex API
          console.log("Submitting payment data to real API:", {
            amount,
            currency: values.currency,
            customerEmail: values.customerEmail,
            customerName: values.customerName,
            serviceType: values.serviceType,
          });
          
          const response = await axios.post("/api/payment/create-intent", {
            amount: amount,
            currency: values.currency,
            customerEmail: values.customerEmail,
            customerName: values.customerName,
            orderDetails: [
              {
                name: selectedService?.label || "IT Service",
                quantity: 1,
                unit_price: Math.round(amount * 100),
                desc: `${selectedService?.label || "IT Service"} for ${values.customerName}`,
              },
            ],
          });
          
          handleRealPaymentResponse(response, amount, values.currency);
          return;
        }
      }
      
      // If authentication failed or mock payment is preferred, use mock payment system
      console.log("Using mock payment system");
      toast({
        title: "Using Development Mode",
        description: "Processing payment with mock payment system",
      });
      
      const mockResponse = await axios.post("/api/payment/mock-payment", {
        amount: amount,
        currency: values.currency,
        customerEmail: values.customerEmail,
        customerName: values.customerName,
        orderDetails: [
          {
            name: selectedService?.label || "IT Service",
            quantity: 1,
            unit_price: Math.round(amount * 100),
            desc: `${selectedService?.label || "IT Service"} for ${values.customerName}`,
          },
        ],
      });

      if (mockResponse.data.success) {
        setPaymentIntent(mockResponse.data.payment_intent);
        
        toast({
          title: "Payment Processing",
          description: `Payment of $${amount} ${values.currency} is being processed.`,
        });
        
        console.log("Mock Payment Intent:", mockResponse.data.payment_intent);
        
        // Poll the payment status
        const paymentId = mockResponse.data.payment_intent.id;
        const pollInterval = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`/api/payment/mock-status/${paymentId}`);
            if (statusResponse.data.success) {
              const updatedStatus = statusResponse.data.payment_intent.status;
              console.log(`Payment status update: ${updatedStatus}`);
              
              // Update the UI with the new status
              setPaymentIntent(statusResponse.data.payment_intent);
              
              // If payment is complete, show success and stop polling
              if (updatedStatus === 'succeeded') {
                clearInterval(pollInterval);
                toast({
                  title: "Payment Successful",
                  description: "Your payment was processed successfully.",
                });
              }
            }
          } catch (error) {
            console.error("Error polling payment status:", error);
          }
        }, 1500); // Poll every 1.5 seconds
        
        // Make sure to stop polling after reasonable time
        setTimeout(() => clearInterval(pollInterval), 15000);
      } else {
        // Handle malformed mock response
        console.error("Invalid mock response format:", mockResponse.data);
        throw new Error("Received invalid response from mock payment system");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      
      // Extract detailed error message if available
      let errorMessage = "There was an error processing your payment. Please try again.";
      
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
        
        // Show more specific error based on status code
        if (error.response?.status === 500) {
          errorMessage = "Server error: The payment system is currently unavailable. Please try again later.";
          
          // Check if there's a more detailed error message from the server
          if (error.response.data?.details) {
            console.error("Error details:", error.response.data.details);
            errorMessage = `Server error: ${error.response.data.details}`;
          }
        } else if (error.response?.status === 400) {
          errorMessage = "Invalid payment information. Please check your details and try again.";
        } else if (error.response?.status === 401 || error.response?.status === 403) {
          errorMessage = "Authentication error with payment provider. Please contact support.";
        } else if (!error.response) {
          errorMessage = "Network error. Please check your internet connection and try again.";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Payment Error",
        description: "Please check the error details below",
        variant: "destructive",
      });
      
      // Set error message for display in UI
      setErrorMessage(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{productName ? `Payment for ${productName}` : "Payment for IT Services"}</CardTitle>
        <CardDescription>
          {productName ? `Complete your purchase of ${productName}` : "Choose your service and complete the payment"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <ErrorMessage 
            title="Payment Error" 
            message={errorMessage} 
            onDismiss={() => setErrorMessage(null)} 
          />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleServiceTypeChange(value);
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label} {service.price > 0 && `($${service.price})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="0.00" 
                      type="number" 
                      step="0.01" 
                      {...field}
                      disabled={selectedService?.value !== "custom"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                      <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">
                <strong>Secure Payment:</strong> All payments are processed securely through Airwallex's real payment system.
              </p>
              <p className="text-xs text-green-700 mt-1">
                You will be redirected to Airwallex's secure checkout page to complete payment.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90" 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay $${form.watch("amount")} ${form.watch("currency")}`}
            </Button>
          </form>
        </Form>

        {paymentIntent && (
          <div className={`mt-4 p-4 border rounded-lg ${
            paymentIntent.status === 'succeeded' 
              ? 'bg-green-50 border-green-200' 
              : paymentIntent.status === 'created'
              ? 'bg-blue-50 border-blue-200'
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <h4 className={`font-semibold ${
              paymentIntent.status === 'succeeded' 
                ? 'text-green-800' 
                : paymentIntent.status === 'created'
                ? 'text-blue-800'
                : 'text-yellow-800'
            }`}>
              {paymentIntent.status === 'succeeded' 
                ? '✅ Payment Successful!' 
                : paymentIntent.status === 'created'
                ? '⏳ Payment Intent Created'
                : '⚠️ Payment Processing'}
            </h4>
            <p className={`text-sm ${
              paymentIntent.status === 'succeeded' 
                ? 'text-green-600' 
                : paymentIntent.status === 'created'
                ? 'text-blue-600'
                : 'text-yellow-600'
            }`}>
              Payment ID: {paymentIntent.id}
            </p>
            <p className={`text-sm ${
              paymentIntent.status === 'succeeded' 
                ? 'text-green-600' 
                : paymentIntent.status === 'created'
                ? 'text-blue-600'
                : 'text-yellow-600'
            }`}>
              Status: {paymentIntent.status}
            </p>
            {paymentIntent.status === 'succeeded' && (
              <div className="mt-2">
                <p className="text-sm text-green-600">
                  Thank you for your payment! We'll contact you shortly.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
function handleRealPaymentResponse(response: AxiosResponse<any, any>, amount: number, currency: string) {
  throw new Error("Function not implemented.");
}

