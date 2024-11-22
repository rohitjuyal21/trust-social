"use client";
import { ICollection } from "@/types/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import WriteTestimonialModal from "./WriteTestimonialModal";
import TestimonialSuccessModal from "./TestimonialSuccessModal";

export default function TestimonialPage({
  collectionId,
}: {
  collectionId: string;
}) {
  const [collection, setCollection] = useState<ICollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriteTestimonialModalOpen, setIsWriteTestimonialModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const fetchCollection = useCallback(async () => {
    try {
      const response = await fetch(`/api/collection/${collectionId}`);
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.error("Error fetching collection:", error);
    } finally {
      setIsLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 max-w-xl mx-auto w-full">
          <div className="flex flex-col gap-6 items-center  w-full p-6 md:p-8 border rounded-lg bg-accent/30 ">
            <div className="h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={collection?.collectionLogo || ""}
                alt="Testimonial"
                width={0}
                height={0}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              {collection?.headerTitle}
            </h1>
            <p className="text-base md:text-lg font-medium text-muted-foreground text-center">
              {collection?.customMessage}
            </p>
            <div className="flex flex-col items-start justify-center gap-3 w-full my-6">
              <h4 className="text-xl font-bold">Questions</h4>
              <ul className="list-disc pl-4 space-y-1">
                {collection?.questions.map((question, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground text-base md:text-lg font-medium"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="w-full"
              style={{ background: collection?.customButtonColor }}
              onClick={() => setIsWriteTestimonialModalOpen(true)}
            >
              Send Testimonial <Pencil className="size-4" />
            </Button>
          </div>
        </div>
      )}
      <WriteTestimonialModal
        isOpen={isWriteTestimonialModalOpen}
        setIsOpen={setIsWriteTestimonialModalOpen}
        collection={collection}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
      />
      <TestimonialSuccessModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        thankYouPage={collection?.thankYouPage}
      />
    </div>
  );
}
