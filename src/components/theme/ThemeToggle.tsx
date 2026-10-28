"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (localStorage.getItem("theme")) return;
      const next: Theme = media.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
    setTheme(next);
  };

  const label = theme === "dark" ? "Blueprint" : theme === "light" ? "Paper" : "Theme";
  const nextLabel = theme === "dark" ? "paper" : "blueprint";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
    >
      <span
        aria-hidden
        className={`h-2 w-2 border border-ink ${theme === "dark" ? "bg-accent border-accent" : "bg-transparent"}`}
      />
      <span className="inline-block min-w-[5.6rem] text-left">{label}</span>
    </button>
  );
}
