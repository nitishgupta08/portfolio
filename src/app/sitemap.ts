import type { MetadataRoute } from "next";

import { getNotesPage, getProjects } from "@/lib/server/portfolioData";
import { isFeatureEnabled } from "@/lib/features";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Crawlers hit this often — cache for an hour instead of re-scanning
// Firestore on every request.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectsEnabled = isFeatureEnabled("projects");
  const notesEnabled = isFeatureEnabled("notes");
  const [projects, notesPage] = await Promise.all([
    projectsEnabled ? getProjects() : Promise.resolve([]),
    notesEnabled
      ? getNotesPage({ page: 1, pageSize: 100 })
      : Promise.resolve({ posts: [] }),
  ]);
  const staticRoutes = [
    "",
    ...(projectsEnabled ? ["/projects"] : []),
    ...(notesEnabled ? ["/notes"] : []),
    ...(isFeatureEnabled("listening") ? ["/listening"] : []),
    ...(isFeatureEnabled("gallery") ? ["/gallery"] : []),
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects#${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: project.isFeatured ? 0.8 : 0.6,
    })),
    ...notesPage.posts.map((post) => ({
      url: `${siteUrl}/notes/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: post.coverImage ? [post.coverImage] : [],
    })),
  ];
}
