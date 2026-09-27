export interface NotePost {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  views?: number;
  tags: string[];
  isPublished?: boolean;
  isDraft?: boolean;
  readTime?: number;
  createdAt?: string;
  updatedAt?: string;
}
