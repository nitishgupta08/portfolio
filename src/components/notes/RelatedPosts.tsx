import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { getNotesPage } from "@/lib/server/portfolioData";
import { getReadingTime } from "@/lib/notesReadingTime";
import type { NotePost } from "@/types/NotePost";

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
}

export async function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  if (tags.length === 0) return null;

  const relatedPosts = await findRelatedPosts(currentSlug, tags);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">Related notes</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <RelatedPostCard key={post.id ?? post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

function RelatedPostCard({ post }: { post: NotePost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/notes/${post.slug}`}>
          <h3 className="text-xl font-bold hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight mt-3">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <span>{getReadingTime(post)} min read</span>
        </div>
      </CardContent>
    </Card>
  );
}

async function findRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): Promise<NotePost[]> {
  const notesPage = await getNotesPage({ page: 1, pageSize: 50 });
  const candidates = notesPage.posts.filter((post) => post.slug !== currentSlug);

  const scored = candidates.map((post) => {
    const sharedTags = post.tags.filter((tag) => tags.includes(tag));
    return { post, score: sharedTags.length };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  return scored
    .filter((entry) => entry.score > 0)
    .slice(0, limit)
    .map((entry) => entry.post);
}
