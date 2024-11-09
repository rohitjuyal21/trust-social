import { collectionSchema } from "@/lib/zod";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface ThankYouPageProps {
  form: UseFormReturn<z.infer<typeof collectionSchema>>;
}

export default function ThankYouPage({ form }: ThankYouPageProps) {
  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-1">
        <h4 className="text-2xl font-bold text-center">
          Customize thank you page
        </h4>
        <p className="text-muted-foreground text-center">
          Create a heartfelt message to show your gratitude
        </p>
      </div>
    </div>
  );
}
