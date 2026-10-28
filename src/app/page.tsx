import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Principles } from "@/components/home/Principles";
import { Systems } from "@/components/home/Systems";
import { Writing } from "@/components/home/Writing";
import { getProjects } from "@/lib/projects";
import { getEssays } from "@/lib/writing";

export default function Page() {
  const projects = getProjects();
  const nodes = projects.map((project) => ({
    slug: project.slug,
    name: project.name,
    graphLabel: project.graphLabel,
    status: project.status,
    stack: project.stack,
    invariant: project.invariant,
  }));

  return (
    <>
      <Hero nodes={nodes} />
      <Systems projects={projects} />
      <Principles />
      <Writing essays={getEssays()} />
      <Contact />
    </>
  );
}
