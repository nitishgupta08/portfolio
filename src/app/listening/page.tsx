import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ListeningShowcasePage from "@/components/listening/ListeningShowcasePage";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { getListeningShowcase } from "@/lib/server/portfolioData";

export const metadata: Metadata = {
  title: "Listening - Nitish Gupta",
  description: "Music listening dashboard powered by Last.fm.",
};

export default async function ListeningPage() {
  const listeningData = await getListeningShowcase();

  return (
    <div className="min-h-screen pb-14 pt-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Button variant="ghost" size="sm" asChild className="mb-3">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <h1 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">Listening</h1>

          {!listeningData ? (
            <Empty
              className="mt-4"
              title="Listening data is unavailable"
              description="Set LASTFM_API_KEY and LASTFM_USERNAME to enable this dashboard."
            />
          ) : (
            <ListeningShowcasePage data={listeningData} />
          )}
        </div>
      </div>
    </div>
  );
}
