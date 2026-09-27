import { GalleryHeaderShell } from "@/components/gallery/GalleryHeaderShell";
import { GalleryGridFallback } from "@/components/gallery/GallerySection";

export default function GalleryLoading() {
  return (
    <div className="min-h-screen pb-16 pt-8 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <GalleryHeaderShell />
          <GalleryGridFallback />
        </div>
      </div>
    </div>
  );
}
