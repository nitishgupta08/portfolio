"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function GalleryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen pb-16 pt-8 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl rounded-[calc(var(--radius)+4px)] border border-border/80 bg-card px-6 py-14 text-center">
          <Alert variant="destructive" className="mx-auto max-w-lg text-left">
            <TriangleAlert className="size-4" aria-hidden="true" />
            <AlertTitle>Gallery couldn&apos;t load right now</AlertTitle>
            <AlertDescription>The photo service is temporarily unavailable. Try again in a moment.</AlertDescription>
          </Alert>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button onClick={() => reset()}>Try again</Button>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
