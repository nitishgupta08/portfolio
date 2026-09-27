import dynamic from "next/dynamic";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getExperiences } from "@/lib/server/portfolioData";
import type { Experience as ExperienceType } from "@/types/Experience";

const AppMarkdown = dynamic(() => import("@/components/markdown/AppMarkdown"), {
  loading: () => (
    <span className="mt-3 block space-y-2" aria-hidden="true">
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-4/6" />
    </span>
  ),
});

export function ExperienceTimelineFallback() {
  return (
    <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-6" aria-hidden="true">
      {[0, 1].map((index) => (
        <Card key={index}>
          <CardContent className="p-4 sm:p-5 md:p-6">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="mt-3 h-6 w-1/2" />
            <Skeleton className="mt-2 h-4 w-1/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TimelineList({ experiences }: { experiences: ExperienceType[] }) {
  const visibleExperiences = experiences.filter((exp) => exp.isVisible);

  if (visibleExperiences.length === 0) {
    return (
      <Empty
        className="mt-10"
        title="No experiences are published yet"
        description="This section will be updated soon with recent work."
      />
    );
  }

  return (
    <ol className="relative mt-8 space-y-4 before:absolute before:bottom-4 before:left-[5px] before:top-4 before:hidden before:w-px before:bg-border/80 sm:mt-10 sm:space-y-6 sm:before:block">
      {visibleExperiences.map((item, index) => (
        <li key={item.id} className="relative sm:pl-10">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-7 hidden size-[11px] rounded-full border-2 sm:block",
              index === 0
                ? "border-primary bg-primary"
                : "border-muted-foreground/40 bg-background",
            )}
          />
          <Card
            className={
              index === 0
                ? "border-primary/30"
                : undefined
            }
          >
            <CardContent className="p-4 sm:p-5 md:p-6">
              <p className="editorial-kicker">
                {item.from} — {item.to}
                {index === 0 ? " · Current" : null}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                {item.designation}
              </h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {item.company}
              </p>
              <AppMarkdown
                content={item.description}
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              />
              {item.tags.length > 0 ? (
                <span className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge
                      key={`${item.id}-${tag}-${tagIndex}`}
                      variant="secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </span>
              ) : null}
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  );
}

export async function ExperienceTimeline() {
  const experiences = await getExperiences();

  return <TimelineList experiences={experiences} />;
}
