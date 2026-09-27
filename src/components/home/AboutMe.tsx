import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Disc3, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getRandomQuote } from "@/lib/server/portfolioData";
import { isFeatureEnabled } from "@/lib/features";

function QuoteFallback() {
  return (
    <span className="block" aria-hidden="true">
      <Skeleton className="mt-4 h-9 w-4/5 md:h-12" />
      <Skeleton className="mt-3 h-4 w-40" />
    </span>
  );
}

async function QuoteBlock() {
  const quote = await getRandomQuote();

  return (
    <blockquote>
      <h2 className="mt-4 text-3xl font-semibold italic tracking-tight md:text-5xl">
        &ldquo;{quote.text}&rdquo;
      </h2>
      {quote.author ? (
        <p className="mt-3 text-sm font-medium tracking-wide text-muted-foreground">
          — {quote.author}
          {quote.source ? `, ${quote.source}` : null}
        </p>
      ) : null}
    </blockquote>
  );
}

export default function AboutMe() {

  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker editorial-kicker--lg">About</p>
          {isFeatureEnabled("quotes") ? (
            <Suspense fallback={<QuoteFallback />}>
              <QuoteBlock />
            </Suspense>
          ) : null}
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            I am a software engineer with two years of experience specializing
            in backend development, primarily using C/C++ and Python. I focus on
            building scalable, high-performance systems with robust technical
            foundations. While my professional expertise lies in backend
            technologies, I have also explored frontend development through
            personal side projects.
          </p>
          <Badge variant="secondary" className="mt-6 w-fit">
            <MapPin className="size-3.5" aria-hidden="true" />
            Delhi, India
          </Badge>

          {isFeatureEnabled("listening") ? (
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
