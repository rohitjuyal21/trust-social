import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import copy from "copy-to-clipboard";

interface CollectionSuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CollectionSuccessModal({
  isOpen,
  setIsOpen,
}: CollectionSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent hidden className="max-w-sm rounded-lg p-6">
        <VisuallyHidden.Root>
          <DialogTitle>Collection added successfully!</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description goes here</DialogDescription>
        </VisuallyHidden.Root>

        <div className="space-y-4 py-4">
          <div className="rounded-md overflow-hidden">
            <Image
              src={"/assets/excited-dwight.webp"}
              alt="collection-success"
              width={0}
              height={0}
              className="w-full max-h-56 object-cover object-top"
            />
          </div>
          <h2 className="text-xl font-semibold text-center">
            Added Collection successfully!
          </h2>

          <div>
            <p className="text-sm text-muted-foreground text-center">
              Here is the link for your customers:
            </p>
            <p className="text-sm text-primary text-center cursor-pointer">
              https://testimonial.com/collection/12345
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
