import TestimonialPage from "@/components/TestimonialPage/TestimonialPage";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = await params;

  return <TestimonialPage collectionId={collectionId} />;
}
