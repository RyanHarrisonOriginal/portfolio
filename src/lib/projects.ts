import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  projectStatuses,
  type Project,
  type ProjectStatus,
} from "@/lib/project-meta";

export type { Project, ProjectLink, ProjectSections, ProjectStatus } from "@/lib/project-meta";
export { projectStatuses, specOutline, statusLabel } from "@/lib/project-meta";

const contentDir = path.join(process.cwd(), "content", "projects");

function asString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: missing ${field}`);
  }
  return value.trim();
}

function parseProject(data: Record<string, unknown>, file: string): Project {
  const status = data.status;
  if (typeof status !== "string" || !projectStatuses.includes(status as ProjectStatus)) {
    throw new Error(`${file}: status must be live, in-development, or research`);
  }

  const stack = Array.isArray(data.stack) ? data.stack.map(String) : [];
  const links = Array.isArray(data.links)
    ? data.links.map((link) => {
        const item = link as { label?: unknown; href?: unknown };
        return { label: String(item.label ?? ""), href: String(item.href ?? "") };
      })
    : [];

  return {
    slug: asString(data.slug, "slug", file),
    name: asString(data.name, "name", file),
    graphLabel: asString(data.graphLabel, "graphLabel", file),
    status: status as ProjectStatus,
    order: typeof data.order === "number" ? data.order : Number(data.order ?? 0),
    role: asString(data.role, "role", file),
    timeline: asString(data.timeline, "timeline", file),
    purpose: asString(data.purpose, "purpose", file),
    invariant: asString(data.invariant, "invariant", file),
    stack,
    links: links.filter((link) => link.href && link.label),
    draft: data.draft !== false,
    sections: {
      problem: asString(data.problem, "problem", file),
      invariant: asString(data.invariantBody, "invariantBody", file),
      contracts: asString(data.contracts, "contracts", file),
      architecture: asString(data.architecture, "architecture", file),
      failureModes: asString(data.failureModes, "failureModes", file),
      outcome: asString(data.outcome, "outcome", file),
      change: asString(data.change, "change", file),
    },
  };
}

export function getProjects(): Project[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
      const { data } = matter(raw);
      return parseProject(data as Record<string, unknown>, file);
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}
