import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CreateCollectionButton({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button onClick={() => setIsOpen(true)}>
      Create Collection <Plus className="size-4" />
    </Button>
  );
}
