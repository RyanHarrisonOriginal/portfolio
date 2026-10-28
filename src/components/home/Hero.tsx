import { LineageGraph, type LineageNode } from "@/components/spec/LineageGraph";
import { frame, site } from "@/lib/site";

export function Hero({ nodes }: { nodes: LineageNode[] }) {
  return (
    <section className={`${frame} grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-12 lg:py-20`}>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Sheet 00
          <span className="mx-2 text-rule">/</span>
          Index
        </p>
        <h1 className="mt-6 font-serif text-[3.5rem] leading-[0.9] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[5.15rem]">
          Ryan
          <br />
          Harrison
        </h1>
        <p className="mt-8 max-w-[14em] font-serif text-[1.7rem] leading-[1.25] tracking-[-0.02em] text-ink md:text-[1.9rem]">
          {site.statement}
        </p>
        <p className="mt-6 max-w-[26em] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted">
          {site.subline}
        </p>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {site.identities.map((item, index) => (
            <span key={item}>
              {index > 0 && <span className="mx-2 text-rule">/</span>}
              {item}
            </span>
          ))}
        </p>
      </div>
      <div className="min-w-0">
        <LineageGraph nodes={nodes} />
      </div>
    </section>
  );
}
