import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ICollection } from "@/types/types";
import Image from "next/image";
import StarRating from "./StarRating";
import { z } from "zod";
import { testimonialSchema } from "@/lib/zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [rating, setRating] = useState(0);

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl rounded-lg">
        <VisuallyHidden.Root>
          <DialogTitle>Create Collection</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description goes here</DialogDescription>
        </VisuallyHidden.Root>

        <Form {...form}>
          <form className="flex flex-col gap-4">
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
            <StarRating rating={rating} setRating={setRating} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
