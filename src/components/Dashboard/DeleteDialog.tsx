import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import LoadingButton from "../LoadingButton";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collectionName: string;
  id: string;
  collectionId: string;
}

const deleteFormSchema = z.object({
  inputId: z.string().min(1, "Collection ID is required"),
});

export default function DeleteDialog({
  isOpen,
  setIsOpen,
  collectionName,
  id,
  collectionId,
}: DeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      inputId: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof deleteFormSchema>) => {
    if (value.inputId !== collectionId) {
      toast.error("Invalid collection ID");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("api/collection", {
        body: JSON.stringify({ id }),
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Collection deleted successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting collection");
      console.error("Error while deleting collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {collectionName}</AlertDialogTitle>
              <AlertDialogDescription>
                Deleting this collection will permanently remove all associated
                testimonials. Please confirm your decision carefully.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <FormField
              name="inputId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type your collection id{" "}
                    <span className="text-destructive">{collectionId}</span> to
                    confirm
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={collectionId}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <LoadingButton variant="destructive" isLoading={isLoading}>
                <Trash2 className="w-4 h-4" /> Delete
              </LoadingButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
