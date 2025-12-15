import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

async function getAboutContent() {
  const contentDir = path.join(process.cwd(), "content", "about");
  const filePath = path.join(contentDir, "philosophy.mdx");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  return content;
}

const mdxComponents = {
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-muted-foreground leading-relaxed mb-4">{children}</p>
  ),
};

export const About = async () => {
  const content = await getAboutContent();

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-max">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 tracking-tight">
          About
        </h2>
        <div className="max-w-3xl">
          {content ? (
            <MDXRemote source={content} components={mdxComponents} />
          ) : (
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Content not found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

