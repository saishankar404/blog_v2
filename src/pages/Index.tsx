import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts } from "@/lib/posts";
import { Layout } from "@/components/Layout";
import { BlogPostList } from "@/components/BlogPostList";

const Index = () => {
  const posts = getAllPosts();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Personal Intro */}
        <header className="mb-12">
          <motion.h1
            className="text-2xl font-semibold tracking-tight mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            hello! i'm sai
          </motion.h1>

          <motion.div
            className="space-y-4 text-base text-foreground leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              i study computer science and spend a lot of my time designing and building things on the web.
            </p>

            <p>
              i've worked on multiple design and web{" "}
              <Link to="/projects" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
                experiments
              </Link>, explored branding and ui systems, and shipped things at blazing speed without compromising on quality, while actively trying to understand the fundamentals deeply.
            </p>

            <p>
              i enjoy clean interfaces, strong visual systems, and turning vague ideas into real, usable products. outside of work, i like traveling and thinking about how not to be bored and how to make life fun.
            </p>

            <p>
              i write occasionally. this site is mainly a space to document my thoughts, projects, and experiments, and also a place to know me a bit better. feel free to dm me{" "}
              <a
                href="https://x.com/saishankar404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                on X
              </a>.
            </p>
          </motion.div>
        </header>


        <motion.div
          className="border-t border-border my-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ originX: 0 }}
        />

        {/* Blog Posts List */}
        <section>
          <BlogPostList posts={posts} />
          <p className="text-center text-xs text-muted-foreground mt-8 italic">
            more coming soon...
          </p>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Index;
