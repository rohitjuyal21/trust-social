import React from "react";

import Logo from "../svg/Logo";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import PreviewBadge from "./PreviewBadge";
import Image from "next/image";

interface LivePreviewProps {
  logo: string | undefined;
  header: string;
  customMessage: string;
  questions: string[];
  customButtonColor: string | undefined;
}

export default function TestimonialPagePreview({
  logo,
  header,
  customMessage,
  questions,
  customButtonColor,
}: LivePreviewProps) {
  return (
    <div className="px-6 py-10 rounded-lg border relative w-full bg-accent/30">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <PreviewBadge text="Testimonial page - Live preview" />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        {logo ? (
          <div className="relative h-20 w-20 rounded-full overflow-hidden">
            <Image src={logo} alt="logo" fill className="rounded-full" />
          </div>
        ) : (
          <Logo className="h-20 w-20" />
        )}

        <h1 className="text-3xl font-bold text-center">
          {header ? header : "Header goes here..."}
        </h1>
        <p className="text-center text-muted-foreground">
          {customMessage ? customMessage : " Your custom message goes here..."}
        </p>
        <div className="flex flex-col items-start justify-center gap-2 w-full my-4">
          <h4 className="text-lg font-semibold">Questions</h4>
          <ul className="list-disc pl-4 space-y-1">
            {questions.map((question, index) => (
              <li key={index} className="text-muted-foreground">
                {question}
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="button"
          className="w-full"
          style={{ backgroundColor: customButtonColor }}
        >
          Send <Pencil className="size-4" />
        </Button>
      </div>
    </div>
  );
}
