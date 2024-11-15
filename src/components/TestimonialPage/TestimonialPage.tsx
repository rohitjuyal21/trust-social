"use client";
import { ICollection } from "@/types/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

export default function TestimonialPage({
  collectionId,
}: {
  collectionId: string;
}) {
  const [collection, setCollection] = useState<ICollection | null>(null);
  const fetchCollection = useCallback(async () => {
    try {
      const response = await fetch(`/api/collection/${collectionId}`);
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  console.log(collection);

  return (
    <div>
      <div>
        {/* <Image
          src={collection.image}
          alt="Testimonial"
          width={500}
          height={500}
        /> */}
      </div>
    </div>
  );
}
