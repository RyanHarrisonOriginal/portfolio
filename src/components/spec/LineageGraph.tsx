"use client";

import { useRef, useState } from "react";
import type { FocusEvent, MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { StatusMark } from "@/components/spec/StatusBadge";
import { RegistrationMarks } from "@/components/spec/RegistrationMarks";
import { statusLabel, type ProjectStatus } from "@/lib/project-meta";
import {
  edgeGeometry,
  lineageEdges,
  lineageLayout,
  lineageView,
  neighborSlug,
  pipelineOrder,
  traceLineage,
} from "@/lib/lineage";
import { cn } from "@/lib/utils";

export type LineageNode = {
  slug: string;
  name: string;
  graphLabel: string;
  status: ProjectStatus;
  stack: string[];
  invariant: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function LineageGraph({ nodes }: { nodes: LineageNode[] }) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion() === true;
  const frameRef = useRef<HTMLElement>(null);
  const bySlug = new Map(nodes.map((node) => [node.slug, node]));
  const trace = active ? traceLineage(active) : null;
  const activeNode = active ? bySlug.get(active) : undefined;

  function release(next: EventTarget | null) {
    if (!(next instanceof Node) || !frameRef.current?.contains(next)) {
      setActive(null);
    }
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLAnchorElement>,
    slug: string,
    mode: "desktop" | "mobile",
  ) {
    const next = neighborSlug(slug, event.key, mode);
    if (!next) return;
    event.preventDefault();
    const prefix = mode === "desktop" ? "lineage-node" : "lineage-row";
    document.getElementById(`${prefix}-${next}`)?.focus();
  }

  return (
    <figure
      ref={frameRef}
      className="relative border border-rule bg-paper"
      onMouseLeave={(event: MouseEvent<HTMLElement>) => release(event.relatedTarget)}
    >
      <RegistrationMarks />
      <p className="sr-only">
        Project lineage. Select a system to trace what feeds it and what it feeds. Arrow keys move
        between systems. Each system opens its spec.
      </p>
      <figcaption className="flex items-center justify-between gap-4 border-b border-rule px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>Fig. 01 / Lineage</span>
        <span>Directed</span>
      </figcaption>

      <div
        className="relative hidden lg:block"
        role="group"
        aria-label="Project lineage"
        style={{ aspectRatio: `${lineageView.w} / ${lineageView.h}` }}
      >
        <svg
          viewBox={`0 0 ${lineageView.w} ${lineageView.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {lineageEdges.map((edge, index) => {
            const geometry = edgeGeometry(edge);
            if (!geometry) return null;
            const hot = trace?.edges.has(edge.id) ?? false;
            const dim = Boolean(trace) && !hot;
            return (
              <g key={edge.id} className={cn(hot ? "text-accent" : "text-line", dim && "opacity-25")}>
                <motion.path
                  d={geometry.d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.7,
                    delay: reduce ? 0 : index * 0.18,
                    ease,
                  }}
                />
                <motion.path
                  d={`M ${geometry.x2 - 9} ${geometry.y2 - 3.5} L ${geometry.x2 - 1} ${geometry.y2} L ${geometry.x2 - 9} ${geometry.y2 + 3.5}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.18,
                    delay: reduce ? 0 : index * 0.18 + 0.55,
                    ease: "easeOut",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => {
          const box = lineageLayout[node.slug];
          if (!box) return null;
          const related = trace ? trace.nodes.has(node.slug) : false;
          const selected = active === node.slug;
          return (
            <Link
              key={node.slug}
              id={`lineage-node-${node.slug}`}
              href={`/projects/${node.slug}`}
              aria-label={`${node.name}. ${statusLabel[node.status]}. ${node.invariant}`}
              aria-describedby={selected ? "lineage-readout" : undefined}
              onMouseEnter={() => setActive(node.slug)}
              onFocus={() => setActive(node.slug)}
              onBlur={(event: FocusEvent<HTMLAnchorElement>) => release(event.relatedTarget)}
              onKeyDown={(event) => onKeyDown(event, node.slug, "desktop")}
              style={{
                left: `${(box.x / lineageView.w) * 100}%`,
                top: `${(box.y / lineageView.h) * 100}%`,
                width: `${(box.w / lineageView.w) * 100}%`,
                height: `${(box.h / lineageView.h) * 100}%`,
              }}
              className={cn(
                "absolute flex items-center justify-between gap-2 border bg-paper px-3 text-ink",
                selected || related ? "border-accent" : "border-line",
                trace && !related && !selected && "opacity-40",
              )}
            >
              <span className="truncate font-mono text-[11px] tracking-[0.04em]">{node.graphLabel}</span>
              <StatusMark status={node.status} />
            </Link>
          );
        })}
      </div>

      <div
        id="lineage-readout"
        role="status"
        aria-live="polite"
        className="hidden border-t border-rule px-4 py-3 lg:grid lg:grid-cols-[8.5rem_minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-6"
      >
        {activeNode ? (
          <>
            <Readout label="Status" value={statusLabel[activeNode.status]} />
            <Readout
              label="Stack"
              value={activeNode.stack.length ? activeNode.stack.join(" · ") : "—"}
            />
            <Readout label="Invariant" value={activeNode.invariant} prose />
          </>
        ) : (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted lg:col-span-3">
            Select a node to read its spec.
          </p>
        )}
      </div>

      <ol className="lg:hidden">
        {pipelineOrder.map((slug, index) => {
          const node = bySlug.get(slug);
          if (!node) return null;
          const related = trace ? trace.nodes.has(slug) : false;
          const selected = active === slug;
          const nextSlug = pipelineOrder[index + 1];
          const nextRelated = nextSlug ? trace?.nodes.has(nextSlug) : false;
          const segmentHot = Boolean(trace) && (related || selected) && Boolean(nextRelated);
          return (
            <li key={slug} className="relative">
              {nextSlug && (
                <motion.span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-[1.15rem] top-8 w-px origin-top",
                    segmentHot ? "bg-accent" : "bg-line",
                    trace && !segmentHot && "opacity-30",
                  )}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    delay: reduce ? 0 : index * 0.12,
                    ease,
                  }}
                />
              )}
              <Link
                id={`lineage-row-${slug}`}
                href={`/projects/${node.slug}`}
                aria-label={`${node.name}. ${statusLabel[node.status]}. ${node.invariant}`}
                onFocus={() => setActive(node.slug)}
                onBlur={(event: FocusEvent<HTMLAnchorElement>) => release(event.relatedTarget)}
                onMouseEnter={() => setActive(node.slug)}
                onKeyDown={(event) => onKeyDown(event, node.slug, "mobile")}
                className={cn(
                  "relative block border-b border-rule py-4 pr-4 pl-10",
                  trace && !related && !selected && "opacity-40",
                )}
              >
                {selected && <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-accent" />}
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-mono text-[10px] tracking-[0.14em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block font-serif text-xl tracking-tight text-ink">{node.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                    <StatusMark status={node.status} />
                    {statusLabel[node.status]}
                  </span>
                </span>
                <span className="mt-2 block font-serif text-base italic leading-snug text-ink">
                  {node.invariant}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

function Readout({ label, value, prose = false }: { label: string; value: string; prose?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className={cn("mt-1 text-ink", prose ? "text-sm leading-snug" : "font-mono text-xs")}>{value}</p>
    </div>
  );
}
