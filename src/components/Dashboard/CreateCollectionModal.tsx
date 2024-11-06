import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import LivePreview from "./LivePreview";
import EditPreview from "./EditPreview";

interface CreateCollectionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateCollectionModal({
  isOpen,
  setIsOpen,
}: CreateCollectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen-xl rounded-lg w-[95%]">
        <VisuallyHidden.Root>
          <DialogTitle>Create Collection</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Description goes here</DialogDescription>
        </VisuallyHidden.Root>
        <div className="py-4 flex md:flex-row flex-col gap-8">
          <LivePreview />
          <EditPreview />
        </div>
      </DialogContent>
    </Dialog>
  );
}
