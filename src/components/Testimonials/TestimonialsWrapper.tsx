"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import TestimonialsControls from "./TestimonialsControls";

interface TestimonialsWrapperProps {
  collectionId: string;
}

export default function TestimonialsWrapper({
  collectionId,
}: TestimonialsWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/testimonial/${collectionId}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(`Error fetching testimonials: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="py-8 md:px-8 px-4 max-w-screen-xl w-full h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <TestimonialsControls />
        </div>
      )}
    </div>
  );
}
