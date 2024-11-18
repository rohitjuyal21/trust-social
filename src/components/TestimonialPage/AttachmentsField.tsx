import { convertToBase64 } from "@/lib/convertToBase64";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Trash2, X } from "lucide-react";
import Image from "next/image";

interface AttachmentsFieldProps {
  attachments: string[] | undefined;
  setAttachments: (attachments: string[]) => void;
}

export default function AttachmentsField({
  attachments,
  setAttachments,
}: AttachmentsFieldProps) {
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    if (attachmentInputRef.current) {
      attachmentInputRef.current.click();
    }
  };

  const handleClearAttachments = () => {
    setAttachments([]);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filePromises = Array.from(files).map((file) =>
        convertToBase64(file)
      );
      const base64Files = (await Promise.all(filePromises)) as string[];
      setAttachments([...(attachments || []), ...base64Files]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    if (attachments) {
      const updatedAttachments = attachments.filter((_, i) => i !== index);
      setAttachments(updatedAttachments);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <Button onClick={handleChooseFile} type="button" variant="outline">
          Choose File
        </Button>

        {attachments && attachments.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleClearAttachments}
          >
            <Trash2 className="size-4" />
          </Button>
        )}

        <input
          type="file"
          accept="image/*"
          ref={attachmentInputRef}
          placeholder="Collection Name"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>

      {attachments && attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative">
              <div className="rounded-lg bg-accent/30 overflow-hidden border">
                <Image
                  src={attachment}
                  alt={`attachment ${index}`}
                  width={0}
                  height={0}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
