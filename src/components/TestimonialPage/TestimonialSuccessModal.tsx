import React, { useState } from "react";
import SuccessModal from "../SuccessModal";

interface TestimonialSuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TestimonialSuccessModal({
  isOpen,
  setIsOpen,
}: TestimonialSuccessModalProps) {
  return (
    <SuccessModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h2 className="text-lg font-bold text-center mb-1">
          You're Awesome! 🎉
        </h2>
        <p className="text-center text-sm leading-tight text-muted-foreground">
          Thanks for taking the time to share your thoughts! We truly value your
          feedback. 😊
        </p>
      </div>
    </SuccessModal>
  );
}
