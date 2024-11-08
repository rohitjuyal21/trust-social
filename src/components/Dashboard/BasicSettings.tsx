import { collectionSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
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
import { PlusCircle, Trash2, X } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { collectionQuestions } from "@/config/collection-questions";
import { Switch } from "../ui/switch";

export default function BasicSettings() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [questions, setquestions] = useState(collectionQuestions);

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(
      collectionSchema.pick({
        collectionName: true,
        collectionLogo: true,
        headerTitle: true,
        customMessage: true,
        questions: true,
        collectStarRatings: true,
        customButtonColor: true,
      })
    ),
  });
  console.log(form.formState.errors);

  const onSubmit = (values: z.infer<typeof collectionSchema>) => {
    console.log(values);
  };

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
    const newQuestion = {
      id: new Date().toISOString(),
      question: "",
    };
    setquestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index: string, value: string) => {
    const updatedQuestions = questions.map((question) =>
      question.id === index ? { ...question, question: value } : question
    );

    setquestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index: string) => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== index
    );
    setquestions(updatedQuestions);
  };

  console.log(questions);

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  Public URL is: localhost:3000/rohit-juyal
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
            render={() => (
              <FormItem>
                <FormLabel>
                  Questions <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {questions.map((question) => (
                      <div
                        key={question.id}
                        className="flex gap-2 items-center"
                      >
                        <Input
                          value={question.question}
                          onChange={(e) =>
                            handleQuestionChange(question.id, e.target.value)
                          }
                          placeholder="Add a short question"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="flex-shrink-0"
                          onClick={() => handleRemoveQuestion(question.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {questions.length < 5 && (
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
              <FormItem className="flex gap-2 items-center space-y-0">
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
        </form>
      </Form>
    </div>
  );
}
