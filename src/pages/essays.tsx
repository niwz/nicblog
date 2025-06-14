import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { getAllPosts, BlogPostMeta } from '@/lib/blog';

interface EssaysProps {
  posts: BlogPostMeta[];
}

export default function Essays({ posts = [] }: EssaysProps) {
  // Filter for longer essays (4+ minute read time)
  const essays = posts.filter(post => {
    const readTime = parseInt(post.readingTime || '0');
    return readTime >= 4;
  });

  return (
    <Layout title="Essays">
      <div className="prose-content mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Longer-form explorations of ideas, concepts, and observations. These pieces 
          typically require more time to read and digest, but aim to provide deeper 
          insights into their respective topics.
        </p>
      </div>

      {essays.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No essays published yet.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Essays are longer-form posts (4+ minutes reading time) that explore topics in greater depth.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {essays.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-12 last:border-b-0">
              <header className="mb-6">
                <h2 className="text-2xl font-light mb-3">
                  <Link 
                    href={`/posts/${post.slug}`}
                    className="text-foreground hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                  {post.readingTime && (
                    <span>{post.readingTime} min read</span>
                  )}
                </div>
              </header>
              
              {post.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  {post.excerpt}
                </p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = getAllPosts();
    
    return {
      props: {
        posts: posts || [],
      },
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}; 