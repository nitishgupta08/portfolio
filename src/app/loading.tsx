import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen pt-16" aria-hidden="true">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl py-14 md:py-20">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-4 h-12 w-3/4 md:h-16" />
          <Skeleton className="mt-6 h-6 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-6 w-5/6 max-w-2xl" />
          <div className="mt-10 flex gap-4">
            <Skeleton className="h-11 w-40" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
