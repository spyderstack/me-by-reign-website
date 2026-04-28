'use client'

import { useState } from 'react'
import { getPendingReviews, updateReviewStatus } from '@/app/actions/reviews'

interface Review {
  id: string
  product_id: string
  author_name: string
  rating: number
  content: string
  created_at: string
}

export default function AdminReviewsClient() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await getPendingReviews(password)
    
    if (result.error) {
      setError('Invalid password or error fetching reviews.')
    } else {
      setReviews(result.reviews || [])
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleAction = async (reviewId: string, status: 'approved' | 'rejected') => {
    const result = await updateReviewStatus(reviewId, status, password)
    
    if (result.error) {
      alert(result.error)
    } else {
      setReviews(reviews.filter((r) => r.id !== reviewId))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
          No pending reviews to moderate.
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{review.author_name}</h3>
                <p className="text-sm text-gray-500">Product ID: {review.product_id}</p>
                <div className="flex text-yellow-400 mt-1">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{review.content}</p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => handleAction(review.id, 'approved')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(review.id, 'rejected')}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
