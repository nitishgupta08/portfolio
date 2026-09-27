"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Camera, Disc3, FolderCode } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isFeatureEnabled } from "@/lib/features";
import { buttonVariants } from "@/components/ui/button";
import { ThemePicker } from "../theme/ThemePicker";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    ...(isFeatureEnabled("projects")
      ? [{ href: "/projects", label: "Projects", icon: FolderCode }]
      : []),
    ...(isFeatureEnabled("notes")
      ? [{ href: "/notes", label: "Notes", icon: BookOpen }]
      : []),
    ...(isFeatureEnabled("gallery")
      ? [{ href: "/gallery", label: "Gallery", icon: Camera }]
      : []),
    ...(isFeatureEnabled("listening")
      ? [{ href: "/listening", label: "Listening", icon: Disc3 }]
      : []),
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-85"
        >
          <Image
            src="/logo.svg"
            alt="Nitish Kumar Gupta"
            width={120}
            height={32}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-1" aria-label="Primary navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "gap-1.5 px-2 sm:px-2.5",
                      isActive && "bg-secondary text-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="hidden text-xs sm:inline">{label}</span>
                    <span className="sr-only sm:hidden">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">{label}</TooltipContent>
              </Tooltip>
            );
          })}

          <ThemePicker />
        </nav>
      </div>
    </header>
  );
}
