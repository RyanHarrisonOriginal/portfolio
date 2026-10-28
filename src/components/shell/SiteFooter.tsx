import { frame, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className={`${frame} py-8`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Colophon</p>
        <div className="mt-3 space-y-1 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ink">
          <p>{site.fonts.join(" · ")}</p>
          <p>{site.stack.join(" · ")}</p>
          <p>{site.colophon}</p>
        </div>
      </div>
    </footer>
  );
}
