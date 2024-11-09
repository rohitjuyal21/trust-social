import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";

interface ImageUploadProps {
  image?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export default function ImageUpload({
  image,
  onChange,
  onClear,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUploadLogo = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 rounded-full relative overflow-hidden border">
        {image ? (
          <Image src={image} alt="Collection Logo" fill />
        ) : (
          <div className="w-16 h-16 bg-accent"></div>
        )}
      </div>
      <Button
        onClick={handleUploadLogo}
        variant="outline"
        size="sm"
        type="button"
      >
        Upload
      </Button>
      {image && (
        <Button
          variant="outline"
          size="icon"
          className="w-5 h-5 rounded-full"
          type="button"
          onClick={onClear}
        >
          <X className="size-3" />
        </Button>
      )}
      <Input
        type="file"
        accept="image/*"
        placeholder="Collection Name"
        className="sr-only"
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  );
}
