"use client";

import TestimonialCard from "@/components/Testimonials/TestimonialCard";
import TweetTestimonialCard from "@/components/Testimonials/TweetTestimonialCard";
import { Testimonial } from "@/types/types";
import { useEffect, useState } from "react";

import Link from "next/link";
import Logo from "@/components/svg/Logo";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import "../../../../styles/embed.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "iframe-resizer/js/iframeResizer.contentWindow";
import "iframe-resizer/js/iframeResizer.contentWindow";

export default function CarouselWidgetPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const searchParams = useSearchParams();
  const parmasTheme = (searchParams.get("theme") || "light") as
    | "light"
    | "dark";
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
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: "setHeight", height }, "*");
    };

    sendHeight();

    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [collectionId]);

  const filteredTestimonials = testimonials.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      className="absolute group-hover:visible invisible right-2 top-1/2 -translate-y-1/2 rounded-full h-7 w-7 z-10 text-white bg-gray-400 hover:bg-gray-500"
    >
      <ChevronRight size={20} />
    </Button>
  );

  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      className="absolute group-hover:visible invisible left-2 top-1/2 -translate-y-1/2 rounded-full h-7 w-7 z-10 text-white bg-gray-400 hover:bg-gray-500"
    >
      <ChevronLeft size={20} />
    </Button>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    Largedesktop: {
      breakpoint: { max: 3000, min: 1536 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={`relative px-9 group w-full theme-${parmasTheme}`}>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        showDots={false}
        itemClass="px-2"
        containerClass="py-4 w-full !static"
      >
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial._id} className="w-full">
            {testimonial.isTweet ? (
              <TweetTestimonialCard
                tweetId={testimonial.tweetId}
                paramsTheme={parmasTheme}
              />
            ) : (
              <TestimonialCard testimonial={testimonial} theme={parmasTheme} />
            )}
          </div>
        ))}
      </Carousel>

      <div className="flex justify-center mt-4">
        <Link
          href="http://localhost:3000"
          target="_blank"
          className="font-oswald text-xl font-semibold flex items-center gap-0.5"
          title="Trust Social"
        >
          <Logo className="h-7 w-7" color="black" />
          <h4>TrustSocial</h4>
        </Link>
      </div>
    </div>
  );
}
