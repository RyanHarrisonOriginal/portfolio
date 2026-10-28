import { TextLink } from "@/components/spec/TextLink";
import { frame } from "@/lib/site";

export default function NotFound() {
  return (
    <div className={`${frame} py-24`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">§ 404</p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight text-ink">This sheet is not in the set.</h1>
      <p className="mt-8">
        <TextLink href="/">Return to the index</TextLink>
      </p>
    </div>
  );
}
