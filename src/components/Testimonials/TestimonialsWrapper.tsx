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
import EmbedWallModal from "../EmbedWallModal";

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
  const [isEmbedWallModalOpen, setIsEmbedWallModalOpen] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState<
    "all" | "tweet" | "text"
  >("all");
  const [embedType, setEmbedType] = useState<"grid" | "carousel">("grid");

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/testimonial/${collectionId}`);
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data);
      }
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
        return data;
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

  const filteredTestimonials = testimonials
    .filter((testimonial) => {
      if (visibleTestimonials === "all") return true;
      if (visibleTestimonials === "tweet") return testimonial.isTweet;
      if (visibleTestimonials === "text") return !testimonial.isTweet;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleEmbedSelect = (embedType: "grid" | "carousel") => {
    setEmbedType(embedType);
    setIsEmbedWallModalOpen(true);
  };

  return (
    <div className="py-8 md:px-8 px-4 max-w-screen-xl w-full h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="w-full space-y-8 flex flex-col h-full">
          <TestimonialsControls
            testimonials={testimonials}
            setWriteTestimonialModalOpen={setIsWriteTestimonialModalOpen}
            setImportTweetModalOpen={setIsImportTweetModalOpen}
            visibleTestimonials={visibleTestimonials}
            setVisibleTestimonials={setVisibleTestimonials}
            handleEmbedSelect={handleEmbedSelect}
          />
          {filteredTestimonials.length === 0 ? (
            <EmptyTestimonial />
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
          <EmbedWallModal
            isOpen={isEmbedWallModalOpen}
            setIsOpen={setIsEmbedWallModalOpen}
            collectionId={collection?.collectionId}
            embedType={embedType}
          />
        </div>
      )}
    </div>
  );
}
