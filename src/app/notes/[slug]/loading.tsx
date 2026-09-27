import { Skeleton } from "@/components/ui/skeleton";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export default function NotePostLoading() {
  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PageBreadcrumb items={[{ label: "Notes", href: "/notes" }]} />
          <div className="mb-8">
            <Skeleton className="h-9 w-40" />
          </div>
          <div aria-hidden="true">
            <Skeleton className="h-10 w-4/5 md:h-12" />
            <div className="mt-6 flex flex-wrap gap-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="mt-10 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-8 h-7 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
