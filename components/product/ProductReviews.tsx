'use client'

import { useState, useEffect } from 'react'
import { Star } from '@phosphor-icons/react'
import { submitReview, getApprovedReviews } from '@/app/actions/reviews'

interface Review {
  id: string
  author_name: string
  rating: number
  content: string
  created_at: string
}

interface ProductReviewsProps {
  productId: string
  productName: string
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [ratingHover, setRatingHover] = useState(0)
  const [ratingSelected, setRatingSelected] = useState(0)

  useEffect(() => {
    async function fetchReviews() {
      const data = await getApprovedReviews(productId)
      setReviews(data || [])
      setLoading(false)
    }
    fetchReviews()
  }, [productId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (ratingSelected === 0) {
      alert('Please select a rating')
      return
    }

    setSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    formData.append('rating', ratingSelected.toString())

    const result = await submitReview(productId, productName, formData)

    if (result.error) {
      setSubmitStatus('error')
    } else {
      setSubmitStatus('success')
      e.currentTarget.reset()
      setRatingSelected(0)
    }
    setSubmitting(false)
  }

  return (
    <div className="mt-16 border-t border-gray-200 pt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Write a Review Form */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
          
          {submitStatus === 'success' ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-md">
              Thank you! Your review has been submitted and is pending approval.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingSelected(star)}
                      onMouseEnter={() => setRatingHover(star)}
                      onMouseLeave={() => setRatingHover(0)}
                      className="focus:outline-none transition-colors"
                    >
                      <Star
                        size={24}
                        weight={(ratingHover || ratingSelected) >= star ? 'fill' : 'regular'}
                        className={(ratingHover || ratingSelected) >= star ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="authorName"
                  id="authorName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Review</label>
                <textarea
                  name="content"
                  id="content"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                />
              </div>

              {submitStatus === 'error' && (
                <div className="text-red-600 text-sm">Failed to submit review. Please try again.</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>

        {/* List of Reviews */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </h3>
          
          {loading ? (
            <p className="text-gray-500">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} weight={i < review.rating ? 'fill' : 'regular'} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{review.author_name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-2">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
