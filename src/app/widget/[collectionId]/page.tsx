"use client";
import EmptyTestimonial from "@/components/Testimonials/EmptyTestimonial";
import TestimonialCard from "@/components/Testimonials/TestimonialCard";
import TweetTestimonialCard from "@/components/Testimonials/TweetTestimonialCard";
import { Testimonial } from "@/types/types";
import { useEffect, useState } from "react";
import WidgetLayout from "./layout";

export default function WidgetPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setCollectionId(unwrappedParams.collectionId);
    }

    unwrapParams();
  }, [params]);

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
    <div className="w-full">
      {filteredTestimonials.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 flex-1">
          {filteredTestimonials.map((testimonial) =>
            testimonial.isTweet ? (
              <TweetTestimonialCard
                key={testimonial._id}
                tweetId={testimonial.tweetId}
              />
            ) : (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
