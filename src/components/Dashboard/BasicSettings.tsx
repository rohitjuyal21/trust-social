import { collectionSchema } from "@/lib/zod";
import React from "react";
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
import { Edit, Plus, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SketchPicker } from "react-color";
import { UseFormReturn } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import LoadingButton from "../LoadingButton";
import { convertToKebabCase } from "@/lib/stringUtils";
import { convertToBase64 } from "@/lib/convertToBase64";

interface BasicSettingsProps {
  form: UseFormReturn<z.infer<typeof collectionSchema>>;
  isLoading: boolean;
  isEditing: boolean;
}

export default function BasicSettings({
  form,
  isLoading,
  isEditing,
}: BasicSettingsProps) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      form.setValue("collectionLogo", base64 as string);
      form.trigger("collectionLogo");
    }
  };

  const handleClearLogo = () => {
    form.setValue("collectionLogo", "");
  };

  const handleAddQuestion = () => {
    const newQuestion = "";
    form.setValue("questions", [...form.getValues("questions"), newQuestion]);
    form.trigger("questions");
  };

  const handleQuestionChange = (id: number, value: string) => {
    const updatedQuestions = form
      .getValues("questions")
      .map((question, index) => (id === index ? value : question));

    form.setValue("questions", updatedQuestions);
    form.trigger("questions");
  };

  const handleRemoveQuestion = (id: number) => {
    const updatedQuestions = form
      .getValues("questions")
      .filter((_, index) => id !== index);
    form.setValue("questions", updatedQuestions);
    form.trigger("questions");
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-1">
        {!isEditing ? (
          <>
            <h4 className="text-2xl font-bold text-center">
              Create a new Collection
            </h4>
            <p className="text-muted-foreground text-center">
              Completing the collection sets up a testimonial page.
            </p>
          </>
        ) : (
          <h4 className="text-2xl font-bold text-center">Edit Collection</h4>
        )}
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
                Public URL is: {process.env.NEXT_PUBLIC_BASE_URL}/
                {convertToKebabCase(field.value) || "your-collection"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Collection Logo <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  image={field.value}
                  onChange={handleFileChange}
                  onClear={handleClearLogo}
                />
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
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2 items-center">
                        <Input
                          value={question}
                          onChange={(e) =>
                            handleQuestionChange(index, e.target.value)
                          }
                          placeholder="Add a short question"
                        />
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="flex-shrink-0 rounded-full"
                          onClick={() => handleRemoveQuestion(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {form.formState.errors.questions?.[index]?.message && (
                        <p className="text-destructive text-sm">
                          {form.formState.errors.questions[index].message}
                        </p>
                      )}
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
              {form.formState.errors.questions?.ref?.name === "questions" && (
                <FormMessage />
              )}
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
        <LoadingButton isLoading={isLoading}>
          {isEditing ? (
            <>
              Update Collection <Edit className="size-4" />
            </>
          ) : (
            <>
              Create new Collection <Plus className="size-4" />
            </>
          )}
        </LoadingButton>
      </div>
    </div>
  );
}
