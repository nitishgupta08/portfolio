import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/home/ProjectCard";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import type { ProjectsView } from "@/components/projects/ProjectsViewToggle";
import { Empty } from "@/components/ui/empty";
import { getProjects } from "@/lib/server/portfolioData";

export function ProjectsGridFallback() {
  return (
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
  );
}

export function ProjectsTableFallback() {
  return (
    <div className="mt-6 space-y-0" aria-hidden="true">
      <Skeleton className="h-4 w-40" />
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className="border-b border-border/60 py-5">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="mt-2 h-3.5 w-1/4" />
          <div className="mt-2.5 flex gap-1.5">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}

export async function ProjectsArchiveSection({ view }: { view: ProjectsView }) {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <Empty
        className="mt-6"
        title="No projects published yet"
        description="Published projects will appear here automatically."
      />
    );
  }

  if (view === "list") {
    return <ProjectsTable projects={projects} />;
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
