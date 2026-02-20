import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import AboutListening from "@/components/home/AboutListening";
import type { ListeningData } from "@/types/LastFm";

interface AboutMeProps {
  listeningData?: ListeningData | null;
}

export default function AboutMe({ listeningData }: AboutMeProps) {
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
            in backend development, primarily using C/C++ and Django. I focus on
            building scalable, high-performance systems with robust technical
            foundations. While my professional expertise lies in backend
            technologies, I have also explored frontend development through
            personal side projects.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            When I’m not with my laptop, I enjoy exploring new places, enjoying
            great stories in theatres or in video games, experimenting in the
            kitchen, and staying active with sports & gym.
          </p>
          <Badge variant="secondary" className="mt-4 w-fit">
            <MapPin className="size-3.5" aria-hidden="true" />
            Delhi, India
          </Badge>

          <AboutListening
            status={listeningData?.status}
            tracks={listeningData?.tracks}
            topArtists={listeningData?.topArtists}
            profileUrl={listeningData?.profileUrl}
          />
        </div>
      </div>
    </section>
  );
}
