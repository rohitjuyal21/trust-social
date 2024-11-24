"use client";
import React, { use, useEffect, useState } from "react";
import Loader from "../Loader";
import TestimonialsControls from "./TestimonialsControls";
import { ICollection, Testimonial } from "@/types/types";
import TestimonialCard from "./TestimonialCard";
import WriteTestimonialModal from "../WriteTestimonialModal";

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
        </div>
      )}
    </div>
  );
}
