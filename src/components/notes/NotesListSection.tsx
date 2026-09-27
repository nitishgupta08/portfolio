import { Skeleton } from "@/components/ui/skeleton";
import { NotesPageContent } from "@/components/notes/NotesPageContent";
import type { NotePostFilters } from "@/lib/firebase/services/notesService";
import { getNotesPage } from "@/lib/server/portfolioData";

const POSTS_PER_PAGE = 6;

export function NotesListFallback() {
  return (
    <div aria-hidden="true">
      <div className="rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-4 md:p-5">
        <Skeleton className="h-10 w-full" />
        <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
          {[0, 1, 2, 3, 4].map((index) => (
            <Skeleton key={index} className="h-8 w-20" />
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
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

interface NotesListSectionProps {
  page: number;
  filters: NotePostFilters;
}

export async function NotesListSection({ page, filters }: NotesListSectionProps) {
  const initialResult = await getNotesPage({
    page,
    pageSize: POSTS_PER_PAGE,
    filters,
  });

  return (
    <NotesPageContent
      initialPage={page}
      initialResult={initialResult}
      initialFilters={filters}
    />
  );
}
