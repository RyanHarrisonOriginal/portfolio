export const lineageView = { w: 760, h: 300 };

export type LineageBox = { x: number; y: number; w: number; h: number };

/** Coordinates are the drafting sheet. Edges are derived from these boxes. */
export const lineageLayout: Record<string, LineageBox> = {
  spydr: { x: 80, y: 118, w: 200, h: 64 },
  bibjotz: { x: 480, y: 118, w: 200, h: 64 },
};

export type LineageEdge = { id: string; from: string; to: string };

export const lineageEdges: LineageEdge[] = [];

/** Top-to-bottom order when the drawing collapses to a pipeline. */
export const pipelineOrder = ["spydr", "bibjotz"] as const;

const desktopKeys: Record<string, Partial<Record<string, string>>> = {
  spydr: { ArrowRight: "bibjotz" },
  bibjotz: { ArrowLeft: "spydr" },
};

export function neighborSlug(
  slug: string,
  key: string,
  mode: "desktop" | "mobile",
): string | null {
  if (mode === "mobile" && (key === "ArrowUp" || key === "ArrowDown")) {
    const index = pipelineOrder.indexOf(slug as (typeof pipelineOrder)[number]);
    if (index < 0) return null;
    const next = key === "ArrowDown" ? pipelineOrder[index + 1] : pipelineOrder[index - 1];
    return next ?? null;
  }
  return desktopKeys[slug]?.[key] ?? null;
}

export function traceLineage(slug: string) {
  const nodes = new Set<string>([slug]);
  const edges = new Set<string>();

  const upstream = [slug];
  const seenUp = new Set<string>([slug]);
  while (upstream.length) {
    const current = upstream.shift()!;
    for (const edge of lineageEdges) {
      if (edge.to !== current) continue;
      edges.add(edge.id);
      if (!seenUp.has(edge.from)) {
        seenUp.add(edge.from);
        nodes.add(edge.from);
        upstream.push(edge.from);
      }
    }
  }

  const downstream = [slug];
  const seenDown = new Set<string>([slug]);
  while (downstream.length) {
    const current = downstream.shift()!;
    for (const edge of lineageEdges) {
      if (edge.from !== current) continue;
      edges.add(edge.id);
      if (!seenDown.has(edge.to)) {
        seenDown.add(edge.to);
        nodes.add(edge.to);
        downstream.push(edge.to);
      }
    }
  }

  return { nodes, edges };
}

export function edgeGeometry(edge: LineageEdge) {
  const from = lineageLayout[edge.from];
  const to = lineageLayout[edge.to];
  if (!from || !to) return null;
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const mid = Math.round(x1 + (x2 - x1) / 2);
  return {
    d: `M ${x1} ${y1} H ${mid} V ${y2} H ${x2}`,
    x2,
    y2,
  };
}
