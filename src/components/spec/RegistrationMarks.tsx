import { cn } from "@/lib/utils";

export function RegistrationMarks({ className }: { className?: string }) {
  const arm = "pointer-events-none absolute h-2 w-2 border-mark";
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden="true">
      <span className={cn(arm, "left-1.5 top-1.5 border-l border-t")} />
      <span className={cn(arm, "right-1.5 top-1.5 border-r border-t")} />
      <span className={cn(arm, "bottom-1.5 left-1.5 border-b border-l")} />
      <span className={cn(arm, "bottom-1.5 right-1.5 border-r border-b")} />
    </div>
  );
}
