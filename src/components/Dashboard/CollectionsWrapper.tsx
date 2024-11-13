"use client";
import React, { useEffect, useState } from "react";
import CreateCollectionModal from "./CreateCollectionModal";
import CollectionSuccessModal from "./CollectionSuccessModal";
import { toast } from "sonner";
import { ICollection } from "@/types/types";
import CollectionsOverview from "./CollectionsOverview";
import EmptyCollection from "./EmptyCollection";
import Collections from "./Collections";

const CollectionsWrapper = () => {
  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] =
    useState(false);
  const [isCollectionSuccessModalOpen, setIsCollectionSuccessModalOpen] =
    useState(false);

  const [collections, setCollections] = useState<ICollection[]>([]);

  const [collectionDetails, setCollectionDetails] = useState({
    collectionName: "",
    publicUrl: "",
  });

  const handleCreateCollectionSuccess = (
    collectionName: string,
    publicUrl: string
  ) => {
    setIsCollectionSuccessModalOpen(true);
    setCollectionDetails({
      collectionName,
      publicUrl,
    });
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/collection");
        const data = await response.json();

        if (response.ok) {
          setCollections(data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error fetching collections");
        console.error("Error while creating collection:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="space-y-8">
      <CollectionsOverview collections={collections} />
      {collections.length === 0 ? (
        <EmptyCollection setIsOpen={setIsCreateCollectionModalOpen} />
      ) : (
        <Collections
          setIsOpen={setIsCreateCollectionModalOpen}
          collections={collections}
        />
      )}
      <CreateCollectionModal
        isOpen={isCreateCollectionModalOpen}
        setIsOpen={setIsCreateCollectionModalOpen}
        onSuccess={handleCreateCollectionSuccess}
      />
      <CollectionSuccessModal
        isOpen={isCollectionSuccessModalOpen}
        setIsOpen={setIsCollectionSuccessModalOpen}
        collectionDetails={collectionDetails}
      />
    </div>
  );
};

export default CollectionsWrapper;
