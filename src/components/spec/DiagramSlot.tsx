import { RegistrationMarks } from "@/components/spec/RegistrationMarks";

export function DiagramSlot() {
  return (
    <figure className="relative mt-8 border border-rule bg-paper">
      <RegistrationMarks />
      <div className="flex min-h-52 items-center justify-center px-6 py-16">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Diagram slot
          <span className="mt-2 block tracking-[0.14em]">Not yet drawn</span>
        </p>
      </div>
      <figcaption className="border-t border-rule px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Fig. 01 / Architecture
      </figcaption>
    </figure>
  );
}
