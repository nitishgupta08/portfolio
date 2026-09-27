import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { getGalleryPhotos } from "@/lib/server/portfolioData";
import type { Photo } from "@/types/Gallery";

export function LatestFramesFallback() {
  return (
    <div className="mt-10" aria-hidden="true">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card"
          >
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestFramesGrid({ photos }: { photos: Photo[] }) {
  const preview = photos.slice(0, 4);

  if (preview.length === 0) {
    return (
      <div className="mt-10">
        <Empty
          title="No frames published yet"
          description="Published photographs will appear here automatically."
        />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((photo) => (
          <Link
            key={photo.id}
            href="/gallery"
            className="group overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card transition-shadow hover:shadow-lg"
            aria-label={`Open gallery — ${photo.alt}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="truncate text-sm font-medium leading-tight">
                {photo.alt}
              </p>
              {photo.location ? (
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {photo.location}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-left">
        <Button asChild>
          <Link href="/gallery">
            <Camera className="mr-2 h-4 w-4" aria-hidden="true" />
            Open gallery
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export async function LatestFrames() {
  const photos = await getGalleryPhotos();

  return <LatestFramesGrid photos={photos} />;
}
