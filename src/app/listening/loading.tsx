import { ListeningHeaderShell } from "@/components/listening/ListeningHeaderShell";
import { ListeningShowcaseFallback } from "@/components/listening/ListeningSection";

export default function ListeningLoading() {
  return (
    <div className="min-h-screen pb-14 pt-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ListeningHeaderShell />
          <ListeningShowcaseFallback />
        </div>
      </div>
    </div>
  );
}
