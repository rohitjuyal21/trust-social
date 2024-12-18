"use client";
import Loader from "@/components/Loader";
import EmptyTestimonial from "@/components/Testimonials/EmptyTestimonial";
import { Testimonial } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import TweetTestimonialCard from "./Testimonials/TweetTestimonialCard";
import TestimonialCard from "./Testimonials/TestimonialCard";
import Link from "next/link";
import Logo from "./svg/Logo";

export default function ShareTestimonials({
  collectionId,
}: {
  collectionId: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/testimonial/${collectionId}`);
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data);
      }
    } catch (error) {
      console.log(`Error fetching testimonials: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const sortedTestimonials = testimonials.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col h-full w-full min-h-screen">
      <div className="border-b">
        <div className="flex items-center md:px-8 px-4 text-xl font-bold  max-w-screen-xl mx-auto w-full h-16">
          {collectionId}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto w-full flex flex-col flex-1">
        <div className="py-8 md:px-8 px-4 flex items-center justify-center flex-1 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center ">
              <Loader />
            </div>
          ) : (
            <div className="w-full space-y-8 flex flex-col h-full">
              {sortedTestimonials.length === 0 ? (
                <EmptyTestimonial />
              ) : (
                <div>
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-x-4 lg:gap-y-6 flex-1 flex-wrap">
                    {sortedTestimonials.map((testimonial) =>
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
                  <div className="flex justify-center mt-8">
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
          )}
        </div>
      </div>
    </div>
  );
}
