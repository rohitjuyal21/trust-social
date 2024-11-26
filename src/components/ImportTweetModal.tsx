import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tweetSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { toast } from "sonner";
import { ICollection, ITwitterEmbed } from "@/types/types";

interface ImportTweetModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchEmbedTweet: (tweetUrl: string) => Promise<ITwitterEmbed | null>;
  collection: ICollection | null;
  refetchData: () => void;
}

export default function ImportTweetModal({
  isOpen,
  setIsOpen,
  fetchEmbedTweet,
  collection,
  refetchData,
}: ImportTweetModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof tweetSchema>>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      tweet: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof tweetSchema>) => {
    setIsLoading(true);
    try {
      // Fetch the embed code for the tweet
      const embedTweet = await fetchEmbedTweet(value.tweet);

      if (!embedTweet) {
        return; // Exit if fetching embed fails
      }

      // After successfully fetching the embed code, store the tweet in the database
      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isTweet: true,
          tweetUrl: embedTweet.url,
          tweetEmbedCode: embedTweet?.html,
          collectionId: collection?._id,
          testimonial: "A testimonial from twitter",
          authorName: embedTweet.author_name,
        }),
      });

      if (response.ok) {
        toast.success("Tweet imported successfully");
        handleModalClose();
        refetchData();
      } else {
        toast.error("Failed to import tweet");
      }
    } catch (error) {
      console.log("Error importing tweet", error);
      toast.error("Failed to import tweet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="rounded-lg">
        <VisuallyHidden.Root>
          <DialogTitle>Import Tweet</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="text-xl font-bold mb-10">Import a tweet</h2>
            <div className="space-y-4">
              <FormField
                name="tweet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tweet Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Paste tweet link here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton isLoading={isLoading}>Import Tweet</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
