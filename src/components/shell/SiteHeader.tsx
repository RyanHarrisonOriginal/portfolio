import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { frame } from "@/lib/site";

const links = [
  { href: "/#systems", index: "01", label: "Systems" },
  { href: "/#principles", index: "02", label: "Principles" },
  { href: "/#writing", index: "03", label: "Writing" },
  { href: "/#contact", index: "04", label: "Contact" },
];

function NavLink({ href, index, label }: { href: string; index: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
    >
      <span className="text-muted">{index}</span>
      <span className="relative">
        {label}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        />
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className={`${frame} flex items-center justify-between gap-6 py-4`}>
        <Link href="/" className="font-serif text-[1.15rem] tracking-[-0.02em] text-ink">
          Ryan Harrison
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <nav aria-label="Sections" className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-rule px-5 py-2.5 md:hidden">
        {links.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </nav>
    </header>
  );
}
