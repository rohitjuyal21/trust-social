import { ArchiveX } from "lucide-react";
import React from "react";
import CreateCollectionButton from "./CreateCollectionButton";

interface EmptyCollectionProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmptyCollection({ setIsOpen }: EmptyCollectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Collections</h2>
      <div className="flex flex-col gap-4 items-center border rounded-lg p-4 md:p-8 bg-accent/30">
        <ArchiveX className="text-muted h-16 w-16" />
        <div className="space-y-1">
          <h5 className="text-muted-foreground font-bold text-center text-lg">
            No Collections yet
          </h5>
          <p className="text-muted-foreground text-center">
            Create a collection to collect testimonials
          </p>
        </div>
        <CreateCollectionButton setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
