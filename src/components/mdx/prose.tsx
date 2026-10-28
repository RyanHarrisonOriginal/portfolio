import type { MDXComponents } from "mdx/types";

export const proseComponents: MDXComponents = {
  p: ({ children }) => <p className="mb-4 text-[1.05rem] leading-relaxed text-ink last:mb-0">{children}</p>,
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 font-serif text-2xl tracking-tight text-ink">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-serif text-xl tracking-tight text-ink">{children}</h3>
  ),
  ul: ({ children }) => (
    <ul className="my-4 space-y-2 [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-[0.72em] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-3 [&>li]:before:bg-line">
      {children}
    </ul>
  ),
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-5 marker:font-mono marker:text-xs marker:text-muted">{children}</ol>,
  li: ({ children }) => <li className="text-[1.05rem] leading-relaxed text-ink [&_p]:mb-0">{children}</li>,
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="border-b border-line pb-px text-ink hover:border-accent"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l border-accent pl-4 text-ink">{children}</blockquote>
  ),
};
