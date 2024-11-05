import React from "react";
import { ArchiveX, Plus } from "lucide-react";
import { Button } from "../ui/button";

const CollectionsWrapper = () => {
  const collections = 0;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Collections</h2>
      {collections === 0 ? (
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
          <Button>
            Create Collection <Plus className="size-4" />
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CollectionsWrapper;
