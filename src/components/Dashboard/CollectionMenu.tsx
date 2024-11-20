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
  onEditClick: (collectionId: string) => void;
}

const CollectionActionsMenu = ({
  setIsDeleteDialogOpen,
  collectionId,
  onEditClick,
}: CollectionMenuProps) => {
  const collectionLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${collectionId}`;

  const handleGetLink = () => {
    copy(collectionLink);
    toast.success("Link copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <MoreVertical className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          <MessageSquare className="h-4 w-4" />
          Manage Testimonials
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGetLink} className="cursor-pointer">
          <Link className="h-4 w-4" />
          Get the Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onEditClick(collectionId)}
          className="cursor-pointer"
        >
          <Edit className="h-4 w-4" />
          Edit Collection
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsDeleteDialogOpen(true)}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Delete Collection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionActionsMenu;
