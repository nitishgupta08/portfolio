import { Suspense } from "react";

import { FeaturedProjects, FeaturedProjectsFallback } from "@/components/home/FeaturedProjects";

export default function Projects() {
  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker editorial-kicker--lg">Projects</p>

          <Suspense fallback={<FeaturedProjectsFallback />}>
            <FeaturedProjects />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
