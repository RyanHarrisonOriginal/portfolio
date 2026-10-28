import { SectionLabel } from "@/components/spec/SectionLabel";
import { SpecCard } from "@/components/spec/SpecCard";
import type { Project } from "@/lib/project-meta";
import { frame } from "@/lib/site";

export function Systems({ projects }: { projects: Project[] }) {
  return (
    <section id="systems" className={`${frame} scroll-mt-28 py-16 md:py-24`}>
      <SectionLabel index="01" title="Systems" />
      <p className="mb-10 max-w-[34rem] font-serif text-[1.65rem] leading-snug text-ink">
        Each system states a purpose and the invariant it is willing to be held to.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <SpecCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
