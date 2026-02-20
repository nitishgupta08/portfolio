import Hero from "@/components/home/Hero";
import AboutMe from "@/components/home/AboutMe";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import { getExperiences, getListeningData, getProjects } from "@/lib/server/portfolioData";

export default async function Home() {
  const [projects, experiences, listeningData] = await Promise.all([
    getProjects(),
    getExperiences(),
    getListeningData(),
  ]);

  return (
    <div className="relative overflow-hidden">
      <Hero />
      <AboutMe listeningData={listeningData} />
      {/*<Skills />*/}
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}
