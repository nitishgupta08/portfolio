"use client";

import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ProjectsView = "grid" | "list";

export function ProjectsViewToggle({ view }: { view: ProjectsView }) {
  const router = useRouter();

  const changeView = (next: string) => {
    if (next === "grid" || next === "list") {
      router.replace(next === "grid" ? "/projects" : "/projects?view=list", {
        scroll: false,
      });
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={changeView}
      variant="outline"
      aria-label="Change projects layout"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="size-4" aria-hidden="true" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>Grid view</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="size-4" aria-hidden="true" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>List view</TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
}
