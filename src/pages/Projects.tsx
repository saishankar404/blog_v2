import { Layout } from "@/components/Layout";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Design System Kit",
    description: "A comprehensive design system with components, tokens, and documentation.",
    tags: ["Design", "React", "Storybook"],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    title: "Markdown Notes",
    description: "A minimal note-taking app with local-first sync and bidirectional linking.",
    tags: ["React", "TypeScript", "SQLite"],
    github: "https://github.com",
  },
  {
    title: "Focus Timer",
    description: "A distraction-free pomodoro timer with ambient sounds.",
    tags: ["iOS", "Swift", "Design"],
    link: "https://example.com",
  },
  {
    title: "Color Palette Generator",
    description: "Generate accessible color palettes with automatic contrast checking.",
    tags: ["Design", "JavaScript"],
    link: "https://example.com",
    github: "https://github.com",
  },
];

const Projects = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block mb-4 text-3xl">🛠️</div>
          <h1 className="text-xl font-medium tracking-tight mb-3">
            Experiments
          </h1>
          <p className="text-muted-foreground text-sm">
            Things I've built, designed, or contributed to.
          </p>
        </header>

        {/* Projects Section */}
        <section className="relative">
          {/* Skeleton placeholder rows */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex gap-4 py-4 px-4 -mx-4 rounded-[14px] transition-all duration-300 hover:bg-secondary/30 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] cursor-default group"
              >
                <div className="w-5 h-4 bg-secondary/60 rounded group-hover:bg-secondary/80 transition-colors" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary/60 rounded w-3/4 group-hover:bg-secondary/80 transition-colors" />
                  <div className="h-3 bg-secondary/40 rounded w-1/2 group-hover:bg-secondary/60 transition-colors" />
                  <div className="flex gap-1 mt-2">
                    <div className="h-4 w-12 bg-secondary/50 rounded group-hover:bg-secondary/70 transition-colors" />
                    <div className="h-4 w-16 bg-secondary/50 rounded group-hover:bg-secondary/70 transition-colors" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-6 w-6 bg-secondary/40 rounded group-hover:bg-secondary/60 transition-colors" />
                  <div className="h-6 w-6 bg-secondary/40 rounded group-hover:bg-secondary/60 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] bg-background/40 rounded-xl pointer-events-none">
            <div className="text-center">
              <span className="text-2xl mb-2 block">👀</span>
              <p className="text-sm text-muted-foreground italic">coming soon...</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Projects;
