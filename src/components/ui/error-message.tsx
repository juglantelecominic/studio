"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ title = "Error", message, onDismiss }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <XCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
