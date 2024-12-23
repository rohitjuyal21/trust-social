import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";

interface CollectionSuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image?: string;
  children: React.ReactNode;
}

export default function SuccessModal({
  isOpen,
  setIsOpen,
  image,
  children,
}: CollectionSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent hidden className="max-w-sm rounded-lg">
        <VisuallyHidden.Root>
          <DialogTitle>Success Modal</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description</DialogDescription>
        </VisuallyHidden.Root>

        <div className="space-y-2 ">
          <div className="p-4">
            <div className="rounded-md overflow-hidden">
              <Image
                src={image || "/assets/excited-dwight.webp"}
                alt="collection-success"
                width={0}
                height={0}
                className="w-full max-h-56 object-cover object-top"
              />
            </div>
          </div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
