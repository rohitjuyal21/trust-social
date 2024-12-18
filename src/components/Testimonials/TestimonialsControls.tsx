import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Pen, Plus, Rocket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Twitter from "../svg/Twitter";
import ShareTestimonialsModal from "./ShareTestimonialsModal";
import { Testimonial } from "@/types/types";
import { toast } from "sonner";

interface TestimonialsControlsProps {
  testimonials: Testimonial[];
  setWriteTestimonialModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImportTweetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  visibleTestimonials: "all" | "text" | "tweet";
  setVisibleTestimonials: React.Dispatch<
    React.SetStateAction<"all" | "text" | "tweet">
  >;
  handleEmbedSelect: (embedType: "grid" | "carousel") => void;
  collectionId: string;
}

export default function TestimonialsControls({
  testimonials,
  setWriteTestimonialModalOpen,
  setImportTweetModalOpen,
  visibleTestimonials,
  setVisibleTestimonials,
  handleEmbedSelect,
  collectionId,
}: TestimonialsControlsProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareTestimonialsModal = () => {
    if (testimonials.length === 0) {
      return toast.error("You don't have any testimonials yet.");
    } else {
      setIsShareModalOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Select
        value={visibleTestimonials}
        onValueChange={(val: "all" | "text" | "tweet") =>
          setVisibleTestimonials(val)
        }
        defaultValue="all"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="tweet">Twitter</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className=" h-4 w-4" />
              Add Testimonial
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => setWriteTestimonialModalOpen(true)}
              className="cursor-pointer"
            >
              <Pen /> Text
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setImportTweetModalOpen(true)}
              className="cursor-pointer"
            >
              <Twitter />
              Twitter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={handleShareTestimonialsModal}>
          <Rocket className="size-4" /> Share
        </Button>

        <ShareTestimonialsModal
          isOpen={isShareModalOpen}
          setIsOpen={setIsShareModalOpen}
          handleEmbedSelect={handleEmbedSelect}
          collectionId={collectionId}
        />
      </div>
    </div>
  );
}
