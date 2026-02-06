import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      
      matches.push({ id, text, level });
    }

    setHeadings(matches);
  }, [content]);

  // Track scroll position to highlight active section and calculate progress
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Calculate progress based on which heading is active
            const index = headings.findIndex(h => h.id === entry.target.id);
            if (index !== -1) {
              setScrollProgress((index + 1) / headings.length);
            }
          }
        });
      },
      { rootMargin: "-20% 0% -60% 0%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  // Generate a wavy SVG path with organic hand-drawn feel
  const generateWavyPath = (height: number) => {
    const segments = headings.length;
    const segmentHeight = height / segments;
    let path = "M 10 0";
    
    for (let i = 0; i < segments; i++) {
      const y1 = i * segmentHeight + segmentHeight * 0.25;
      const y2 = i * segmentHeight + segmentHeight * 0.75;
      const y3 = (i + 1) * segmentHeight;
      
      // Larger alternating curves for hand-drawn organic feel
      const xOffset = i % 2 === 0 ? 6 : -6;
      const controlX1 = 10 + xOffset * 0.8;
      const controlX2 = 10 - xOffset * 0.6;
      
      path += ` C ${controlX1} ${y1}, ${controlX2} ${y2}, 10 ${y3}`;
    }
    
    return path;
  };

  const listHeight = headings.length * 32; // Approximate height per item
  const wavyPath = generateWavyPath(listHeight);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        On this page
      </p>
      
      <div className="relative">
        {/* Wavy line SVG */}
        <svg
          className="absolute left-0 top-0 w-4"
          style={{ height: `${listHeight}px` }}
          viewBox={`0 0 16 ${listHeight}`}
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background wavy line (unfilled) */}
          <path
            d={wavyPath}
            stroke="hsl(var(--muted-foreground) / 0.2)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Filled portion based on scroll progress */}
          <motion.path
            d={wavyPath}
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: scrollProgress }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        </svg>

        <ul className="space-y-1 pl-6">
          {headings.map((heading, index) => (
            <motion.li
              key={heading.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.5 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setActiveId(heading.id);
                  }
                }}
                className={`
                  block text-sm py-1 transition-colors duration-200
                  ${heading.level === 3 ? "pl-3" : ""}
                  ${activeId === heading.id 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {heading.text}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
