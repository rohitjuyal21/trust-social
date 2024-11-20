import { ICollection } from "@/types/types";
import React, { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import CollectionMenu from "./CollectionMenu";
import DeleteCollectionDialog from "./DeleteCollectionDialog";

interface CollectionCardProps {
  collection: ICollection;
  deleteCollection: (id: string) => Promise<void>;
  onEditClick: (collectionId: string) => void;
}

export default function CollectionCard({
  collection,
  deleteCollection,
  onEditClick,
}: CollectionCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between gap-2">
        <div className="flex gap-4 items-center">
          <div className="rounded-lg overflow-hidden border">
            <Image
              src={collection.collectionLogo}
              width={0}
              height={0}
              alt={collection.collectionName}
              className="w-12 h-12 object-cover"
            />
          </div>
          <h4 className="font-medium">{collection.collectionName}</h4>
        </div>
        <CollectionMenu
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          collectionId={collection.collectionId}
          onEditClick={onEditClick}
        />
      </div>
      <div>
        <p className="text-muted-foreground text-sm">Testimonials: {10}</p>
      </div>
      <DeleteCollectionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        collectionName={collection.collectionName}
        id={collection._id}
        collectionId={collection.collectionId}
        onDelete={deleteCollection}
      />
    </Card>
  );
}
