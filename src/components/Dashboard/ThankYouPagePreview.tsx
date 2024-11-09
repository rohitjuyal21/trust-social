import React from "react";
import PreviewBadge from "./PreviewBadge";
import Image from "next/image";

interface ThankYouPagePreviewProps {
  thankyouPage: {
    thankYouPageTitle: string;
    thankYouPageMessage: string;
    thankYouPageImage: string;
  };
}

export default function ThankYouPagePreview({
  thankyouPage,
}: ThankYouPagePreviewProps) {
  const { thankYouPageTitle, thankYouPageMessage, thankYouPageImage } =
    thankyouPage;
  return (
    <div className="px-6 py-10 rounded-lg border relative w-full bg-accent/30">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <PreviewBadge text="Thank you page - Live preview" />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative w-full aspect-video border rounded-md overflow-hidden">
          {thankYouPageImage ? (
            <Image src={thankYouPageImage} alt="thankyou" fill />
          ) : (
            <Image src="/assets/thankyou.jpg" alt="thankyou" fill />
          )}
        </div>
        <h1 className="text-3xl font-bold text-center">
          {thankYouPageTitle ? thankYouPageTitle : "Thank you!"}
        </h1>
        <p className="text-center text-muted-foreground">
          {thankYouPageMessage
            ? thankYouPageMessage
            : " Your custom message goes here..."}
        </p>
      </div>
    </div>
  );
}
