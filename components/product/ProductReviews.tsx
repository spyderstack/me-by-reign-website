'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star, CaretRight, ChatTeardropText } from '@phosphor-icons/react'
import { submitReview, getApprovedReviews } from '@/app/actions/reviews'

interface Review {
  id: string
  author_name: string
  author_email?: string
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

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    formData.append('rating', ratingSelected.toString())

    const result = await submitReview(productId, productName, formData)

    if (result.error) {
      setSubmitStatus('error')
    } else {
      setSubmitStatus('success')
      formElement.reset()
      setRatingSelected(0)
    }
    setSubmitting(false)
  }

  return (
    <div className="mt-16 border-t border-gray-100 pt-20 pb-12">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-10 h-px bg-[#C5A059]" />
        <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">
          Customer Experiences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Reviews List */}
        <div>
          <h3 className="text-3xl mb-10 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            Reviews
          </h3>
          
          {loading ? (
            <p className="text-gray-400 text-sm uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="bg-[#faf9f6] p-10 text-center flex flex-col items-center justify-center">
              <ChatTeardropText size={40} weight="thin" className="text-[#C5A059] mb-4" />
              <p className="text-gray-500 italic" style={{ fontFamily: "'Playfair Display', serif" }}>No reviews yet. Be the first to share your experience.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-12 last:border-0 relative">
                  <div className="absolute top-0 right-0 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex text-[#C5A059] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} weight={i < review.rating ? 'fill' : 'regular'} />
                    ))}
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    "{review.content}"
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-900 font-bold">
                    — {review.author_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="bg-[#faf9f6] p-10 md:p-14 h-fit sticky top-32">
          <h3 className="text-2xl mb-8 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            Write a Review
          </h3>
          
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#C5A059]/20 p-8 text-center"
              >
                <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C5A059]">
                  <Star size={24} weight="fill" />
                </div>
                <h4 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Thank You</h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">Your review has been submitted and is pending approval by our curators.</p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingSelected(star)}
                        onMouseEnter={() => setRatingHover(star)}
                        onMouseLeave={() => setRatingHover(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          weight={(ratingHover || ratingSelected) >= star ? 'fill' : 'light'}
                          className={(ratingHover || ratingSelected) >= star ? 'text-[#C5A059]' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="authorName" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Name</label>
                    <input
                      type="text"
                      name="authorName"
                      id="authorName"
                      required
                      placeholder="Jane Doe"
                      className="block w-full bg-transparent border-0 border-b border-gray-300 py-3 text-sm focus:ring-0 focus:border-[#C5A059] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="authorEmail" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Email (Optional)</label>
                    <input
                      type="email"
                      name="authorEmail"
                      id="authorEmail"
                      placeholder="jane@example.com"
                      className="block w-full bg-transparent border-0 border-b border-gray-300 py-3 text-sm focus:ring-0 focus:border-[#C5A059] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Your Experience</label>
                  <textarea
                    name="content"
                    id="content"
                    rows={4}
                    required
                    placeholder="Tell us what you loved about this product..."
                    className="block w-full bg-white border border-gray-200 p-4 text-sm focus:ring-0 focus:border-[#C5A059] transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="text-red-500 text-xs uppercase tracking-widest font-bold">An error occurred. Please try again.</div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 uppercase tracking-[0.3em] text-[10px] font-bold text-white bg-black hover:bg-[#C5A059] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {submitting ? 'Submitting...' : (
                    <>
                      Submit Review
                      <CaretRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
