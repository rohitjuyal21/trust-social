import React, { useState } from "react";
import SuccessModal from "../SuccessModal";

interface TestimonialSuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  thankYouPage:
    | {
        thankYouPageTitle: string;
        thankYouPageImage: string;
        thankYouPageMessage: string;
      }
    | undefined;
}

export default function TestimonialSuccessModal({
  isOpen,
  setIsOpen,
  thankYouPage,
}: TestimonialSuccessModalProps) {
  return (
    <SuccessModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      image={thankYouPage?.thankYouPageImage}
    >
      <div>
        <h2 className="text-lg font-bold text-center mb-1">
          {thankYouPage?.thankYouPageTitle}
        </h2>
        <p className="text-center text-sm leading-tight text-muted-foreground">
          {thankYouPage?.thankYouPageMessage}
        </p>
      </div>
    </SuccessModal>
  );
}
