export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  wordCount: number;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

// Import all markdown files from content/posts
const postModules = import.meta.glob('/src/content/posts/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { meta: {}, body: content };
  }

  const frontmatter = match[1];
  const body = match[2];
  
  const meta: Record<string, string> = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      meta[key] = value;
    }
  });

  return { meta, body };
}

function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function calculateReadingTime(wordCount: number): string {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

function getSlugFromPath(path: string): string {
  const filename = path.split('/').pop() || '';
  return filename.replace('.md', '');
}

export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const [path, content] of Object.entries(postModules)) {
    const { meta, body } = parseFrontmatter(content as string);
    const slug = getSlugFromPath(path);
    
    const wordCount = calculateWordCount(body);
    posts.push({
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      excerpt: meta.excerpt || '',
      readingTime: calculateReadingTime(wordCount),
      wordCount,
      tags: meta.tags ? meta.tags.split(',').map(t => t.trim()) : [],
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const path = `/src/content/posts/${slug}.md`;
  const content = postModules[path] as string | undefined;
  
  if (!content) {
    return null;
  }

  const { meta, body } = parseFrontmatter(content);
  const wordCount = calculateWordCount(body);

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    excerpt: meta.excerpt || '',
    readingTime: calculateReadingTime(wordCount),
    wordCount,
    tags: meta.tags ? meta.tags.split(',').map(t => t.trim()) : [],
    content: body,
  };
}
