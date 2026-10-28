import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DiagramSlot } from "@/components/spec/DiagramSlot";
import { DocRail } from "@/components/spec/DocRail";
import { MetaBlock } from "@/components/spec/MetaBlock";
import { StatusBadge } from "@/components/spec/StatusBadge";
import { proseComponents } from "@/components/mdx/prose";
import { specOutline } from "@/lib/project-meta";
import { getProject, getProjects } from "@/lib/projects";
import { frame } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return { title: project.name, description: project.purpose };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sheet = String(project.order).padStart(2, "0");

  return (
    <article className={`${frame} py-12 md:py-16`}>
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="border-b border-transparent hover:border-accent">
            Index
          </Link>
          <span className="mx-2 text-rule">/</span>
          Sheet {sheet}
          {project.draft && (
            <>
              <span className="mx-2 text-rule">/</span>
              Rev A0 · Draft copy
            </>
          )}
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-5xl leading-none tracking-[-0.03em] text-ink md:text-7xl">
            {project.name}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-6 max-w-[36rem] font-serif text-2xl leading-snug text-ink md:text-[1.7rem]">
          {project.purpose}
        </p>
        <MetaBlock project={project} />
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <DocRail items={specOutline.map(({ id, number, title }) => ({ id, number, title }))} />
        <div className="min-w-0">
          {specOutline.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-t border-rule py-10"
            >
              <h2 className="font-serif text-3xl tracking-tight text-ink">
                <span className="mr-3 font-mono text-[11px] tracking-[0.16em] text-muted">
                  {section.number}
                </span>
                {section.title}
              </h2>
              {section.id === "invariant" && (
                <p className="mt-6 max-w-[34rem] font-serif text-2xl italic leading-snug text-ink">
                  {project.invariant}
                </p>
              )}
              <div className="mt-6 max-w-[65ch]">
                <MDXRemote source={project.sections[section.key]} components={proseComponents} />
              </div>
              {section.id === "architecture" && <DiagramSlot />}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
