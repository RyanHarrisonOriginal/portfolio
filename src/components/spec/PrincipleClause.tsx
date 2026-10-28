export function PrincipleClause({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-t border-rule py-8 last:border-b sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8">
      <p className="pt-1 font-mono text-[11px] tracking-[0.14em] text-muted">{number}</p>
      <div>
        <h3 className="max-w-[28ch] font-serif text-2xl leading-snug tracking-[-0.02em] text-ink md:text-[1.7rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{body}</p>
      </div>
    </article>
  );
}
