import { Suspense } from "react";

import { LatestNotes, LatestNotesFallback } from "@/components/home/LatestNotes";

export default function NotesPreview() {
  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker editorial-kicker--lg">Notes</p>

          <Suspense fallback={<LatestNotesFallback />}>
            <LatestNotes />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
