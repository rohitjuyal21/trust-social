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
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CollectionSuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collectionDetails: {
    collectionName: string;
    collectionId: string;
  };
}

export default function CollectionSuccessModal({
  isOpen,
  setIsOpen,
  collectionDetails,
}: CollectionSuccessModalProps) {
  const collectionUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${collectionDetails.collectionId}`;

  const handleCopyLink = () => {
    copy(collectionUrl);
    toast.success("Link copied to clipboard");
  };

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
          <h2 className="text-xl font-semibold text-center">
            Added {collectionDetails.collectionName} successfully!
          </h2>

          <div>
            <p className="text-sm text-muted-foreground text-center">
              Here is the link for your customers:
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p
                    title=""
                    className="text-sm text-primary text-center cursor-pointer"
                    onClick={handleCopyLink}
                  >
                    {collectionUrl}
                  </p>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Copy Link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
