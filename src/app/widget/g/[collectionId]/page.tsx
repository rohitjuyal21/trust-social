"use client";

import TestimonialCard from "@/components/Testimonials/TestimonialCard";
import TweetTestimonialCard from "@/components/Testimonials/TweetTestimonialCard";
import { Testimonial } from "@/types/types";
import { useEffect, useState } from "react";

import Link from "next/link";
import Logo from "@/components/svg/Logo";
import { useSearchParams } from "next/navigation";
import "../../../../styles/embed.css";
import "iframe-resizer/js/iframeResizer.contentWindow";

export default function GridWidgetPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const searchParams = useSearchParams();

  // Get theme from URL
  const parmasTheme = searchParams.get("theme") || "light";

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setCollectionId(unwrappedParams.collectionId);
    }

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: "setHeight", height }, "*");
    };

    // Send the height on load
    sendHeight();

    // Observe changes in the DOM and send height updates
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const fetchTestimonials = async () => {
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

  return (
    <div className={`w-full bg-transparent p-4 theme-${parmasTheme}`}>
      {filteredTestimonials.length > 0 && (
        <div className="space-y-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 flex-1">
            {filteredTestimonials.map((testimonial) =>
              testimonial.isTweet ? (
                <TweetTestimonialCard
                  key={testimonial._id}
                  tweetId={testimonial.tweetId}
                  paramsTheme={parmasTheme}
                />
              ) : (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              )
            )}
          </div>
          <div className="flex justify-center">
            <Link
              href={process.env.NEXT_PUBLIC_BASE_URL!}
              target="_blank"
              className="font-oswald text-xl font-semibold flex items-center gap-0.5"
              title="Trust Social"
            >
              <Logo className="h-7 w-7" color="black" />
              <h4>TrustSocial</h4>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
