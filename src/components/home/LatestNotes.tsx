import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { NotesListItem } from "@/components/notes/NotesListItem";
import { getNotesPage } from "@/lib/server/portfolioData";
import type { NotePost } from "@/types/NotePost";

export function LatestNotesFallback() {
  return (
    <div className="mt-10" aria-hidden="true">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-6"
          >
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-4 h-7 w-3/4" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestNotesGrid({ posts }: { posts: NotePost[] }) {
  if (posts.length === 0) {
    return (
      <div className="mt-10">
        <Empty
          title="No notes published yet"
          description="Published notes will appear here automatically."
        />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NotesListItem key={post.id ?? post.slug} notes={post} />
        ))}
      </div>

      <div className="mt-10 text-left">
        <Button asChild>
          <Link href="/notes">
            <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
            View all notes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export async function LatestNotes() {
  const notesPage = await getNotesPage({ page: 1, pageSize: 3 });

  return <LatestNotesGrid posts={notesPage.posts} />;
}
