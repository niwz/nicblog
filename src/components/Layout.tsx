import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showSidebar?: boolean;
}

interface NavItem {
  href: string;
  label: string;
  description?: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', description: 'Latest writings' },
  { href: '/essays', label: 'Essays', description: 'Long-form thoughts' },
  { href: '/notes', label: 'Notes', description: 'Short observations' },
  { href: '/about', label: 'About', description: 'Background & contact' },
];

// Recent posts to show in sidebar
const recentPosts = [
  { slug: 'on-writing', title: 'On Writing' },
  { slug: 'digital-minimalism', title: 'Digital Minimalism' },
  { slug: 'reading-habits', title: 'Reading Habits' },
];

export default function Layout({ children, title, showSidebar = true }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1200px] mx-auto flex">
        {showSidebar && (
          <aside className="w-64 fixed h-screen overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-background lg:block hidden">
            <div className="p-8">
              <Link href="/" className="block mb-8">
                <h1 className="text-xl font-medium text-foreground hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  Your Blog
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Essays & observations
                </p>
              </Link>
              
              <nav className="space-y-6">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link 
                      href={item.href}
                      className={`block font-medium transition-colors ${
                        router.pathname === item.href
                          ? 'text-foreground'
                          : 'text-gray-600 dark:text-gray-400 hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link 
                      key={post.slug}
                      href={`/posts/${post.slug}`} 
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
        
        <main className={`flex-1 ${showSidebar ? 'lg:ml-64' : ''}`}>
          <div className="max-w-3xl mx-auto px-8 py-12">
            {/* Mobile navigation */}
            {showSidebar && (
              <nav className="lg:hidden mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-wrap gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 text-sm rounded transition-colors ${
                        router.pathname === item.href
                          ? 'bg-gray-100 dark:bg-gray-800 text-foreground'
                          : 'text-gray-600 dark:text-gray-400 hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-900'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            )}
            
            {title && (
              <header className="mb-12">
                <h1 className="text-3xl font-light text-foreground mb-2">
                  {title}
                </h1>
              </header>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 