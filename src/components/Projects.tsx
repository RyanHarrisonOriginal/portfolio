import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Circle } from "lucide-react";

const projects = [
  {
    title: "BibJotz",
    description: "BibJotz is a structured Bible study platform built around guides, drafts, and references rather than free-form notes. It focuses on clarity, versioning, and intentional organization so study evolves without becoming fragmented or disposable.",
    tags: ["PostgreSQL", "API Design", "Backend", "Next.js", "Tailwind CSS"],
    status: "in development",
    github: [
      { url: "https://github.com/RyanHarrisonOriginal/BibJotz-Backend", label: "Backend API" },
      { url: "https://github.com/RyanHarrisonOriginal/BibJotz-Frontend", label: "Frontend Web App" },
      { url: "https://github.com/RyanHarrisonOriginal/BibleApi", label: "Bible API" },
    ],
  },
];

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower === "active" || statusLower === "in production") {
    return "bg-green-500/20 text-green-700 border-green-500/30";
  }
  if (statusLower === "in development" || statusLower === "development") {
    return "bg-blue-500/20 text-blue-700 border-blue-500/30";
  }
  if (statusLower === "maintained" || statusLower === "maintenance") {
    return "bg-accent/20 text-accent border-accent/30";
  }
  if (statusLower === "archived" || statusLower === "deprecated") {
    return "bg-muted text-muted-foreground border-border";
  }
  return "bg-secondary text-secondary-foreground border-border";
};

const posts = [
  {
    title: "Data Platforms Are Not Neutral: Ontology, Memory, and the Work We Pretend Is Technical",
    summary: "Data and analytics platforms are not neutral infrastructure—they encode an organization’s understanding of its domain, preserve its memory over time, and quietly determine which versions of reality become actionable truth.",
    date: "2025-12",
    link: "/blog/data-platforms-are-not-neutral",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <ArrowRight className="w-6 h-6" />
          <h2 className="text-4xl md:text-5xl font-display">WORK</h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              End-to-end solutions from architecture to deployment. Working across AI, 
              front-end, back-end, data orchestration, and infrastructure.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Focused on clean design, clear thinking, and functional systems that 
              scale with your business needs.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The systems I build are designed for humans first. Every tool, pipeline, 
              and interface reduces friction and cognitive overhead.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Not just responsible AI. Responsible authority. That starts with 
              intentional architecture.
            </p>
          </div>
        </div>

        {/* Featured Project */}
        <div className="mb-24">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Featured Project
          </p>
          {projects.map((project) => (
            <Card 
              key={project.title}
              className="bg-card border-border p-8 md:p-12 rounded-2xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-display mb-2">{project.title}</h3>
                      {project.status && (
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            <Circle className="w-1.5 h-1.5 fill-current" />
                            {project.status}
                          </span>
                        </div>
                      )}
                    </div>
                    {project.github && project.github.length > 0 && (
                      <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                        <Github className="w-5 h-5 text-muted-foreground" />
                        {project.github.length > 1 && (
                          <span className="text-xs text-muted-foreground font-medium">
                            {project.github.length}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end md:items-start">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* GitHub Link Section */}
              {project.github && project.github.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      Repositories
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.github.map((repo, index) => {
                        const repoName = repo.label || repo.url.split('/').pop() || 'Repository';
                        return (
                          <a
                            key={index}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/repo flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border hover:border-accent/50 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                            aria-label={`View ${repoName} repository on GitHub`}
                          >
                            <Github className="w-4 h-4 group-hover/repo:text-accent transition-colors flex-shrink-0" />
                            <span>{repoName}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/repo:opacity-100 group-hover/repo:translate-x-0.5 transition-all flex-shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Writing Section */}
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Technical/Philosophical Writing
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.title} href={post.link} className="group">
                <Card className="h-full bg-card border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group-hover:border-primary/20">
                  <div className="space-y-4">
                    <time className="text-sm text-muted-foreground">
                      {post.date}
                    </time>
                    <h4 className="text-xl font-display group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium pt-2 group-hover:gap-4 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
