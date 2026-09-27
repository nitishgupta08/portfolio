import { Rss } from "lucide-react";

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
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a href="/feed.xml" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Rss className="size-3.5" aria-hidden="true" />
              RSS
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
