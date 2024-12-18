import ShareTestimonials from "@/components/ShareTestimonials";

export default async function Page({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = await params;
  return <ShareTestimonials collectionId={collectionId} />;
}
