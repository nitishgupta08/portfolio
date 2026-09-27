import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import {
  ProjectsViewToggle,
  type ProjectsView,
} from "@/components/projects/ProjectsViewToggle";

export function ProjectsHeaderShell({ view }: { view: ProjectsView }) {
  return (
    <>
      <PageBreadcrumb items={[{ label: "Projects" }]} />
      <header className="py-6">
        <p className="editorial-kicker editorial-kicker--lg">Projects</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Project archive
          </h1>
          <ProjectsViewToggle view={view} />
        </div>
      </header>
    </>
  );
}
