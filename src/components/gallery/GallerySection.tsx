import { Skeleton } from "@/components/ui/skeleton";
import Gallery, { type GallerySort } from "@/components/gallery/Gallery";
import { getGalleryPhotos } from "@/lib/server/portfolioData";

export function GalleryGridFallback() {
  return (
    <div aria-hidden="true">
      <div className="mb-5 flex items-center gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <Skeleton key={index} className="aspect-[4/3] w-full" />
        ))}
      </div>
    </div>
  );
}

export async function GallerySection({ sort }: { sort: GallerySort }) {
  const photos = await getGalleryPhotos();

  return <Gallery initialPhotos={photos} initialSort={sort} />;
}
