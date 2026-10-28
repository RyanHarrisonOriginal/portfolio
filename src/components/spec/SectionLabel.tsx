export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2 className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink">
        § {index}
        <span className="mx-2 text-muted">/</span>
        {title}
      </h2>
      <div className="relative h-px flex-1 bg-rule" aria-hidden="true">
        <span className="absolute -top-[3px] right-0 h-[7px] w-px bg-ink" />
        <span className="absolute -top-[2px] right-3 h-[5px] w-px bg-line" />
        <span className="absolute -top-px right-6 h-[3px] w-px bg-rule" />
      </div>
    </div>
  );
}
