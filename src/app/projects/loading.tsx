import { Skeleton } from "@/components/ui/skeleton";
import { ProjectsHeaderShell } from "@/components/projects/ProjectsHeaderShell";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen pb-14 pt-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ProjectsHeaderShell view="grid" />
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-6"
              >
                <Skeleton className="aspect-[16/9] w-full" />
                <Skeleton className="mt-5 h-4 w-1/4" />
                <Skeleton className="mt-3 h-6 w-3/4" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
