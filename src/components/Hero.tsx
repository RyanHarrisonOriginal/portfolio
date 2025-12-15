"use client";

import { ArrowDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding pt-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
      </div>

      <div className="container-max">
        <div className="max-w-5xl space-y-8">
          <div 
            className="flex flex-col items-start gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            <div
              className="relative"
              style={{
                transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) rotate(${mousePosition.x * 0.05}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <img 
                src="/ryan-logo.png" 
                alt="Ryan Harrison Logo" 
                className="w-[150px] h-[150px] drop-shadow-lg border-0"
              />
            </div>
            <p 
              className="text-muted-foreground text-2xl md:text-3xl font-medium"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.8s ease-out 0.4s',
              }}
            >
              Ryan Harrison
            </p>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transition: 'all 1s ease-out 0.6s',
            }}
          >
            Clarity, <span 
              className="text-accent inline-block relative"
              style={{
                transform: `translateY(${mousePosition.y * 0.02}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              engineered
              <span 
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent origin-left"
                style={{
                  transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 1.2s ease-out 1.2s',
                }}
              />
            </span>
          </h1>
          
          <div 
            className="max-w-2xl space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 1s',
            }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light italic">
              "Building tools for thinking at scale."
            </p>
            
            {/* Functional CTA Section */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease-out 1.2s',
              }}
            >
              <button
                onClick={scrollToProjects}
                className="group relative flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium text-sm uppercase tracking-wider hover:bg-accent transition-all duration-300 overflow-hidden"
                aria-label="View my work"
              >
                <span className="relative z-10">View Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector("#contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Get in touch"
              >
                <span>Get in touch</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        aria-label="Scroll to projects"
      >
        <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
        <ArrowDown className="w-5 h-5 animate-bounce group-hover:text-accent" />
      </button>
    </section>
  );
};
  