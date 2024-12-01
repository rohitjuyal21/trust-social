"use client";

import TestimonialCard from "@/components/Testimonials/TestimonialCard";
import TweetTestimonialCard from "@/components/Testimonials/TweetTestimonialCard";
import { Testimonial } from "@/types/types";
import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Logo from "@/components/svg/Logo";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import "../../../../styles/embed.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselWidgetPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const searchParams = useSearchParams();
  const parmasTheme = searchParams.get("theme") || "light";
  const { setTheme } = useTheme();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCollectionId(resolvedParams.collectionId);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    setTheme(parmasTheme);
  }, [parmasTheme, setTheme]);

  const fetchTestimonials = async () => {
    if (!collectionId) return;
    try {
      const response = await fetch(
        `${baseUrl}/api/testimonial/${collectionId}`
      );
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data);
      }
    } catch (error) {
      console.log(`Error fetching testimonials: ${error}`);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [collectionId]);

  const filteredTestimonials = testimonials.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full z-10"
    >
      <ChevronRight size={20} />
    </Button>
  );

  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="absolute -left-0 top-1/2 -translate-y-1/2 rounded-full z-10"
    >
      <ChevronLeft size={20} />
    </Button>
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Number of items shown on desktop
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  return (
    <div className={`relative w-full theme-${parmasTheme}`}>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        showDots={false}
        itemClass="px-2"
        // partialVisible
      >
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial._id} className="w-full">
            {testimonial.isTweet ? (
              <TweetTestimonialCard
                tweetId={testimonial.tweetId}
                paramsTheme={parmasTheme}
              />
            ) : (
              <TestimonialCard testimonial={testimonial} />
            )}
          </div>
        ))}
      </Carousel>

      <div className="flex justify-center">
        <Link
          href="http://localhost:3000"
          target="_blank"
          className="font-oswald text-xl font-semibold flex items-center gap-0.5"
          title="Trust Social"
        >
          <Logo className="h-7 w-7" />
          <h4>TrustSocial</h4>
        </Link>
      </div>
    </div>
  );
}
