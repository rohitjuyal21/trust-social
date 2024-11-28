// components/EmbedCode.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EmbedCode({
  collectionId,
}: {
  collectionId: string | undefined;
}) {
  const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_BASE_URL}/widget/${collectionId}" width="100%" height="500" frameborder="0" style="border:none;"></iframe>`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast.success("Embed code copied to clipboard!");
    } catch {
      toast.error("Failed to copy embed code.");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        readOnly
        value={embedCode}
        className="text-gray-500 cursor-pointer"
        onClick={handleCopy}
      />
      <Button onClick={handleCopy}>
        {copied ? "Copied!" : "Copy Embed Code"}
      </Button>
    </div>
  );
}
