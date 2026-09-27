import Link from "next/link";
import { ArrowRight, FolderCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/home/ProjectCard";
import { getProjects } from "@/lib/server/portfolioData";
import type { Project } from "@/types/Project";

export function FeaturedProjectsFallback() {
  return (
    <div className="mt-10" aria-hidden="true">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-6"
          >
            <Skeleton className="aspect-[16/9] w-full" />
            <Skeleton className="mt-5 h-4 w-1/4" />
            <Skeleton className="mt-3 h-6 w-3/4" />
            <Skeleton className="mt-3 h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedGrid({ projects }: { projects: Project[] }) {
  const displayProjects = projects.filter((project) => project.isFeatured);

  return (
    <div className="mt-10">
      {displayProjects.length > 0 ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={index === 0 ? "md:col-span-2 lg:col-span-1" : undefined}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-left">
            <Button asChild>
              <Link href="/projects">
                <FolderCode className="mr-2 h-4 w-4" aria-hidden="true" />
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <Empty
          title="No featured projects yet"
          description="Featured projects will appear here once selected."
        />
      )}
    </div>
  );
}

export async function FeaturedProjects() {
  const projects = await getProjects();

  return <FeaturedGrid projects={projects} />;
}
