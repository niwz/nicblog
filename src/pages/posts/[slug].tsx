/* eslint-disable react/no-unescaped-entities */
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import BlogPost from '@/components/BlogPost';
import { getPostBySlug, getAllPostSlugs, BlogPost as BlogPostType } from '@/lib/blog';

interface PostProps {
  post: BlogPostType | null;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

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
            The post you're looking for doesn't exist.
          </p>
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

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
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