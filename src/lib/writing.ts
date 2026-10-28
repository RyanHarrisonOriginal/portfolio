import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Essay = {
  title: string;
  date: string | null;
  minutes: number | null;
  href: string | null;
  forthcoming: boolean;
};

const forthcoming: Essay[] = [
  {
    title: "Contracts before pipelines",
    date: null,
    minutes: null,
    href: null,
    forthcoming: true,
  },
  {
    title: "Idempotence is a kindness",
    date: null,
    minutes: null,
    href: null,
    forthcoming: true,
  },
  {
    title: "What a platform chooses to remember",
    date: null,
    minutes: null,
    href: null,
    forthcoming: true,
  },
];

export function formatSheetDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${year}.${month}.${day}`;
}

export function getEssays(): Essay[] {
  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    "data-platforms-are-not-neutral.mdx",
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 230));

  const published: Essay = {
    title: String(data.title ?? "Untitled"),
    date: typeof data.date === "string" ? data.date : null,
    minutes,
    href: "/blog/data-platforms-are-not-neutral",
    forthcoming: false,
  };

  return [published, ...forthcoming];
}
