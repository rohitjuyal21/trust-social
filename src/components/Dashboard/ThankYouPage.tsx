import { collectionSchema } from "@/lib/zod";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";

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
      <div className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="thankYouPage.thankYouPageImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl></FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
