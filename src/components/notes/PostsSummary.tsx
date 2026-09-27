// components/PostsSummary.tsx
interface PostsSummaryProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
}

export function PostsSummary({
  currentPage,
  totalPosts,
  postsPerPage,
}: PostsSummaryProps) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, totalPosts);

  return (
    <div className="mt-8 text-center text-sm text-muted-foreground">
      Showing {startIndex + 1}-{endIndex} of {totalPosts} posts
    </div>
  );
}
