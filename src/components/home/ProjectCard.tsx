"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import type { Project } from "@/types/Project";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AppMarkdown = dynamic(() => import("@/components/markdown/AppMarkdown"), {
  loading: () => (
    <span className="mt-3 block space-y-2" aria-hidden="true">
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-5/6" />
    </span>
  ),
});

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card transition-colors hover:border-primary/40">
      {project.imgSrc && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[calc(var(--radius)+2px)] border-b border-border/70 bg-muted">
          <Image
            src={project.imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="editorial-kicker">{project.date}</p>
        <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>

        <AppMarkdown
          content={project.description}
          className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-6">
          {project.liveLink && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" asChild className="flex-1">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live demo`}
                  >
                    View demo
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open the live demo in a new tab</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code`}
                >
                  <GithubIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  Code
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View source code on GitHub</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </article>
  );
}
