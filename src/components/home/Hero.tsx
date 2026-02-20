import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Hero() {
  return (
    <section className="section-shell pt-20 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl py-14 md:py-20">
          <p className="editorial-kicker">hey! I&apos;m</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Nitish Kumar Gupta
          </h1>

          <ButtonGroup className="mt-10">
            <Button asChild size="lg" className="min-w-40">
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-40">
              <Link href="/blog">
                Read Blog
                <FileText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
}
