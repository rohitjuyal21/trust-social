import React from "react";
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

interface TestimonialsControlsProps {
  setWriteTestimonialModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TestimonialsControls({
  setWriteTestimonialModalOpen,
}: TestimonialsControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="twitter">Twitter</SelectItem>
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
            <DropdownMenuItem className="cursor-pointer">
              <Twitter />
              Twitter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">
          <Rocket className="size-4" /> Share
        </Button>
      </div>
    </div>
  );
}
