import Link from "next/link";
import { RegistrationMarks } from "@/components/spec/RegistrationMarks";
import { Reveal } from "@/components/spec/Reveal";
import { StatusBadge } from "@/components/spec/StatusBadge";
import type { Project } from "@/lib/project-meta";

export function SpecCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={Math.min(index, 4) * 0.05} className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col border border-rule bg-paper p-5 transition-colors duration-300 hover:border-line focus-visible:border-accent sm:p-6"
      >
        <RegistrationMarks />
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[1.65rem] leading-none tracking-[-0.02em] text-ink">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed text-ink">{project.purpose}</p>
        <div className="mt-6 border-t border-rule pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Invariant</p>
          <p className="mt-2 font-serif text-lg italic leading-snug text-ink">{project.invariant}</p>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.map((tag) => (
              <li
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="relative shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
            Spec
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
