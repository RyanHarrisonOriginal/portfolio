"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; number: string; title: string };

export function DocRail({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
      <p className="mb-3 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted lg:block">
        Contents
      </p>
      <ol className="flex gap-4 overflow-x-auto border-b border-rule pb-3 lg:block lg:space-y-1 lg:overflow-visible lg:border-0 lg:pb-0">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id} className="shrink-0 lg:shrink">
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "group flex items-baseline gap-3 border-l-2 py-1 pl-3 font-mono text-[11px] uppercase tracking-[0.12em]",
                  current ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink",
                )}
              >
                <span className="shrink-0">{item.number}</span>
                <span className="whitespace-nowrap tracking-[0.04em] normal-case lg:whitespace-normal lg:leading-snug">
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
