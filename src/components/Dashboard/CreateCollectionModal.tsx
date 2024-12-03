"use client";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { convertToKebabCase } from "@/lib/stringUtils";
import { ICollection } from "@/types/types";

interface CreateCollectionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: (collectionName: string, collectionId: string) => void;
  fetchCollections: () => Promise<void>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: ICollection | null;
  setDefaultValues: React.Dispatch<React.SetStateAction<ICollection | null>>;
}

const thankYouPageDefaults = {
  thankYouPageTitle: "Thank You! 🎉",
  thankYouPageMessage:
    "Your testimonial brightens our day! Thanks for being an amazing part of our journey!",
  thankYouPageImage: "/assets/thankyou.jpg",
};

export default function CreateCollectionModal({
  isOpen,
  setIsOpen,
  onSuccess,
  fetchCollections,
  isEditing,
  setIsEditing,
  defaultValues,
  setDefaultValues,
}: CreateCollectionModalProps) {
  const [activeTab, setActiveTab] = useState("basic-settings");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      collectionName: "",
      collectionLogo: "",
      headerTitle: "",
      customMessage: "",
      questions: collectionQuestions,
      customButtonColor: "",
      thankYouPage: thankYouPageDefaults,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...defaultValues });
    } else {
      form.reset({
        collectionName: "",
        collectionLogo: "",
        headerTitle: "",
        customMessage: "",
        questions: collectionQuestions,
        customButtonColor: "",
        thankYouPage: thankYouPageDefaults,
      });
    }
  }, [defaultValues, form]);

  const onSubmit = async (values: z.infer<typeof collectionSchema>) => {
    setIsLoading(true);
    const finalValues = {
      ...values,
      thankYouPage: {
        thankYouPageTitle:
          values.thankYouPage.thankYouPageTitle ||
          thankYouPageDefaults.thankYouPageTitle,
        thankYouPageMessage:
          values.thankYouPage.thankYouPageMessage ||
          thankYouPageDefaults.thankYouPageMessage,
        thankYouPageImage:
          values.thankYouPage.thankYouPageImage ||
          thankYouPageDefaults.thankYouPageImage,
      },
    };

    const collectionId = convertToKebabCase(values.collectionName);
    if (isEditing) {
      try {
        const response = await fetch(`api/collection/${defaultValues?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...finalValues,
            collectionId,
          }),
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          toast.success("Collection updated successfully");
          handelDialogClose();
          onSuccess(values.collectionName, collectionId);
          fetchCollections();
        } else {
          toast.error(data.message);
          throw new Error("Failed to update collection");
        }
      } catch (error) {
        console.error("Error while creating collection:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch("api/collection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...finalValues,
            collectionId,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Collection created successfully");
          handelDialogClose();
          onSuccess(values.collectionName, collectionId);
          fetchCollections();
        } else {
          toast.error(data.message);
          throw new Error("Failed to create collection");
        }
      } catch (error) {
        console.error("Error while creating collection:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handelDialogClose = () => {
    setIsOpen(false);
    setIsEditing(false);
    setActiveTab("basic-settings");
    setDefaultValues(null);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handelDialogClose}>
      <DialogContent className="max-w-screen-lg rounded-lg">
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
                <BasicSettings
                  form={form}
                  isLoading={isLoading}
                  isEditing={isEditing}
                />
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
