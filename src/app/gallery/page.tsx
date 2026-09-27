import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryHeaderShell } from "@/components/gallery/GalleryHeaderShell";
import { GalleryGridFallback, GallerySection } from "@/components/gallery/GallerySection";
import { isFeatureEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual journal by Nitish Kumar Gupta.",
};

interface GalleryPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  if (!isFeatureEnabled("gallery")) {
    notFound();
  }
  const { sort } = await searchParams;

  return (
    <div className="min-h-screen pb-16 pt-8 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <GalleryHeaderShell />
          <Suspense fallback={<GalleryGridFallback />}>
            <GallerySection sort={sort === "loved" ? "loved" : "newest"} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
