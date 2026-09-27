import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ListeningHeaderShell } from "@/components/listening/ListeningHeaderShell";
import {
  ListeningShowcaseFallback,
  ListeningShowcaseSection,
} from "@/components/listening/ListeningSection";
import { isFeatureEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "Listening - Nitish Gupta",
  description: "Music listening dashboard powered by Last.fm.",
};

export const revalidate = 30;

export default function ListeningPage() {
  if (!isFeatureEnabled("listening")) {
    notFound();
  }
  return (
    <div className="min-h-screen pb-14 pt-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ListeningHeaderShell />
          <Suspense fallback={<ListeningShowcaseFallback />}>
            <ListeningShowcaseSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
