import { GetStaticProps } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

interface ReportsIndexProps {
  reports: {
    filename: string;
    title: string;
    slug: string;
  }[];
}

export default function ReportsIndex({ reports }: ReportsIndexProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Documentation Reports
            </h1>
            <p className="text-gray-600 mb-8">
              Browse project documentation and reports
            </p>

            <div className="space-y-3">
              {reports.map((report) => (
                <Link
                  key={report.slug}
                  href={`/reports/${report.slug}`}
                  className="block p-5 rounded-lg border-l-4 border-l-blue-500 bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all"
                >
                  <h2 className="text-lg font-medium text-gray-900">
                    {report.title}
                  </h2>
                </Link>
              ))}
            </div>

            {reports.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No reports found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reportsDirectory = path.join(process.cwd(), 'reports');

  try {
    const filenames = await fs.readdir(reportsDirectory);
    const markdownFiles = filenames.filter((name) => name.endsWith('.md'));

    const reports = markdownFiles.map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      // Convert filename to a more readable title
      const title = slug
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        filename,
        title,
        slug,
      };
    });

    // Sort alphabetically by title
    reports.sort((a, b) => a.title.localeCompare(b.title));

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
