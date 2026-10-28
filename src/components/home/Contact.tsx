import { TextLink } from "@/components/spec/TextLink";
import { SectionLabel } from "@/components/spec/SectionLabel";
import { frame, site } from "@/lib/site";

const rows: { label: string; href?: string; value: string; forthcoming?: boolean }[] = [
  {
    label: "Email",
    href: site.email ? `mailto:${site.email}` : undefined,
    value: site.email || "Forthcoming",
    forthcoming: !site.email,
  },
  { label: "GitHub", href: site.github, value: site.githubLabel },
  { label: "LinkedIn", href: site.linkedin, value: site.linkedinLabel },
];

export function Contact() {
  return (
    <section id="contact" className={`${frame} scroll-mt-28 py-16 md:py-24`}>
      <SectionLabel index="04" title="Contact" />
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-t border-rule py-4 last:border-b sm:grid-cols-[8rem_minmax(0,1fr)]"
          >
            <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {row.label}
            </dt>
            <dd className="min-w-0 text-sm">
              {row.href ? (
                <TextLink href={row.href}>{row.value}</TextLink>
              ) : (
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{row.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
