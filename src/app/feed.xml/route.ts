import { getNotesPage } from "@/lib/server/portfolioData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const revalidate = 3600;

function escapeXml(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function safePubDate(value: unknown): string {
  const time = typeof value === "string" ? Date.parse(value) : NaN;
  return Number.isNaN(time) ? new Date().toUTCString() : new Date(time).toUTCString();
}

export async function GET() {
  const { posts } = await getNotesPage({ page: 1, pageSize: 100 });
  const items = posts
    .filter((post) => typeof post.slug === "string" && typeof post.title === "string")
    .map(
      (post) => {
        const link = `${siteUrl}/notes/${encodeURIComponent(post.slug)}`;
        return `\n        <item>\n          <title>${escapeXml(post.title)}</title>\n          <link>${escapeXml(link)}</link>\n          <guid>${escapeXml(link)}</guid>\n          <description>${escapeXml(post.description)}</description>\n          <pubDate>${safePubDate(post.publishedAt)}</pubDate>\n        </item>`;
      },
    )
    .join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?>\n    <rss version="2.0">\n      <channel>\n        <title>Nitish Kumar Gupta — Notes</title>\n        <link>${escapeXml(`${siteUrl}/notes`)}</link>\n        <description>Notes on software, ideas, and experiments.</description>\n        <language>en</language>${items}\n      </channel>\n    </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
