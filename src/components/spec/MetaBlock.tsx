import { TextLink } from "@/components/spec/TextLink";
import { statusLabel, type Project } from "@/lib/project-meta";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</dt>
      <dd className="mt-1.5 font-mono text-xs leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export function MetaBlock({ project }: { project: Project }) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 sm:grid-cols-4">
      <Field label="Status">{statusLabel[project.status]}</Field>
      <Field label="Role">{project.role}</Field>
      <Field label="Timeline">{project.timeline}</Field>
      <Field label="Link">
        {project.links.length === 0 ? (
          "—"
        ) : (
          <span className="flex flex-col items-start gap-1.5">
            {project.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </span>
        )}
      </Field>
      <div className="col-span-2 sm:col-span-4">
        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Stack</dt>
        <dd className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink">
          {project.stack.length === 0 ? "—" : project.stack.join("  ·  ")}
        </dd>
      </div>
    </dl>
  );
}
