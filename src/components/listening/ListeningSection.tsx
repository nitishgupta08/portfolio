import { Skeleton } from "@/components/ui/skeleton";
import ListeningShowcasePage from "@/components/listening/ListeningShowcasePage";
import { Empty } from "@/components/ui/empty";
import { getListeningShowcase } from "@/lib/server/portfolioData";

export function ListeningShowcaseFallback() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-9 w-1/4" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}

export async function ListeningShowcaseSection() {
  const listeningData = await getListeningShowcase();

  if (!listeningData) {
    return (
      <Empty
        className="mt-4"
        title="Listening data is unavailable"
        description="Set LASTFM_API_KEY and LASTFM_USERNAME to enable this dashboard."
      />
    );
  }

  return <ListeningShowcasePage data={listeningData} />;
}
