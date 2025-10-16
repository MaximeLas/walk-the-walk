import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ReportPageProps {
  content: string;
  title: string;
  filename: string;
  slugPath: string[];
}

export default function ReportPage({ content, title, filename, slugPath }: ReportPageProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <style jsx global>{`
          .markdown-body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            padding-left: 24px;
            padding-right: 24px;
          }
          /* Light mode text color */
          .markdown-body {
            color: #24292e;
          }
          /* Dark mode text color */
          .dark .markdown-body {
            color: #e6edf3;
          }
          .markdown-body h1,
          .markdown-body h2,
          .markdown-body h3,
          .markdown-body h4 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
          }
          .markdown-body h1 {
            font-size: 2em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
          }
          .dark .markdown-body h1 {
            border-bottom: 1px solid #30363d;
          }
          .markdown-body h2 {
            font-size: 1.5em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
          }
          .dark .markdown-body h2 {
            border-bottom: 1px solid #30363d;
          }
          .markdown-body h3 {
            font-size: 1.25em;
          }
          .markdown-body h4 {
            font-size: 1em;
          }
          .markdown-body p {
            margin-top: 0;
            margin-bottom: 16px;
          }
          /* Inline code */
          .markdown-body code {
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 3px;
            font-size: 85%;
            margin: 0;
            padding: 0.2em 0.4em;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
          }
          .dark .markdown-body code {
            background-color: rgba(110, 118, 129, 0.4);
          }
          /* Code blocks */
          .markdown-body pre {
            background-color: #f6f8fa;
            border: 1px solid #d0d7de;
            border-radius: 6px;
            font-size: 14px;
            line-height: 1.45;
            overflow: auto;
            padding: 16px;
            margin-bottom: 16px;
            color: #24292f;
          }
          .dark .markdown-body pre {
            background-color: #161b22;
            border: 1px solid #30363d;
            color: #e6edf3;
          }
          .markdown-body pre code {
            background-color: transparent;
            border: 0;
            display: block;
            line-height: inherit;
            margin: 0;
            overflow: visible;
            padding: 0;
            word-wrap: normal;
            color: inherit;
          }
          /* Syntax highlighted code blocks will override this */
          .markdown-body pre.syntax-highlighted {
            background-color: #1e1e1e;
            border: none;
            padding: 0;
            color: #d4d4d4;
          }
          .markdown-body table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            margin-bottom: 16px;
          }
          .markdown-body table tr {
            background-color: #ffffff;
            border-top: 1px solid #c6cbd1;
          }
          .dark .markdown-body table tr {
            background-color: #0d1117;
            border-top: 1px solid #30363d;
          }
          .markdown-body table tr:nth-child(2n) {
            background-color: #f6f8fa;
          }
          .dark .markdown-body table tr:nth-child(2n) {
            background-color: #161b22;
          }
          .markdown-body table th,
          .markdown-body table td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
          }
          .dark .markdown-body table th,
          .dark .markdown-body table td {
            border: 1px solid #30363d;
          }
          .markdown-body table th {
            font-weight: 600;
            background-color: #f6f8fa;
          }
          .dark .markdown-body table th {
            background-color: #161b22;
          }
          .markdown-body ul,
          .markdown-body ol {
            margin-bottom: 16px;
            padding-left: 2em;
          }
          .markdown-body li {
            margin-top: 0.25em;
          }
          .markdown-body blockquote {
            border-left: 0.25em solid #dfe2e5;
            color: #6a737d;
            padding: 0 1em;
            margin: 0 0 16px 0;
          }
          .dark .markdown-body blockquote {
            border-left-color: #30363d;
            color: #8b949e;
          }
          .markdown-body a {
            color: #0366d6;
            text-decoration: none;
          }
          .dark .markdown-body a {
            color: #58a6ff;
          }
          .markdown-body a:hover {
            text-decoration: underline;
          }
          .markdown-body strong {
            font-weight: 600;
          }
          .markdown-body hr {
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
          }
          .dark .markdown-body hr {
            background-color: #30363d;
          }
        `}</style>
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-start">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm flex-wrap">
              <Link
                href="/reports"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Reports
              </Link>
              {slugPath.map((segment, index) => {
                const isLast = index === slugPath.length - 1;
                const href = `/reports/${slugPath.slice(0, index + 1).join('/')}`;

                return (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-gray-400 dark:text-gray-500">/</span>
                    {isLast ? (
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {segment}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        {segment}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-200">
            <div className="px-6 py-8 sm:px-8 md:px-12">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{filename}</p>
              </div>

              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';

                      return !inline && language ? (
                        <div className="syntax-highlighted">
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={language}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: '6px',
                              fontSize: '14px',
                              padding: '16px',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getAllMarkdownFiles(dirPath: string, basePath: string = ''): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Recursively get files from subdirectories (including hidden folders)
      const nestedFiles = await getAllMarkdownFiles(fullPath, relativePath);
      files.push(...nestedFiles);
    } else if (entry.name.endsWith('.md')) {
      files.push(relativePath);
    }
  }

  return files;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const reportsDirectory = path.join(process.cwd(), 'reports');

  try {
    const markdownFiles = await getAllMarkdownFiles(reportsDirectory);

    const paths = markdownFiles.map((filePath) => {
      // Remove .md extension and split by / to create slug array
      const slugPath = filePath.replace(/\.md$/, '');
      const slugArray = slugPath.split('/');

      return {
        params: {
          slug: slugArray,
        },
      };
    });

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error reading reports directory:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Ensure slug is always an array
  let slugArray: string[];
  if (Array.isArray(params?.slug)) {
    slugArray = params.slug;
  } else if (typeof params?.slug === 'string') {
    slugArray = params.slug.split(',');
  } else {
    slugArray = [];
  }

  // Join the slug array to create the file path
  const filePath = path.join(process.cwd(), 'reports', ...slugArray) + '.md';

  // Get just the filename (last part of the path)
  const filename = slugArray[slugArray.length - 1] + '.md';

  // Use the exact filename as title (without .md extension)
  const title = slugArray[slugArray.length - 1];

  try {
    const content = await fs.readFile(filePath, 'utf-8');

    return {
      props: {
        content,
        title,
        filename,
        slugPath: slugArray,
      },
    };
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return {
      notFound: true,
    };
  }
};
