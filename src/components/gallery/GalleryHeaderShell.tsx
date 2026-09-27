import { Camera } from "lucide-react";

import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export function GalleryHeaderShell() {
  return (
    <>
      <PageBreadcrumb items={[{ label: "Gallery" }]} />
      <header className="mb-8 mt-8 flex items-end justify-between gap-6 border-b border-border/80 pb-8 sm:mb-12 sm:mt-12 sm:pb-10">
        <div>
          <p className="editorial-kicker">Visual journal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Gallery</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Photographs, fragments, and small observations collected along the way.
          </p>
        </div>
        <Camera className="mb-2 hidden size-7 text-muted-foreground sm:block" aria-hidden="true" />
      </header>
    </>
  );
}
