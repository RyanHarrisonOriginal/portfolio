import Link from "next/link";
import { SectionLabel } from "@/components/spec/SectionLabel";
import { frame } from "@/lib/site";
import { formatSheetDate, type Essay } from "@/lib/writing";

function Row({ essay }: { essay: Essay }) {
  const date = essay.date ? formatSheetDate(essay.date) : "—";
  const minutes = essay.minutes ? `${essay.minutes} min` : "—";
  const className =
    "grid grid-cols-1 gap-1 border-t border-rule py-5 last:border-b sm:grid-cols-[8.5rem_4.5rem_minmax(0,1fr)_7rem] sm:items-baseline sm:gap-4";

  const body = (
    <>
      <span className="font-mono text-[11px] tracking-[0.12em] text-muted">{date}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{minutes}</span>
      <span className={`font-serif text-[1.35rem] leading-snug ${essay.href ? "text-ink" : "text-muted"}`}>
        <span className="relative">
          {essay.title}
          {essay.href && (
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
            />
          )}
        </span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-right">
        {essay.forthcoming ? "Forthcoming" : "Essay"}
      </span>
    </>
  );

  if (!essay.href) {
    return <div className={className}>{body}</div>;
  }

  return (
    <Link href={essay.href} className={`group ${className}`}>
      {body}
    </Link>
  );
}

export function Writing({ essays }: { essays: Essay[] }) {
  return (
    <section id="writing" className={`${frame} scroll-mt-28 py-16 md:py-24`}>
      <SectionLabel index="03" title="Writing" />
      <div>
        {essays.map((essay) => (
          <Row key={essay.title} essay={essay} />
        ))}
      </div>
    </section>
  );
}
