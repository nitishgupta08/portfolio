import Hero from "@/components/home/Hero";
import AboutMe from "@/components/home/AboutMe";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import NotesPreview from "@/components/home/NotesPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import { isFeatureEnabled } from "@/lib/features";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <AboutMe />
      {isFeatureEnabled("experiences") && <Experience />}
      {isFeatureEnabled("projects") && <Projects />}
      {isFeatureEnabled("notes") && <NotesPreview />}
      {isFeatureEnabled("gallery") && <GalleryPreview />}
    </div>
  );
}
