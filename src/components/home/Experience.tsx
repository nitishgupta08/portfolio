import { Suspense } from "react";

import { ExperienceTimeline, ExperienceTimelineFallback } from "@/components/home/ExperienceTimeline";

export default function Experience() {
  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker editorial-kicker--lg">Experience</p>

          <Suspense fallback={<ExperienceTimelineFallback />}>
            <ExperienceTimeline />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
