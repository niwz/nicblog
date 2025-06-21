/* eslint-disable react/no-unescaped-entities */
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import BlogPost from '@/components/BlogPost';
import { getPostBySlug, getAllPostSlugs, BlogPost as BlogPostType } from '@/lib/blog';
import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostProps {
  post: (BlogPostType & { password?: string | null }) | null;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  if (router.isFallback) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-light text-foreground mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </Layout>
    );
  }

  // Password protection logic
  if (post.password && !unlocked) {
    return (
      <Layout title={post.title}>
        <div className="max-w-md mx-auto mt-24 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black shadow">
          <h2 className="text-xl font-semibold mb-4">Protected Post</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">This post is password protected.</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (input === post.password) {
                setUnlocked(true);
                setError('');
              } else {
                setError('Incorrect password.');
              }
            }}
          >
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded mb-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="Enter password"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-foreground text-background py-2 rounded font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-black transition-colors"
            >
              Unlock
            </button>
            {error && <p className="text-red-600 dark:text-red-400 mt-2 text-sm">{error}</p>}
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <BlogPost
        title={post.title}
        date={post.date}
        content={post.content}
        readingTime={post.readingTime}
        tags={post.tags}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = getAllPostSlugs();
    const paths = slugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = await getPostBySlug(slug);

    // Pass password field if present
    let password: string | null = null;
    if (post) {
      const filePath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
      if (fs.existsSync(filePath)) {
        const { data } = matter(fs.readFileSync(filePath, 'utf8'));
        if (data.password) password = data.password;
      }
    }

    return {
      props: {
        post: post ? { ...post, password } : null,
      },
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return {
      props: {
        post: null,
      },
    };
  }
}; 