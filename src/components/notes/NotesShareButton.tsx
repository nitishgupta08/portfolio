"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NotesShareButtonProps { title: string; }

export function NotesShareButton({ title }: NotesShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = typeof navigator !== "undefined" && Boolean(navigator.share);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      if (!navigator.clipboard) {
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // User cancelled the share sheet or clipboard is unavailable — silent.
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={() => void share()}>
      {copied ? <Check className="mr-2 size-4" aria-hidden="true" /> : canNativeShare ? <Share2 className="mr-2 size-4" aria-hidden="true" /> : <Copy className="mr-2 size-4" aria-hidden="true" />}
      {copied ? "Link copied" : "Share"}
    </Button>
  );
}
