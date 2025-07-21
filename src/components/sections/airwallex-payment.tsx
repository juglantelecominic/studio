"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
];

export function AirwallexPaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      amount: "",
      currency: "USD",
      serviceType: "",
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

  async function onSubmit(values: PaymentFormData) {
    setIsProcessing(true);

    try {
      toast({
        title: "Processing Payment...",
        description: "Preparing your secure payment with Airwallex.",
      });

      // Simulate payment processing
      setTimeout(() => {
        toast({
          title: "Payment Successful! 🎉",
          description: `Payment of $${values.amount} ${values.currency} completed successfully.`,
        });
        
        // Reset form
        form.reset();
        setIsProcessing(false);
      }, 2500);

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Airwallex Payment System</CardTitle>
        <CardDescription>
          Secure payment processing with Airwallex
        </CardDescription>
      </CardHeader>
      <CardContent>
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

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                🔒 <strong>Secure Payment:</strong> This demo simulates Airwallex payment processing. In production, you would be redirected to Airwallex's secure payment page.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90" 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay $${form.watch("amount")} ${form.watch("currency")} (Demo)`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
