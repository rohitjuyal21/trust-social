import React from "react";
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

interface ImportTweetModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImportTweetModal({
  isOpen,
  setIsOpen,
}: ImportTweetModalProps) {
  const form = useForm<z.infer<typeof tweetSchema>>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      tweet: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof tweetSchema>) => {
    console.log(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <LoadingButton isLoading={false}>Import Tweet</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
