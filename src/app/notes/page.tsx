import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotesHeaderShell } from "@/components/notes/NotesHeaderShell";
import { NotesListFallback, NotesListSection } from "@/components/notes/NotesListSection";
import { isFeatureEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "Notes - Nitish Gupta",
  description:
    "Read my latest thoughts on web development, technology, and programming.",
};

interface NotesPageProps {
  searchParams: Promise<{ page?: string; q?: string; tag?: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  if (!isFeatureEnabled("notes")) {
    notFound();
  }
  const resolvedSearchParams = await searchParams;
  const parsedPage = Number(resolvedSearchParams.page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
  const filters = {
    query: resolvedSearchParams.q?.trim() ? resolvedSearchParams.q.trim() : undefined,
    tag: resolvedSearchParams.tag?.trim() ? resolvedSearchParams.tag.trim() : undefined,
  };

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <NotesHeaderShell />
          <Suspense fallback={<NotesListFallback />}>
            <NotesListSection page={currentPage} filters={filters} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
