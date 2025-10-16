import { GetStaticProps } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';

interface FileItem {
  type: 'file';
  filename: string;
  title: string;
  slug: string;
  path: string;
}

interface FolderItem {
  type: 'folder';
  name: string;
  title: string;
  path: string;
  children: ReportItem[];
}

type ReportItem = FileItem | FolderItem;

interface ReportsIndexProps {
  reports: ReportItem[];
}

export default function ReportsIndex({ reports = [] }: ReportsIndexProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

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

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const renderReportItem = (item: ReportItem, depth: number) => {
    const indent = depth * 24; // 24px per level

    if (item.type === 'file') {
      return (
        <Link
          key={item.slug}
          href={`/reports/${item.slug}`}
          className="block p-5 rounded-lg border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-all"
          style={{ marginLeft: `${indent}px` }}
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {item.title}
          </h2>
        </Link>
      );
    }

    // Folder rendering
    const isExpanded = expandedFolders.has(item.path);

    return (
      <div key={item.path}>
        <button
          onClick={() => toggleFolder(item.path)}
          className="w-full text-left p-5 rounded-lg border-l-4 border-l-purple-500 dark:border-l-purple-400 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-all"
          style={{ marginLeft: `${indent}px` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex-1">
              {item.title}
            </h2>
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            {item.children.map((child) => renderReportItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-200">
            <div className="px-6 py-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Documentation Reports
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Browse project documentation and reports
                  </p>
                </div>

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

              <div className="space-y-3">
                {reports.map((item) => renderReportItem(item, 0))}
              </div>

              {reports.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No reports found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function readReportsDirectory(dirPath: string, relativePath: string = ''): Promise<ReportItem[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const items: ReportItem[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const itemRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      const children = await readReportsDirectory(fullPath, itemRelativePath);

      // Only include folders that have markdown files (directly or nested)
      if (children.length > 0) {
        items.push({
          type: 'folder',
          name: entry.name,
          title: entry.name, // Keep exact folder name
          path: itemRelativePath,
          children,
        });
      }
    } else if (entry.name.endsWith('.md')) {
      const slug = itemRelativePath.replace(/\.md$/, '');
      const title = entry.name.replace(/\.md$/, ''); // Keep exact filename

      items.push({
        type: 'file',
        filename: entry.name,
        title,
        slug,
        path: itemRelativePath,
      });
    }
  }

  // Sort: folders first, then files, both alphabetically
  items.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.title.localeCompare(b.title);
  });

  return items;
}

export const getStaticProps: GetStaticProps = async () => {
  const reportsDirectory = path.join(process.cwd(), 'reports');

  try {
    const reports = await readReportsDirectory(reportsDirectory);

    return {
      props: {
        reports,
      },
    };
  } catch (error) {
    console.error('Error reading reports directory:', error);
    return {
      props: {
        reports: [],
      },
    };
  }
};
