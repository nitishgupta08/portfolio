import Link from "next/link";
import { ArrowDown, ArrowRight, FolderCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { isFeatureEnabled } from "@/lib/features";

export default function Hero() {
  return (
    <section className="section-shell pt-20 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl py-14 md:py-20">
          <p className="editorial-kicker">hey! I&apos;m</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Nitish Kumar Gupta
          </h1>

          <ButtonGroup className="mt-10 flex-col items-stretch sm:flex-row sm:items-center">
            {isFeatureEnabled("projects") ? (
              <Button asChild className="w-full sm:w-auto sm:min-w-40">
                <Link href="/projects">
                  <FolderCode className="mr-2 h-4 w-4" />
                  Selected work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href="#socials">
                Find me online
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
}
