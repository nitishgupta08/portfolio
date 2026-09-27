import { ImageResponse } from "next/og";
import { getNotePost } from "@/lib/server/portfolioData";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OpengraphImageProps {
  params: Promise<{ slug: string }>;
}

export default async function NotesOpengraphImage({ params }: OpengraphImageProps) {
  const { slug } = await params;
  const post = await getNotePost(slug);

  const title = post?.title ?? "Notes Post";
  const description = post?.description ?? "";
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              marginBottom: 24,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {title.length > 80 ? title.slice(0, 80) + "..." : title}
          </div>
          <div
            style={{
              fontSize: 24,
              opacity: 0.7,
              textAlign: "center",
              marginBottom: 32,
              lineHeight: 1.4,
            }}
          >
            {description.length > 120 ? description.slice(0, 120) + "..." : description}
          </div>
          <div
            style={{
              fontSize: 18,
              opacity: 0.5,
            }}
          >
            {date}
          </div>
        </div>
      </div>
    ),
    size
  );
}
