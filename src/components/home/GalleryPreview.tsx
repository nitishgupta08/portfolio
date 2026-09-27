import { Suspense } from "react";

import { LatestFrames, LatestFramesFallback } from "@/components/home/LatestFrames";

export default function GalleryPreview() {
  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker editorial-kicker--lg">Gallery</p>

          <Suspense fallback={<LatestFramesFallback />}>
            <LatestFrames />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
