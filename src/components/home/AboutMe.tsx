import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Disc3, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker">About</p>
          <h2 className="mt-4 text-3xl font-semibold italic tracking-tight md:text-5xl">
            &ldquo;Stay hungry. Stay foolish&rdquo;
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            I am a software engineer with two years of experience specializing
            in backend development, primarily using C/C++ and Python. I focus on
            building scalable, high-performance systems with robust technical
            foundations. While my professional expertise lies in backend
            technologies, I have also explored frontend development through
            personal side projects.
          </p>
          <Badge variant="secondary" className="mt-4 w-fit">
            <MapPin className="size-3.5" aria-hidden="true" />
            Delhi, India
          </Badge>

          <div className="mt-6">
            <Button asChild>
              <Link
                href="/listening"
                aria-label="Open listening dashboard"
                className="inline-flex items-center gap-2"
              >
                <Disc3 className="size-4" aria-hidden="true" />
                View listening activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
