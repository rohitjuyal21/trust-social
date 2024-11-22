import React from "react";

export default async function page({
  params,
}: {
  params: { collectionId: string };
}) {
  const { collectionId } = await params;
  return <div>{collectionId}</div>;
}
