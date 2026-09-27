"use client";

import { usePaginatedNotesPosts } from "@/hooks/useNotesPosts";
import type { NotePostFilters } from "@/lib/firebase/services/notesService";
import { NotesContentSkeleton } from "@/components/notes/NotesContentSkeleton";
import { NotesErrorState } from "@/components/notes/NotesErrorState";
import { NotesPostsList } from "@/components/notes/NotesPostsList";
import { NotesPagination } from "@/components/notes/NotesPagination";
import { NotesFilters } from "@/components/notes/NotesFilters";
import { PostsSummary } from "@/components/notes/PostsSummary";
import EmptyNotesState from "./EmptyNotesState";
import type { PaginatedNotesResult } from "@/types/PaginatedNotesResult";

const POSTS_PER_PAGE = 6;

interface NotesPageContentProps {
  initialPage: number;
  initialResult: PaginatedNotesResult;
  initialFilters: NotePostFilters;
}

export function NotesPageContent({
  initialPage,
  initialResult,
  initialFilters,
}: NotesPageContentProps) {
  const {
    data: notesResult,
    isLoading,
    error,
  } = usePaginatedNotesPosts(
    initialPage,
    POSTS_PER_PAGE,
    initialFilters,
    initialResult,
  );

  const extraQuery = [
    initialFilters.query?.trim() ? `q=${encodeURIComponent(initialFilters.query.trim())}` : "",
    initialFilters.tag?.trim() ? `tag=${encodeURIComponent(initialFilters.tag.trim())}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return (
    <>
      <NotesFilters
        initialFilters={initialFilters}
        allTags={notesResult?.allTags ?? initialResult.allTags ?? []}
        resultCount={notesResult?.totalCount ?? 0}
      />

          {isLoading && <NotesContentSkeleton />}
          {error && !isLoading && <NotesErrorState />}

          {!isLoading && !error && (
            <>
              <NotesPostsList posts={notesResult?.posts || []} />

              {(notesResult?.totalPages || 0) > 1 && (
                <NotesPagination
                  currentPage={notesResult?.currentPage || initialPage}
                  totalPages={notesResult?.totalPages || 1}
                  hasNextPage={notesResult?.hasNextPage || false}
                  hasPrevPage={notesResult?.hasPrevPage || false}
                  extraQuery={extraQuery}
                />
              )}

              {(notesResult?.totalCount || 0) > 0 && (
                <PostsSummary
                  currentPage={notesResult?.currentPage || initialPage}
                  totalPosts={notesResult?.totalCount || 0}
                  postsPerPage={POSTS_PER_PAGE}
                />
              )}
            </>
          )}

          {!isLoading && !error && (notesResult?.posts || []).length === 0 && (
            <EmptyNotesState />
          )}
    </>
  );
}
