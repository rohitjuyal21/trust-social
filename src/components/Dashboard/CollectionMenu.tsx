import React from "react";
import { MoreVertical, Edit, Link, Trash2, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import copy from "copy-to-clipboard";
import { toast } from "sonner";

interface CollectionMenuProps {
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collectionId: string;
}

const CollectionActionsMenu = ({
  setIsDeleteDialogOpen,
  collectionId,
}: CollectionMenuProps) => {
  const collectionLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${collectionId}`;

  const handleGetLink = () => {
    copy(collectionLink);
    toast.success("Link copied to clipboard");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreVertical className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Manage Testimonials
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGetLink}>
          <Link className="mr-2 h-4 w-4" />
          Get the Link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit Collection
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsDeleteDialogOpen(true)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Collection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionActionsMenu;
