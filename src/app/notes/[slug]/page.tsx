import { Suspense, cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBodyFallback, PostBodySection, PostShell } from "@/components/notes/PostSection";
import { getNotePost } from "@/lib/server/portfolioData";
import { isFeatureEnabled } from "@/lib/features";

interface NotePostPageProps {
  params: Promise<{ slug: string }>;
}

const getCachedNotePost = cache(async (slug: string) => getNotePost(slug));

export async function generateMetadata({
  params,
}: NotePostPageProps): Promise<Metadata> {
  if (!isFeatureEnabled("notes")) {
    return {
      title: "Notes Post Not Found",
    };
  }
  const { slug } = await params;
  const notes = await getCachedNotePost(slug);

  if (!notes) {
    return {
      title: "Notes Post Not Found",
    };
  }

  return {
    title: `${notes.title} - Nitish Gupta`,
    description: notes.description,
    alternates: {
      canonical: `/notes/${notes.slug}`,
    },
    openGraph: {
      type: "article",
      title: notes.title,
      description: notes.description,
      publishedTime: notes.publishedAt,
      authors: ["Nitish Kumar Gupta"],
      images: notes.coverImage ? [notes.coverImage] : ["/logo.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: notes.title,
      description: notes.description,
      images: notes.coverImage ? [notes.coverImage] : ["/logo.svg"],
    },
  };
}

export default async function NotePostPage({ params }: NotePostPageProps) {
  if (!isFeatureEnabled("notes")) {
    notFound();
  }
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PostShell />
          <Suspense fallback={<PostBodyFallback />}>
            <PostBodySection slug={slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
