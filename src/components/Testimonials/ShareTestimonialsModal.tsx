import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Grid from "../svg/Grid";
import Carousel from "../svg/Carousel";
import Link from "next/link";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

interface ShareTestimonialsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEmbedSelect: (embedType: "grid" | "carousel") => void;
  collectionId: string;
}

export default function ShareTestimonialsModal({
  isOpen,
  setIsOpen,
  handleEmbedSelect,
  collectionId,
}: ShareTestimonialsModalProps) {
  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${collectionId}`;

  const handleCopy = async () => {
    copy(shareLink);
    toast.success("Link copied to clipboard!");
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-lg max-w-screen-md">
        <VisuallyHidden.Root>
          <DialogTitle>Import Tweet</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>
        <div className="space-y-6">
          <div className="mt-2 px-4 flex justify-between">
            <Link
              href={shareLink}
              target="_blank"
              className="flex gap-1 items-center text-muted-foreground hover:text-foreground group"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium underline underline-offset-2 group-hover:no-underline">
                {shareLink}
              </span>
            </Link>
            <Button onClick={handleCopy}>
              <Copy className="size-4" /> Copy Link
            </Button>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-center">
                Embed a Wall of Love
              </h1>
              <p className="text-muted-foreground text-center">
                Select the type of embed would you like to add to your site
              </p>
            </div>
            <div className="flex justify-center gap-8">
              <div
                onClick={() => handleEmbedSelect("grid")}
                className="rounded-md border bg-accent/30 p-4 cursor-pointer hover:border-foreground/30"
              >
                <div className="h-24">
                  <Grid />
                </div>
                <p className="text-sm font-semibold pt-2 text-center text-muted-foreground">
                  Grid
                </p>
              </div>
              <div
                onClick={() => handleEmbedSelect("carousel")}
                className="rounded-md border bg-accent/30 p-4 cursor-pointer hover:border-foreground/30"
              >
                <div className="h-24 flex items-center justify-center">
                  <Carousel />
                </div>
                <p className="text-sm font-semibold pt-2 text-center text-muted-foreground">
                  Carousel
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
