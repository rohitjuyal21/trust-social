"use client";
import React, { useEffect, useState } from "react";
import CreateCollectionModal from "./CreateCollectionModal";
import CollectionSuccessModal from "./CollectionSuccessModal";
import { toast } from "sonner";
import { ICollection } from "@/types/types";
import CollectionsOverview from "./CollectionsOverview";
import EmptyCollection from "./EmptyCollection";
import Collections from "./Collections";
import Loader from "../Loader";

const CollectionsWrapper = () => {
  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] =
    useState(false);
  const [isCollectionSuccessModalOpen, setIsCollectionSuccessModalOpen] =
    useState(false);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionDetails, setCollectionDetails] = useState({
    collectionName: "",
    collectionId: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateCollectionSuccess = (
    collectionName: string,
    collectionId: string
  ) => {
    setIsCollectionSuccessModalOpen(true);
    setCollectionDetails({
      collectionName,
      collectionId,
    });
  };

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
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      const response = await fetch("api/collection", {
        body: JSON.stringify({ id }),
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Collection deleted successfully");
        await fetchCollections();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting collection");
      console.error("Error while deleting collection:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6">
          <CollectionsOverview collections={collections} />
          {collections.length === 0 ? (
            <EmptyCollection setIsOpen={setIsCreateCollectionModalOpen} />
          ) : (
            <Collections
              setIsOpen={setIsCreateCollectionModalOpen}
              collections={collections}
              deleteCollection={deleteCollection}
            />
          )}
          <CreateCollectionModal
            isOpen={isCreateCollectionModalOpen}
            setIsOpen={setIsCreateCollectionModalOpen}
            onSuccess={handleCreateCollectionSuccess}
            fetchCollections={fetchCollections}
          />
          <CollectionSuccessModal
            isOpen={isCollectionSuccessModalOpen}
            setIsOpen={setIsCollectionSuccessModalOpen}
            collectionDetails={collectionDetails}
          />
        </div>
      )}
    </>
  );
};

export default CollectionsWrapper;
