import { Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HashHandler } from "@/components/HashHandler";

const Index = async () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <HashHandler />
      </Suspense>
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
