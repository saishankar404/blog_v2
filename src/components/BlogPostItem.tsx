import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface BlogPostItemProps {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  wordCount: number;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const BlogPostItem = forwardRef<HTMLLIElement, BlogPostItemProps>(
  ({ slug, title, date, readingTime, wordCount, index, isHovered, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <motion.li
        ref={ref}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="list-none relative z-10"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link to={`/blog/${slug}`} className="block relative">
          <div className="relative py-2.5 px-3 -mx-3 rounded-lg">
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              {/* Title with dotted underline animation */}
              <motion.span
                className="text-sm text-foreground relative"
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <span className="relative inline-block">
                  {title}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full border-b border-dotted border-foreground origin-left hidden sm:block"
                    animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 0.6 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </span>
              </motion.span>

              {/* Arrow that slides in - hidden on mobile */}
              <motion.span
                className="text-muted-foreground text-xs hidden sm:inline"
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                →
              </motion.span>

              {/* Reading time & word count - slides up on hover (desktop), always visible on mobile */}
              <motion.span
                className="text-muted-foreground text-xs sm:ml-auto order-last sm:order-none"
                animate={{ opacity: isHovered ? 0.7 : 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ opacity: 0 }}
              >
                <span className="hidden sm:inline">{readingTime} · {wordCount.toLocaleString()} words</span>
              </motion.span>

              {/* Date - always visible */}
              <motion.span
                className="text-muted-foreground text-xs"
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                transition={{ duration: 0.15 }}
              >
                {new Date(date).toLocaleDateString('en-CA')}
              </motion.span>
            </div>
          </div>
        </Link>
      </motion.li>
    );
  }
);

BlogPostItem.displayName = "BlogPostItem";
