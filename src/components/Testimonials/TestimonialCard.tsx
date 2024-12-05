import { Testimonial } from "@/types/types";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import ImageViewer from "../ImageViewer";
import { format } from "date-fns";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface TestimonialCardProps {
  testimonial: Testimonial;
  theme?: "light" | "dark";
}

export default function TestimonialCard({
  testimonial,
  theme,
}: TestimonialCardProps) {
  return (
    <Card className="bg-testimonial border-testimonial-border hover:bg-testimonial-hover p-4 break-inside-avoid lg:mb-6 mb-4 rounded-xl flex-1">
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <ImageViewer
            theme={theme}
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className={testimonial.attachments.length > 1 ? "mx-5" : ""}
        >
          <CarouselContent className="">
            {testimonial.attachments.map((attachment, index) => (
              <CarouselItem key={index}>
                <ImageViewer theme={theme} imageUrl={attachment}>
                  <div className="max-h-48 h-full flex items-center w-full">
                    <Image
                      src={attachment}
                      alt={`attachment ${index}`}
                      width={0}
                      height={0}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </ImageViewer>
              </CarouselItem>
            ))}
          </CarouselContent>
          {testimonial.attachments.length > 1 && (
            <>
              <CarouselPrevious className="-left-7 h-6 w-6" />
              <CarouselNext className="-right-7 h-6 w-6" />
            </>
          )}
        </Carousel>

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
