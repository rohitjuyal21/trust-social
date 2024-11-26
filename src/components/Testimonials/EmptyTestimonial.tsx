import { Inbox } from "lucide-react";
import React from "react";

export default function EmptyTestimonial() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Inbox className="text-muted-foreground h-16 w-16" strokeWidth={1} />
      <h5 className="text-muted-foreground font-bold text-center text-lg">
        No Testimonials yet
      </h5>
    </div>
  );
}
