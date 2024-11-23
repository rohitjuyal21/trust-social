import TestimonialsWrapper from "@/components/Testimonials/TestimonialsWrapper";
import React from "react";

export default async function page({
  params,
}: {
  params: { collectionId: string };
}) {
  const { collectionId } = await params;
  return <TestimonialsWrapper collectionId={collectionId} />;
}
