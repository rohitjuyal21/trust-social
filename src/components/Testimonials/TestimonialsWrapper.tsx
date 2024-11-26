"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import TestimonialsControls from "./TestimonialsControls";
import { ICollection, ITwitterEmbed, Testimonial } from "@/types/types";
import TestimonialCard from "./TestimonialCard";
import WriteTestimonialModal from "../WriteTestimonialModal";
import ImportTweetModal from "../ImportTweetModal";
import { toast } from "sonner";
import EmptyTestimonial from "./EmptyTestimonial";
import TweetTestimonialCard from "./TweetTestimonialCard";

interface TestimonialsWrapperProps {
  collectionId: string;
}

export default function TestimonialsWrapper({
  collectionId,
}: TestimonialsWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [collection, setCollection] = useState<ICollection | null>(null);
  const [isWriteTestimonialModalOpen, setIsWriteTestimonialModalOpen] =
    useState(false);
  const [isImportTweetModalOpen, setIsImportTweetModalOpen] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/testimonial/${collectionId}`);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.log(`Error fetching testimonials: ${error}`);
    }
  };

  const fetchCollection = async () => {
    try {
      const response = await fetch(`/api/collection/${collectionId}`);
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.log(`Error fetching Collection: ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchTestimonials(), fetchCollection()]);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetchData = () => {
    fetchCollection();
    fetchTestimonials();
  };

  const fetchEmbedTweet = async (
    tweetUrl: string
  ): Promise<ITwitterEmbed | null> => {
    try {
      const response = await fetch(
        `/api/twitter-oembed?tweetUrl=${encodeURIComponent(tweetUrl)}`
      );
      const data = await response.json();

      if (response.ok) {
        return data; // Return the embed data instead of setting state
      } else {
        console.log(data.error || "Failed to fetch embed");
        toast.error("Enter a valid tweet link!");
        return null;
      }
    } catch (err) {
      console.log("Enter a valid Link", err);
      toast.error("Enter a valid tweet link!");
      return null;
    }
  };

  console.log(testimonials);
  return (
    <div className="py-8 md:px-8 px-4 max-w-screen-xl w-full h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="w-full space-y-8 flex flex-col h-full">
          <TestimonialsControls
            setWriteTestimonialModalOpen={setIsWriteTestimonialModalOpen}
            setImportTweetModalOpen={setIsImportTweetModalOpen}
          />
          {testimonials.length === 0 ? (
            <EmptyTestimonial />
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-6 flex-1">
              {testimonials.map((testimonial) =>
                testimonial.isTweet ? (
                  <TweetTestimonialCard
                    key={testimonial._id}
                    tweetEmbedCode={testimonial.tweetEmbedCode}
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
          <WriteTestimonialModal
            isOpen={isWriteTestimonialModalOpen}
            setIsOpen={setIsWriteTestimonialModalOpen}
            collection={collection}
            refetchData={refetchData}
          />
          <ImportTweetModal
            isOpen={isImportTweetModalOpen}
            setIsOpen={setIsImportTweetModalOpen}
            fetchEmbedTweet={fetchEmbedTweet}
            collection={collection}
            refetchData={refetchData}
          />
        </div>
      )}
    </div>
  );
}
