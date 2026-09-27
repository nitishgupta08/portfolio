import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsHeaderShell } from "@/components/projects/ProjectsHeaderShell";
import {
  ProjectsArchiveSection,
  ProjectsGridFallback,
  ProjectsTableFallback,
} from "@/components/projects/ProjectsSection";
import type { ProjectsView } from "@/components/projects/ProjectsViewToggle";
import { isFeatureEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "Projects - Nitish Gupta",
  description: "A full collection of featured and production projects.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  if (!isFeatureEnabled("projects")) {
    notFound();
  }
  const { view: viewParam } = await searchParams;
  const view: ProjectsView = viewParam === "list" ? "list" : "grid";

  return (
    <div className="min-h-screen pb-14 pt-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ProjectsHeaderShell view={view} />
          <Suspense
            fallback={view === "list" ? <ProjectsTableFallback /> : <ProjectsGridFallback />}
          >
            <ProjectsArchiveSection view={view} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
