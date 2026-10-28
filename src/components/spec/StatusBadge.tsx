import { cn } from "@/lib/utils";
import { statusLabel, type ProjectStatus } from "@/lib/project-meta";

export function StatusMark({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-1.5 w-1.5 shrink-0",
        status === "live" && "bg-accent",
        status === "in-development" && "border border-ink",
        status === "research" && "border border-dashed border-ink",
        className,
      )}
    />
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-2 border border-rule px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
      <StatusMark status={status} />
      {statusLabel[status]}
    </span>
  );
}
