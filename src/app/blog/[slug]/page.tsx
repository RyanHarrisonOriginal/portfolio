import { Navigation } from "@/components/Navigation";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  content: string;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const contentDir = path.join(process.cwd(), "content", "blog");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "",
    subtitle: data.subtitle,
    date: data.date || "",
    content,
  };
}

const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-5xl font-display mb-8 mt-12 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-display mt-12 mb-6">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-display mt-10 mb-6">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-foreground mb-6 leading-relaxed">{children}</p>
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding container-max pt-24">
        <article className="max-w-none">
          <header className="mb-12">
            <h1 className="text-5xl font-display mb-4">{post.title}</h1>
            {post.subtitle && (
              <p className="text-xl text-muted-foreground mb-4">{post.subtitle}</p>
            )}
            {post.date && (
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </header>
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>
    </div>
  );
}

