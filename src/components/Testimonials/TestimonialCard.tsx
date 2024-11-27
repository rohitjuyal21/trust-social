import { Testimonial } from "@/types/types";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import ImageViewer from "../ImageViewer";
import { format } from "date-fns";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-accent/30 p-4 break-inside-avoid lg:mb-6 mb-4 rounded-xl">
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <ImageViewer
            imageUrl={
              testimonial.authorPhoto ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${testimonial.authorName}&chars=1`
            }
          >
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <Image
                src={
                  testimonial.authorPhoto ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${testimonial.authorName}&chars=1`
                }
                alt={testimonial.authorName}
                width={0}
                height={0}
                className="object-cover w-full h-full"
              />
            </div>
          </ImageViewer>
          <div>
            <h4 className="font-bold">{testimonial.authorName}</h4>
          </div>
        </div>
        <div>
          <p className="">{testimonial.testimonial}</p>
        </div>

        {testimonial.attachments.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {testimonial.attachments.map((attachment, index) => (
              <ImageViewer key={index} imageUrl={attachment}>
                <div key={index} className="rounded-lg border overflow-hidden">
                  <Image
                    src={attachment}
                    alt={`attachment ${index}`}
                    width={0}
                    height={0}
                    className="w-28 h-28 object-contain"
                  />
                </div>
              </ImageViewer>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="text-muted-foreground text-sm font-medium">
            {format(new Date(testimonial.createdAt), "dd MMM yyyy")}
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                <Star
                  className="size-4"
                  fill={`${testimonial.rating >= star ? "#FFD700" : "none"}`}
                  strokeWidth={1}
                  stroke="#FFD700"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
