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

interface ShareTestimonialsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEmbedSelect: (embedType: "grid" | "carousel") => void;
}

export default function ShareTestimonialsModal({
  isOpen,
  setIsOpen,
  handleEmbedSelect,
}: ShareTestimonialsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-lg max-w-screen-md">
        <VisuallyHidden.Root>
          <DialogTitle>Import Tweet</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>
        <div className="my-4 space-y-6">
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
      </DialogContent>
    </Dialog>
  );
}
