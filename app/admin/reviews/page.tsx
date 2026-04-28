import AdminReviewsClient from './AdminReviewsClient'

export const metadata = {
  title: 'Admin - Reviews Management',
}

export default function AdminReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Spacer for Nav ── */}
      <div
        className="bg-[#111] w-full"
        style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <AdminReviewsClient />
      </div>
    </div>
  )
}
