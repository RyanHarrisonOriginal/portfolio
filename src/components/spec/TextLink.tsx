import Link from "next/link";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TextLink({ href, children, className }: TextLinkProps) {
  const classes = cn("group inline-flex max-w-full flex-col items-start text-ink", className);
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </>
  );

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}
