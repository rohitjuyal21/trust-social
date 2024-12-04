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
  const [isEditing, setIsEditing] = useState(false);
  const [defaultFormValues, setDefaultFormValues] =
    useState<ICollection | null>(null);

  const [totalTestimonials, setTotalTestimonials] = useState(0);

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
        await fetchTestimonials();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting collection");
      console.error("Error while deleting collection:", error);
    }
  };

  const fetchCollectionById = async (collectionId: string) => {
    try {
      const response = await fetch(`/api/collection/${collectionId}`);
      const data = await response.json();
      if (response.ok) {
        setDefaultFormValues(data);
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchCollections(), fetchTestimonials()]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (collectionId: string) => {
    setIsEditing(true);
    setIsCreateCollectionModalOpen(true);
    fetchCollectionById(collectionId);
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("api/testimonial");
      const data = await response.json();
      if (response.ok) {
        setTotalTestimonials(data.length);
      }
    } catch (error) {
      console.log("Error fetching all Testimonials", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6">
          <CollectionsOverview
            collections={collections.length}
            testimonials={totalTestimonials}
          />
          {collections.length === 0 ? (
            <EmptyCollection setIsOpen={setIsCreateCollectionModalOpen} />
          ) : (
            <Collections
              setIsOpen={setIsCreateCollectionModalOpen}
              collections={collections}
              deleteCollection={deleteCollection}
              onEditClick={handleEditClick}
            />
          )}
          <CreateCollectionModal
            isOpen={isCreateCollectionModalOpen}
            setIsOpen={setIsCreateCollectionModalOpen}
            onSuccess={handleCreateCollectionSuccess}
            fetchCollections={fetchCollections}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            defaultValues={defaultFormValues}
            setDefaultValues={setDefaultFormValues}
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
