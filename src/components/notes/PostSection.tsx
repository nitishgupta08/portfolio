import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { NotePostContent } from "@/components/notes/NotePostContent";
import { NotesReadingProgress } from "@/components/notes/NotesReadingProgress";
import { getNotePost } from "@/lib/server/portfolioData";
import { notFound } from "next/navigation";

export function PostShell() {
  return (
    <>
      <NotesReadingProgress />
      <PageBreadcrumb items={[{ label: "Notes", href: "/notes" }]} />
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/notes">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Notes
          </Link>
        </Button>
      </div>
    </>
  );
}

export function PostBodyFallback() {
  return (
    <div aria-hidden="true">
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="mt-6 h-10 w-4/5 md:h-12" />
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
  );
}

export async function PostBodySection({ slug }: { slug: string }) {
  const notes = await getNotePost(slug);

  if (!notes) {
    notFound();
  }

  return <NotePostContent slug={slug} initialNotes={notes} />;
}
