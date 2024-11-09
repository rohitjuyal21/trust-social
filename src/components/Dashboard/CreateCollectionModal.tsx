"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { useForm } from "react-hook-form";
import { collectionSchema } from "@/lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BasicSettings from "./BasicSettings";
import { collectionQuestions } from "@/config/collection-questions";
import TestimonialPagePreview from "./TestimonialPagePreview";
import ThankYouPagePreview from "./ThankYouPagePreview";
import ThankYouPage from "./ThankYouPage";

interface CreateCollectionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateCollectionModal({
  isOpen,
  setIsOpen,
}: CreateCollectionModalProps) {
  const [activeTab, setActiveTab] = useState("basic-settings");
  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      collectionName: "",
      collectionLogo: "",
      headerTitle: "",
      customMessage: "",
      questions: collectionQuestions,
      collectStarRatings: false,
      customButtonColor: "",
      thankYouPage: {
        thankYouPageTitle: "Thank You!",
        thankYouPageMessage:
          "Your testimonial brightens our day! Thanks for being an amazing part of our journey!",
        thankYouPageImage: "/assets/thankyou.jpg",
      },
    },
  });

  const onSubmit = (values: z.infer<typeof collectionSchema>) => {
    console.log(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen-lg rounded-lg ">
        <VisuallyHidden.Root>
          <DialogTitle>Create Collection</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description goes here</DialogDescription>
        </VisuallyHidden.Root>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="py-4 flex md:flex-row md:items-start flex-col gap-8"
          >
            <div className="md:w-[45%]">
              {activeTab === "basic-settings" ? (
                <TestimonialPagePreview
                  logo={form.watch("collectionLogo")}
                  header={form.watch("headerTitle")}
                  customMessage={form.watch("customMessage")}
                  questions={form.watch("questions")}
                  customButtonColor={form.watch("customButtonColor")}
                />
              ) : (
                <ThankYouPagePreview
                  thankyouPage={form.watch("thankYouPage")}
                />
              )}
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="md:w-[55%]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic-settings">Basic</TabsTrigger>
                <TabsTrigger value="thank-you">Thank you page</TabsTrigger>
              </TabsList>
              <TabsContent value="basic-settings">
                <BasicSettings form={form} />
              </TabsContent>
              <TabsContent value="thank-you">
                <ThankYouPage form={form} />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
