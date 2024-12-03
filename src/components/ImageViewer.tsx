import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";

interface ImageViewerProps {
  imageUrl: string;
  theme?: "dark" | "light";
  children: React.ReactNode;
}

export default function ImageViewer({
  imageUrl,
  theme,
  children,
}: ImageViewerProps) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-screen-lg rounded-lg h-[90vh] theme-${theme}`}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Image Viewer</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Full Image</DialogDescription>
        </VisuallyHidden.Root>
        <div className="relative flex items-center justify-center m-4">
          <Image
            src={imageUrl}
            alt="Full Image"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
