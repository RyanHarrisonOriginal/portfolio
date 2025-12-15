"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    
    if (isHomePage) {
      // If we're on the home page, just scroll to the section
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If we're on another page, navigate to home with hash using window.location
      // This ensures the hash is properly handled
      window.location.href = `/${href}`;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <a 
              href="/" 
              className="flex items-center gap-3 text-xl font-display font-medium tracking-tight"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img 
                src="/ryan-logo.png" 
                alt="Ryan Harrison Logo" 
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span>RH</span>
            </a>
            <div className="hidden md:flex items-center gap-4 md:gap-6 border-l border-border pl-4 md:pl-6">
              <h1 className="text-lg md:text-xl font-display font-medium tracking-tight">
                Clarity, <span className="text-accent">engineered</span>
              </h1>
              <p className="text-sm text-muted-foreground font-light italic">
                Building tools for thinking at scale.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Full screen menu overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="space-y-8 text-center">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="block text-5xl md:text-7xl font-display font-medium hover:opacity-50 transition-opacity relative group"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.4s ease-out ${index * 100}ms`
                }}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

