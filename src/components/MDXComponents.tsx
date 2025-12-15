import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-5xl font-display mb-8 mt-12 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-display mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-display mt-10 mb-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-lg text-foreground mb-6 leading-relaxed">{children}</p>
    ),
    ...components,
  };
}

