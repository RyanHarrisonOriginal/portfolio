/**
 * Site copy that is not a project spec.
 * Replace email and colophon here.
 */
export const site = {
  name: "Ryan Harrison",
  statement: "Trusted data platforms that mold to a company's identity.",
  subline: "Data contracts. Invariants. Systems that hold.",
  identities: ["AI engineer", "Martial artist", "Christian"],
  /** Leave empty until a public address is ready. Rendered as a forthcoming field. */
  email: "",
  github: "https://github.com/RyanHarrisonOriginal",
  githubLabel: "github.com/RyanHarrisonOriginal",
  linkedin: "https://www.linkedin.com/in/ryan-harrison-7116ab58/",
  linkedinLabel: "linkedin.com/in/ryan-harrison-7116ab58",
  colophon: "Built as a spec, not a brochure.",
  fonts: ["Newsreader", "Inter Tight", "JetBrains Mono"],
  stack: ["Next.js", "TypeScript", "MDX"],
} as const;

export const principles = [
  {
    number: "01",
    title: "Invariants are written down before features are.",
    body: "A system that cannot say what must always be true cannot say when it is broken. The invariant is the spec. The feature is a consequence.",
  },
  {
    number: "02",
    title: "A pipeline is finished when it is idempotent.",
    body: "Running it twice is the same as running it once. Retries, backfills, and the next person on call all depend on that being literally true.",
  },
  {
    number: "03",
    title: "Meaning is a contract, not a byproduct of the tool.",
    body: "A platform that skips the contract does not stay neutral. It automates a confusion someone forgot to name. Ontology comes before transformation logic.",
  },
  {
    number: "04",
    title: "Sustainable means a person can hold it.",
    body: "The test of a design is whether the next engineer can maintain it without burning out. Longevity belongs to the system, and to the people who keep it.",
  },
] as const;

export const frame = "mx-auto w-full max-w-[1120px] px-5 md:px-8";
