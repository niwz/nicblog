import React from 'react';
import { format } from 'date-fns';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
  readingTime?: string;
  tags?: string[];
}

export default function BlogPost({ title, date, content, readingTime, tags }: BlogPostProps) {
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <header className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
          {title}
        </h1>
        
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={date}>
            {format(new Date(date), 'MMMM d, yyyy')}
          </time>
          {readingTime && (
            <span>{readingTime} min read</span>
          )}
        </div>
        
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div 
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
} 