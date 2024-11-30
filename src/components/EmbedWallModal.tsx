"use client";
import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import copy from "copy-to-clipboard";
import { Copy } from "lucide-react";

interface EmbedWallModalProps {
  collectionId: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  embedType: "grid" | "carousel";
}

const IframePreview = React.memo(({ embedCode }: { embedCode: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: embedCode }} />;
});

export default function EmbedWallModal({
  collectionId,
  isOpen,
  setIsOpen,
  embedType,
}: EmbedWallModalProps) {
  const [theme, setTheme] = useState("light");
  console.log(embedType);

  const iframeSrc =
    embedType === "grid"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/widget/g/${collectionId}?theme=${theme}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/widget/c/${collectionId}?theme=${theme}`;

  const embedCode = useMemo(
    () =>
      `<iframe 
        src=${iframeSrc}
        id="iframe-${collectionId}" 
        width="100%" 
        height="600"
        frameborder="0" 
        style="border:none;" 
        scrolling="no">
      </iframe>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"></script>
      <script>
        iFrameResize({ log: false }, "#iframe-${collectionId}");
      </script>`,
    [collectionId, theme, embedType]
  );

  const handleCopy = async () => {
    copy(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen-xl rounded-lg">
        <VisuallyHidden.Root>
          <DialogTitle></DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>
        <div className="space-y-8">
          <div>
            <h5 className="font-semibold mb-2 text-sm">
              Add this code snippet to your website
            </h5>
            <Textarea
              readOnly
              value={embedCode}
              className="cursor-pointer mb-4"
              onClick={handleCopy}
            />
            <Button onClick={handleCopy}>
              <Copy className="size-4" /> Copy Embed Code
            </Button>
          </div>

          <div>
            <h5 className="font-semibold mb-2 text-sm">Theme</h5>
            <Select value={theme} onValueChange={(val) => setTheme(val)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <IframePreview embedCode={embedCode} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
