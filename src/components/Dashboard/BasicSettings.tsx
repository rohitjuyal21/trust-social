import { collectionSchema } from "@/lib/zod";
import React, { useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, PlusCircle, Trash2, X } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SketchPicker } from "react-color";
import { UseFormReturn } from "react-hook-form";

interface BasicSettingsProps {
  form: UseFormReturn<z.infer<typeof collectionSchema>>;
}

export default function BasicSettings({ form }: BasicSettingsProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleUploadLogo = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setLogoPreview(base64 as string);
      // Update the form field with the base64 string
      form.setValue("collectionLogo", base64 as string);
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

  const handleClearLogo = () => {
    setLogoPreview(null);
    form.setValue("collectionLogo", "");
  };

  const handleAddQuestion = () => {
    const newQuestion = "";
    form.setValue("questions", [...form.getValues("questions"), newQuestion]);
  };

  const handleQuestionChange = (id: number, value: string) => {
    const updatedQuestions = form
      .getValues("questions")
      .map((question, index) => (id === index ? value : question));

    form.setValue("questions", updatedQuestions);
  };

  const handleRemoveQuestion = (id: number) => {
    const updatedQuestions = form
      .getValues("questions")
      .filter((_, index) => id !== index);
    form.setValue("questions", updatedQuestions);
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-1">
        <h4 className="text-2xl font-bold text-center">
          Create a new Collection
        </h4>
        <p className="text-muted-foreground text-center">
          Completing the collection sets up a testimonial page.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Collection Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Collection Name" {...field} />
              </FormControl>
              <FormDescription>
                Public URL is: localhost:3000/
                {field.value || "your-collection"}
                {/* change this in production */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionLogo"
          render={() => (
            <FormItem>
              <FormLabel>
                Collection Logo <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full relative overflow-hidden border">
                    {logoPreview ? (
                      <Image src={logoPreview} alt="Collection Logo" fill />
                    ) : (
                      <div className="w-16 h-16 bg-accent"></div>
                    )}
                  </div>
                  <Button
                    onClick={handleUploadLogo}
                    variant="outline"
                    size="sm"
                    type="button"
                  >
                    Upload
                  </Button>
                  {logoPreview && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-5 h-5 rounded-full"
                      type="button"
                      onClick={handleClearLogo}
                    >
                      <X className="size-3" />
                    </Button>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Collection Name"
                    className="sr-only"
                    ref={logoInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headerTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Header Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Header Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your custom message <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a custom message for your customers"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Questions <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((question, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={question}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        placeholder="Add a short question"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="flex-shrink-0"
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {form.watch("questions").length < 5 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={handleAddQuestion}
                    >
                      Add question (upto 5) <PlusCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectStarRatings"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center space-y-0">
              <FormLabel>Collect star ratings</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customButtonColor"
          render={({ field }) => (
            <FormItem className="flex flex-col max-w-52">
              <FormLabel>Custom button color</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} placeholder="Pick a color" />
                  <Popover>
                    <PopoverTrigger>
                      <div className="w-10 h-10 border rounded-md shrink-0 relative overflow-hidden">
                        <Image
                          src="/assets/checkerboard.png"
                          alt="checkerboard"
                          className="absolute inset-0"
                          fill
                        />
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: field.value }}
                        ></div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-0 w-fit">
                      <SketchPicker
                        color={field.value}
                        onChange={(color) => field.onChange(color.hex)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">
          Create new Collection <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
