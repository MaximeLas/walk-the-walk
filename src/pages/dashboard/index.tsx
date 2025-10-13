/**
 * Dashboard / Home Screen (New Mobile-First Implementation)
 *
 * Will be implemented in Step 5 with:
 * - TopNav (search + avatar)
 * - MiddleNav (All/Contacts/Spaces tabs)
 * - PinnedSection
 * - SpaceCardGrid
 * - AddButton (FAB)
 */

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg-app flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Dashboard (Home Screen)
        </h1>
        <p className="text-base text-text-secondary mb-6">
          New mobile-first implementation coming in Step 5.
        </p>
        <p className="text-sm text-text-tertiary">
          Will include: TopNav, MiddleNav, Pinned Spaces, Space Grid, and FAB
        </p>
        <div className="mt-8">
          <a
            href="/demo"
            className="inline-block px-6 py-3 bg-primary-dark text-white rounded-2xl hover:opacity-90 transition-opacity"
          >
            View Component Demo
          </a>
        </div>
      </div>
    </div>
  )
}
