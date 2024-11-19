import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SuccessModal from "../SuccessModal";

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
    <SuccessModal isOpen={isOpen} setIsOpen={setIsOpen}>
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
    </SuccessModal>
  );
}
