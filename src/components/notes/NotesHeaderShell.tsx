import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export function NotesHeaderShell() {
  return (
    <>
      <PageBreadcrumb items={[{ label: "Notes" }]} />
      <div className="mb-12">
        <div className="space-y-4">
          <p className="editorial-kicker">Writing</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Notes</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Notes on software, ideas, and maybe rant.
          </p>
        </div>
      </div>
    </>
  );
}
