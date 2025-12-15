import { Mail, Github, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-max text-center">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 tracking-tight relative inline-block">
          Contact
          <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent" />
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get in touch with me
        </p>
        <div className="flex justify-center gap-6">
          
          <a 
            href="https://github.com/RyanHarrisonOriginal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:opacity-70 transition-opacity"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/ryan-harrison-7116ab58/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:opacity-70 transition-opacity"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

