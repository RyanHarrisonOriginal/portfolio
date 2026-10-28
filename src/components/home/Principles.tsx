import { PrincipleClause } from "@/components/spec/PrincipleClause";
import { Reveal } from "@/components/spec/Reveal";
import { SectionLabel } from "@/components/spec/SectionLabel";
import { frame, principles } from "@/lib/site";

export function Principles() {
  return (
    <section id="principles" className={`${frame} scroll-mt-28 py-16 md:py-24`}>
      <SectionLabel index="02" title="Principles" />
      <Reveal>
        <div>
          {principles.map((clause) => (
            <PrincipleClause key={clause.number} {...clause} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
