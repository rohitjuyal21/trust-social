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
  children: React.ReactNode;
}

export default function SuccessModal({
  isOpen,
  setIsOpen,
  children,
}: CollectionSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent hidden className="max-w-sm rounded-lg">
        <VisuallyHidden.Root>
          <DialogTitle>Collection added successfully!</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description goes here</DialogDescription>
        </VisuallyHidden.Root>

        <div className="space-y-2 p-4">
          <div className="rounded-md overflow-hidden">
            <Image
              src={"/assets/excited-dwight.webp"}
              alt="collection-success"
              width={0}
              height={0}
              className="w-full max-h-56 object-cover object-top"
            />
          </div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
