import { cache } from "react";
import type { NotePost } from "@/types/NotePost";
import type { PaginatedNotesResult } from "@/types/PaginatedNotesResult";
import type { Experience } from "@/types/Experience";
import type {
  ListeningShowcaseData,
} from "@/types/LastFm";
import type { Project } from "@/types/Project";
import type { Quote } from "@/types/Quote";
import type { Photo } from "@/types/Gallery";
import { NotesService, type NotePostFilters } from "@/lib/firebase/services/notesService";
import { ExperienceService } from "@/lib/firebase/services/experienceService";
import { ProjectService } from "@/lib/firebase/services/projectService";
import { QuoteService } from "@/lib/firebase/services/quoteService";
import { GalleryService } from "@/lib/firebase/services/galleryService";
import {
  getListeningShowcase as getListeningShowcaseFromLastFm,
} from "@/lib/server/lastfm";

interface NotesPageParams {
  page: number;
  pageSize: number;
  filters?: NotePostFilters;
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const projects = await ProjectService.getAllProjects();
  return projects.filter((project) => project.isVisible);
});

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const experiences = await ExperienceService.getAllExperiences();
  return experiences.filter((experience) => experience.isVisible);
});

export async function getListeningShowcase(): Promise<ListeningShowcaseData | null> {
  return getListeningShowcaseFromLastFm();
}

export async function getNotesPage({
  page,
  pageSize,
  filters,
}: NotesPageParams): Promise<PaginatedNotesResult> {
  return NotesService.getPaginatedNotePosts(page, pageSize, filters);
}

export const getNotePost = cache(async (slug: string): Promise<NotePost | null> => {
  return NotesService.getNotePostBySlug(slug);
});

export async function getRandomQuote(): Promise<Quote> {
  return QuoteService.getRandomQuote();
}

export async function getGalleryPhotos(): Promise<Photo[]> {
  return GalleryService.getVisiblePhotos();
}
