import { cache } from "react";
import type { BlogPost } from "@/types/BlogPost";
import type { PaginatedBlogResult } from "@/types/PaginatedBlogResult";
import type { Experience } from "@/types/Experience";
import type {
  ListeningData,
  ListeningDataExpanded,
  ListeningShowcaseData,
} from "@/types/LastFm";
import type { Project } from "@/types/Project";
import { BlogService } from "@/lib/firebase/services/blogService";
import { ExperienceService } from "@/lib/firebase/services/experienceService";
import { ProjectService } from "@/lib/firebase/services/projectService";
import {
  getListeningData as getListeningDataFromLastFm,
  getListeningDataExpanded as getListeningDataExpandedFromLastFm,
  getListeningShowcase as getListeningShowcaseFromLastFm,
} from "@/lib/server/lastfm";

interface BlogPageParams {
  page: number;
  pageSize: number;
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const projects = await ProjectService.getAllProjects();
  return projects.filter((project) => project.isVisible);
});

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const experiences = await ExperienceService.getAllExperiences();
  return experiences.filter((experience) => experience.isVisible);
});

export const getListeningData = cache(async (): Promise<ListeningData | null> => {
  return getListeningDataFromLastFm();
});

export const getListeningDataExpanded = cache(
  async (): Promise<ListeningDataExpanded | null> => {
    return getListeningDataExpandedFromLastFm();
  },
);

export const getListeningShowcase = cache(
  async (): Promise<ListeningShowcaseData | null> => {
    return getListeningShowcaseFromLastFm();
  },
);

export async function getBlogPage({
  page,
  pageSize,
}: BlogPageParams): Promise<PaginatedBlogResult> {
  return BlogService.getPaginatedBlogPosts(page, pageSize);
}

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  return BlogService.getBlogPostBySlug(slug);
});
