"use client";

import Link from "next/link";
import { ArrowRight, FolderCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "@/components/home/ProjectCard";
import type { Project } from "@/types/Project";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const displayProjects = projects.filter((project) => project.isFeatured);

  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker">Projects</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Look what I built
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Projects that combine strong engineering foundations with practical
            user impact.
          </p>

          <div className="mt-10">
            {displayProjects.length > 0 ? (
              <>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {displayProjects.map((project) => (
                      <CarouselItem
                        key={project.id}
                        className="basis-[90%] sm:basis-1/2"
                      >
                        <ProjectCard project={project} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>

                <div className="mt-10 text-left">
                  <Button asChild>
                    <Link href="/projects">
                      <FolderCode className="mr-2 h-4 w-4" aria-hidden="true" />
                      View All Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Empty
                title="No featured projects yet"
                description="Featured projects will appear here once selected."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
