export const projectStatuses = ["live", "in-development", "research"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  research: "Research",
};

export type ProjectLink = { label: string; href: string };

export type ProjectSections = {
  problem: string;
  invariant: string;
  contracts: string;
  architecture: string;
  failureModes: string;
  outcome: string;
  change: string;
};

export type Project = {
  slug: string;
  name: string;
  graphLabel: string;
  status: ProjectStatus;
  order: number;
  role: string;
  timeline: string;
  purpose: string;
  invariant: string;
  stack: string[];
  links: ProjectLink[];
  draft: boolean;
  sections: ProjectSections;
};

export const specOutline = [
  { id: "problem", number: "01", title: "Problem", key: "problem" },
  { id: "invariant", number: "02", title: "Core invariant", key: "invariant" },
  { id: "contracts", number: "03", title: "Contracts", key: "contracts" },
  { id: "architecture", number: "04", title: "Architecture", key: "architecture" },
  { id: "failure-modes", number: "05", title: "Failure modes considered", key: "failureModes" },
  { id: "outcome", number: "06", title: "Outcome", key: "outcome" },
  { id: "change", number: "07", title: "What I'd change", key: "change" },
] as const;
