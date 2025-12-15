"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const HashHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only handle hash on home page
    if (pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure page is rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [pathname, searchParams]);

  return null;
};


