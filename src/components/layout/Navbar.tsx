"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Disc3, FolderCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export default function Navbar() {
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

        <nav className="flex items-center gap-2">
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "size-9 px-0",
            )}
            aria-label="Blog"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            <span className="sr-only">Blog</span>
          </Link>

          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "size-9 px-0",
            )}
            aria-label="Projects"
          >
            <FolderCode className="size-4" aria-hidden="true" />
            <span className="sr-only">Projects</span>
          </Link>

          <Link
            href="/listening"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "size-9 px-0",
            )}
            aria-label="Listening"
          >
            <Disc3 className="size-4" aria-hidden="true" />
            <span className="sr-only">Listening</span>
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
