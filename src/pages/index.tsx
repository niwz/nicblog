import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { getAllPosts, BlogPostMeta } from '@/lib/blog';

interface HomeProps {
  posts: BlogPostMeta[];
}

export default function Home({ posts = [] }: HomeProps) {
  return (
    <Layout>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-light text-foreground mb-8">
            Recent Writing
          </h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No posts yet. Create your first post in the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">content/posts</code> directory.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Posts should be markdown files with frontmatter containing title, date, and other metadata.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0">
                  <header className="mb-4">
                    <h3 className="text-xl font-medium mb-2">
                      <Link 
                        href={`/posts/${post.slug}`}
                        className="text-foreground hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </time>
                      {post.readingTime && (
                        <span>{post.readingTime} min read</span>
                      )}
                    </div>
                  </header>
                  
                  {post.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
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
        </section>
        
        <section>
          <h2 className="text-2xl font-light text-foreground mb-6">
            About This Blog
          </h2>
          <div className="prose-content">
            <p>
              This is my blog. More to come soon.
            </p>
            <p>
              Vibe-coded with Cursor.
            </p>
          </div>
        </section>
      </div>
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
