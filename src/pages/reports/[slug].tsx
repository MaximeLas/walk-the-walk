import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ReportPageProps {
  content: string;
  title: string;
  filename: string;
}

export default function ReportPage({ content, title, filename }: ReportPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        .markdown-body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #24292e;
          padding-left: 24px;
          padding-right: 24px;
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
        .markdown-body h2 {
          font-size: 1.5em;
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
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
        .markdown-body code {
          background-color: rgba(27, 31, 35, 0.05);
          border-radius: 3px;
          font-size: 85%;
          margin: 0;
          padding: 0.2em 0.4em;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        }
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
        .markdown-body table tr:nth-child(2n) {
          background-color: #f6f8fa;
        }
        .markdown-body table th,
        .markdown-body table td {
          border: 1px solid #dfe2e5;
          padding: 6px 13px;
        }
        .markdown-body table th {
          font-weight: 600;
          background-color: #f6f8fa;
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
        .markdown-body a {
          color: #0366d6;
          text-decoration: none;
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
      `}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/reports"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Reports
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8 sm:px-8 md:px-12">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-sm text-gray-500">{filename}</p>
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
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const reportsDirectory = path.join(process.cwd(), 'reports');

  try {
    const filenames = await fs.readdir(reportsDirectory);
    const markdownFiles = filenames.filter((name) => name.endsWith('.md'));

    const paths = markdownFiles.map((filename) => ({
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    }));

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
  const slug = params?.slug as string;
  const filename = `${slug}.md`;
  const filePath = path.join(process.cwd(), 'reports', filename);

  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Convert filename to a more readable title
    const title = slug
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      props: {
        content,
        title,
        filename,
      },
    };
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return {
      notFound: true,
    };
  }
};
