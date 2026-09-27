"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock } from "lucide-react";
import { useNotePost } from "@/hooks/useNotesPosts";
import dynamic from "next/dynamic";

const AppMarkdown = dynamic(() => import("@/components/markdown/AppMarkdown"), {
  loading: () => <NotesArticleSkeleton />,
});
import ViewCounter from "./ViewCounter";
import { NotesShareButton } from "./NotesShareButton";
import { NotesTableOfContents } from "./NotesTableOfContents";
import { RelatedPosts } from "./RelatedPosts";
import { getReadingTime } from "@/lib/notesReadingTime";
import type { NotePost } from "@/types/NotePost";

interface NotePostContentProps {
  slug: string;
  initialNotes: NotePost;
}

export function NotePostContent({ slug, initialNotes }: NotePostContentProps) {
  const { data: notes, isLoading, error } = useNotePost(slug, initialNotes);

  // Use cached data or fall back to initial/server data
  const displayNotes = notes || initialNotes;

  if (error && !displayNotes) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Error Loading Notes Post
            </h1>
            <p className="text-muted-foreground mb-6">
              Unable to load this notes post. Please try again later.
            </p>
            <Button variant="outline" asChild>
              <Link href="/notes">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Back to Notes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Notes Header */}
          <header className="space-y-6 mb-12">
            {/* Cover Image */}
            {displayNotes.coverImage && (
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src={displayNotes.coverImage}
                  alt={displayNotes.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            )}

            {/* Title and Metadata */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {displayNotes.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {displayNotes.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {displayNotes.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{formatDate(displayNotes.publishedAt)}</span>
                </div>

                <Suspense fallback={<Skeleton className="h-4 w-20" />}>
                  <ViewCounter
                    slug={displayNotes.slug}
                    initialViews={displayNotes.views ?? 0}
                  />
                </Suspense>

                <span>{getReadingTime(displayNotes)} min read</span>
              </div>
            </div>

            <Separator />
          </header>

          {/* Notes Content + table of contents */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
            <main className="prose prose-lg dark:prose-invert max-w-none min-w-0">
              {isLoading && !displayNotes.content ? (
                <NotesArticleSkeleton />
              ) : (
                <AppMarkdown content={displayNotes.content} />
              )}
            </main>
            <NotesTableOfContents contentKey={`${displayNotes.slug}-${displayNotes.content.length}`} />
          </div>
          {/* Navigation Footer */}
          <footer className="mt-16 pt-8 border-t">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/notes">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  All Posts
                </Link>
              </Button>

              <NotesShareButton title={displayNotes.title} />
            </div>
          </footer>

          <RelatedPosts currentSlug={displayNotes.slug} tags={displayNotes.tags} />
        </>
      );
    }

// Helper function
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Notes Content Skeleton Component
function NotesArticleSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-6 w-full mt-8" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mt-6">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
