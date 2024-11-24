import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ICollection } from "@/types/types";
import Image from "next/image";
import StarRating from "./TestimonialPage/StarRating";
import { z } from "zod";
import { testimonialSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import ImageUpload from "./Dashboard/ImageUpload";
import { convertToBase64 } from "@/lib/convertToBase64";
import AttachmentsField from "./AttachmentsField";
import LoadingButton from "./LoadingButton";
import { toast } from "sonner";

interface WriteTestimonialModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collection: ICollection | null;
  setIsSuccessModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData?: () => void;
}

type Testimonial = z.infer<typeof testimonialSchema>;

export default function WriteTestimonialModal({
  isOpen,
  setIsOpen,
  collection,
  setIsSuccessModalOpen,
  refetchData,
}: WriteTestimonialModalProps) {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...value,
          collectionId: collection?._id,
        }),
      });

      if (response.ok) {
        handleModalClose();
        toast.success("Testimonial submitted successfully");
        setIsSuccessModalOpen?.(true);
        refetchData?.();
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleAuthorPhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      form.setValue("authorPhoto", base64 as string);
      form.trigger("authorPhoto");
    }
  };

  const handleRemoveAuthorPhoto = () => {
    form.setValue("authorPhoto", "");
    form.trigger("authorPhoto");
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
            <div className="gap-4 flex flex-col items-center">
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
                  <FormLabel>
                    How satisfied were you?{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
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
                    What did you accomplish with our product?{" "}
                    <span className="text-destructive">*</span>
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
              render={() => (
                <FormItem>
                  <FormLabel>Attach Image(s) </FormLabel>
                  <FormControl>
                    <AttachmentsField
                      attachments={form.watch("attachments")}
                      setAttachments={(attachments: string[]) => {
                        form.setValue("attachments", attachments);
                        form.trigger("attachments");
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="authorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="authorPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload your photo </FormLabel>
                  <FormControl>
                    <ImageUpload
                      image={field.value}
                      onChange={handleAuthorPhotoChange}
                      onClear={handleRemoveAuthorPhoto}
                    />
                  </FormControl>
                  <FormMessage />
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
              <LoadingButton isLoading={isLoading} className="flex-1">
                Send
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
