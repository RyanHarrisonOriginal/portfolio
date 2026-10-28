import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { proseComponents } from "@/components/mdx/prose";
import { frame } from "@/lib/site";
import { formatSheetDate } from "@/lib/writing";

type Params = { slug: string };

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  return {
    title: String(data.title ?? "Untitled"),
    subtitle: typeof data.subtitle === "string" ? data.subtitle : "",
    date: typeof data.date === "string" ? data.date : "",
    minutes: Math.max(1, Math.round(words / 230)),
    content,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.subtitle || undefined };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className={`${frame} py-12 md:py-16`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <Link href="/#writing" className="border-b border-transparent hover:border-accent">
          Writing
        </Link>
        <span className="mx-2 text-rule">/</span>
        Essay
      </p>
      <header className="mt-6 max-w-[40rem] border-b border-rule pb-8">
        <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-4 font-serif text-xl leading-snug text-ink md:text-2xl">{post.subtitle}</p>
        )}
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {post.date ? formatSheetDate(post.date) : "—"}
          <span className="mx-2 text-rule">/</span>
          {post.minutes} min
        </p>
      </header>
      <div className="mt-10 max-w-[65ch]">
        <MDXRemote source={post.content} components={proseComponents} />
      </div>
    </article>
  );
}
