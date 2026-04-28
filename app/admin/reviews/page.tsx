import AdminReviewsClient from './AdminReviewsClient'

export const metadata = {
  title: 'Admin - Reviews Management',
}

export default function AdminReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reviews Management</h1>
        <AdminReviewsClient />
      </div>
    </div>
  )
}
