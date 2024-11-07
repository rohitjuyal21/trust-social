import React from "react";
import { Badge } from "../ui/badge";
import CustomPing from "../CustomPing";

import Logo from "../svg/Logo";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export default function LivePreview() {
  const questions = ["Question 1", "Question 2", "Question 3"];
  return (
    <div className="px-6 py-10 rounded-lg border relative md:w-[45%] bg-accent/30">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-nowrap">
        <Badge variant="outline" className="bg-background">
          <span className="mr-1.5">
            <CustomPing />
          </span>
          Testimonial page - Live preview
        </Badge>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <Logo className="h-20 w-20" />
        <h1 className="text-3xl font-bold text-center">Header goes here...</h1>
        <p className="text-center text-muted-foreground">
          Your custom message goes here...
        </p>
        <div className="flex flex-col items-start justify-center gap-2 w-full my-4">
          <h4 className="text-lg font-semibold">Questions</h4>
          <ul className="list-disc pl-5 space-y-1">
            {questions.map((question, index) => (
              <li key={index} className="text-muted-foreground">
                {question}
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full">
          Send <Pencil className="size-4" />
        </Button>
      </div>
    </div>
  );
}
