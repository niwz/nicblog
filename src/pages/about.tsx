/* eslint-disable react/no-unescaped-entities */
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout title="About">
      <div className="prose-content">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          Welcome to this corner of the internet. This blog serves as a space for exploring ideas, 
          sharing insights, and documenting thoughts on various subjects that capture my attention.
        </p>

        <h2>Philosophy</h2>
        <p>
          This site is built on the principles of digital minimalism and thoughtful design. 
          The goal is to create a distraction-free environment where ideas can be shared and 
          explored without the noise that often accompanies modern web experiences.
        </p>

        <h2>Writing</h2>
        <p>
          The posts here range from technical observations to philosophical musings, from book 
          reviews to personal reflections. The unifying thread is a commitment to clarity of 
          thought and expression.
        </p>

        <h2>Design</h2>
        <p>
          The aesthetic of this site is inspired by <a href="https://gwern.net" target="_blank" rel="noopener noreferrer">Gwern Branwen's</a> approach 
          to web design: prioritizing readability, reducing visual clutter, and focusing attention 
          on the content itself. The typography is carefully chosen to be easy on the eyes during 
          long reading sessions.
        </p>

        <h2>Technology</h2>
        <p>
          This blog is built with Next.js, TypeScript, and Tailwind CSS. The content is written 
          in Markdown for simplicity and portability. The design emphasizes performance, 
          accessibility, and semantic HTML.
        </p>

        <h2>Contact</h2>
        <p>
          If you'd like to discuss any of the ideas presented here, feel free to reach out via 
          email or through any of the usual channels. Thoughtful conversation is always welcome.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: January 2024
          </p>
        </div>
      </div>
    </Layout>
  );
} 