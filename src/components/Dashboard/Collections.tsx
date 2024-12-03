import React from "react";
import CreateCollectionButton from "./CreateCollectionButton";
import { ICollection } from "@/types/types";
import CollectionCard from "./CollectionCard";

interface CollectionsProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collections: ICollection[];
  deleteCollection: (id: string) => Promise<void>;
  onEditClick: (collectionId: string) => void;
}

export default function Collections({
  setIsOpen,
  collections,
  deleteCollection,
  onEditClick,
}: CollectionsProps) {
  const filteredCollections = collections.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Collections</h2>
        <CreateCollectionButton setIsOpen={setIsOpen} />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCollections.map((collection) => (
          <CollectionCard
            key={collection._id}
            collection={collection}
            deleteCollection={deleteCollection}
            onEditClick={onEditClick}
          />
        ))}
      </div>
    </div>
  );
}
