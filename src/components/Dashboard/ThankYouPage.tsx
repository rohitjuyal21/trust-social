import { collectionSchema } from "@/lib/zod";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ImageUpload from "./ImageUpload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ThankYouPageProps {
  form: UseFormReturn<z.infer<typeof collectionSchema>>;
}

export default function ThankYouPage({ form }: ThankYouPageProps) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      form.setValue("thankYouPage.thankYouPageImage", base64 as string);
    }
  };

  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleClearImage = () => {
    form.setValue("thankYouPage.thankYouPageImage", "");
  };

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
              <FormControl>
                <ImageUpload
                  image={field.value}
                  onChange={handleFileChange}
                  onClear={handleClearImage}
                  className="w-fit rounded-md h-16"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thankYouPage.thankYouPageTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thank you title</FormLabel>
              <FormControl>
                <Input placeholder="Thank you title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thankYouPage.thankYouPageMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thank you message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your testimonial brightens our day! Thanks for being an amazing part of our journey!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
