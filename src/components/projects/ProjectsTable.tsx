"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Project } from "@/types/Project";

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {projects.length} {projects.length === 1 ? "project" : "projects"}
      </p>
      <Table className="mt-2">
        <TableHeader>
          <TableRow className="border-b border-border/80 hover:bg-transparent">
            <TableHead className="editorial-kicker h-auto pb-3 pl-0 pr-4">
              Project
            </TableHead>
            <TableHead className="editorial-kicker hidden h-auto pb-3 md:table-cell">
              Stack
            </TableHead>
            <TableHead className="editorial-kicker h-auto pb-3 pr-0 text-right">
              Links
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              id={project.slug}
              className="scroll-mt-24 border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
            >
              <TableCell className="py-4 pl-0 pr-4 align-top">
                <p className="text-lg font-semibold leading-tight tracking-tight">
                  {project.title}
                  {project.isFeatured ? (
                    <Badge variant="outline" className="ml-2 align-middle text-xs font-normal">
                      Featured
                    </Badge>
                  ) : null}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{project.date}</p>
                <span className="mt-2.5 flex flex-wrap gap-1.5 md:hidden">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 ? (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{project.tags.length - 3}
                    </Badge>
                  ) : null}
                </span>
              </TableCell>
              <TableCell className="hidden max-w-xs align-top px-4 py-4 md:table-cell">
                <span className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </span>
              </TableCell>
              <TableCell className="py-4 pl-4 pr-0 align-top">
                <span className="flex items-center justify-end gap-1">
                  {project.liveLink ? (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live demo`}
                      >
                        Demo
                        <ArrowUpRight className="ml-1 size-3.5" aria-hidden="true" />
                      </a>
                    </Button>
                  ) : null}
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code`}
                    >
                      <GithubIcon className="mr-1.5 size-3.5" aria-hidden="true" />
                      Code
                    </a>
                  </Button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
