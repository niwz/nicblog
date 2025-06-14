import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { getAllPosts, BlogPostMeta } from '@/lib/blog';

interface NotesProps {
  posts: BlogPostMeta[];
}

export default function Notes({ posts = [] }: NotesProps) {
  // Filter for shorter notes (less than 4 minutes read time)
  const notes = posts.filter(post => {
    const readTime = parseInt(post.readingTime || '0');
    return readTime < 4;
  });

  return (
    <Layout title="Notes">
      <div className="prose-content mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Brief observations, quick thoughts, and shorter pieces. These are intended to be 
          easily digestible and often serve as starting points for longer explorations.
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No notes published yet.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Notes are shorter pieces (under 4 minutes reading time) for quick thoughts and observations.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {notes.map((post) => (
            <article key={post.slug} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <header className="mb-4">
                <h3 className="text-lg font-medium mb-2">
                  <Link 
                    href={`/posts/${post.slug}`}
                    className="text-foreground hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </time>
                  {post.readingTime && (
                    <span>{post.readingTime} min</span>
                  )}
                </div>
              </header>
              
              {post.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
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