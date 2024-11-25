"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import TestimonialsControls from "./TestimonialsControls";
import { ICollection, Testimonial } from "@/types/types";
import TestimonialCard from "./TestimonialCard";
import WriteTestimonialModal from "../WriteTestimonialModal";
import ImportTweetModal from "../ImportTweetModal";

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

  const fetchTweet = async (tweetUrl: string) => {
    try {
      const response = await fetch("/api/fetch-tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweetUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tweet:", data);
        return data;
      } else {
        const error = await response.json();
        console.error("Error fetching tweet:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Example usage
  const tweetUrl = "https://x.com/elonmusk/status/1860766441122996246";
  useEffect(() => {
    fetchTweet(tweetUrl);
  }, []);
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
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-6 flex-1">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </div>
          <WriteTestimonialModal
            isOpen={isWriteTestimonialModalOpen}
            setIsOpen={setIsWriteTestimonialModalOpen}
            collection={collection}
            refetchData={refetchData}
          />
          <ImportTweetModal
            isOpen={isImportTweetModalOpen}
            setIsOpen={setIsImportTweetModalOpen}
          />
        </div>
      )}
    </div>
  );
}
