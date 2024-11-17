import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ICollection } from "@/types/types";
import Image from "next/image";
import StarRating from "./StarRating";
import { z } from "zod";
import { testimonialSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";

interface WriteTestimonialModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collection: ICollection | null;
}

type Testimonial = z.infer<typeof testimonialSchema>;

export default function WriteTestimonialModal({
  isOpen,
  setIsOpen,
  collection,
}: WriteTestimonialModalProps) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Testimonial>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      testimonial: "",
      rating: 0,
      attachments: [],
      authorName: "",
      authorEmail: "",
      authorPhoto: "",
    },
  });

  const onSubmit = async (value: Testimonial) => {
    console.log(value);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleChooseFile = () => {
    if (attachmentInputRef.current) {
      attachmentInputRef.current.click();
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filePromises = Array.from(files).map((file) =>
        convertToBase64(file)
      );
      const base64Files = (await Promise.all(filePromises)) as string[];
      form.setValue("attachments", [
        ...(form.getValues("attachments") || []),
        ...base64Files,
      ]);
      form.trigger("attachments");
    }
  };

  console.log(form.watch("attachments"));

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

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-xl rounded-lg">
        <VisuallyHidden.Root>
          <DialogTitle>Create Collection</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description goes here</DialogDescription>
        </VisuallyHidden.Root>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-4 flex flex-col items-center">
              <p className="text-xl font-bold ">Write Testimonial to</p>
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={collection?.collectionLogo || ""}
                  alt={collection?.collectionName || ""}
                  width={0}
                  height={0}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-2 w-fulll">
              <h4 className="font-bold">Questions</h4>
              <ul className="list-disc pl-3 space-y-1">
                {collection?.questions.map((question, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground text-sm font-medium"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            <FormField
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How satisfied were you?</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      setRating={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="testimonial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What did you accomplish with our product?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Image(s) </FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={handleChooseFile}
                          type="button"
                          variant="outline"
                        >
                          Choose File
                        </Button>

                        {attachments && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          ref={attachmentInputRef}
                          placeholder="Collection Name"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {form.watch("attachments")?.map((attachment, index) => (
                          <div key={index}>
                            <Image
                              src={attachment}
                              alt={`attachment ${index}`}
                              width={0}
                              height={0}
                              className="w-16 h-16 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-4 sm:space-x-0">
              <Button
                onClick={handleModalClose}
                type="button"
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button className="flex-1">Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
