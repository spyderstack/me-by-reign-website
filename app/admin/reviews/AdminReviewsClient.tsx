'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, X, Clock, Star, CaretRight, LockKey, EnvelopeSimple } from '@phosphor-icons/react'
import { getAdminReviews, updateReviewStatus } from '@/app/actions/reviews'

interface Review {
  id: string
  product_id: string
  author_name: string
  author_email: string | null
  rating: number
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

type TabType = 'pending' | 'approved' | 'rejected'

export default function AdminReviewsClient() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('pending')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await getAdminReviews(password)

    if (result.error) {
      setError('Invalid credentials.')
    } else {
      setReviews(result.reviews as Review[] || [])
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleAction = async (reviewId: string, status: 'approved' | 'rejected' | 'pending') => {
    const result = await updateReviewStatus(reviewId, status, password)

    if (result.error) {
      alert(result.error)
    } else {
      setReviews(reviews.map(r => r.id === reviewId ? { ...r, status } : r))
    }
  }

  const filteredReviews = useMemo(() => {
    return reviews.filter(r => r.status === activeTab)
  }, [reviews, activeTab])

  const counts = useMemo(() => {
    return {
      pending: reviews.filter(r => r.status === 'pending').length,
      approved: reviews.filter(r => r.status === 'approved').length,
      rejected: reviews.filter(r => r.status === 'rejected').length,
    }
  }, [reviews])

  if (!isAuthenticated) {
    return (

      <div className="flex flex-col items-center justify-center py-20">


        <div className="w-full max-w-md bg-white p-12 border border-gray-100 shadow-2xl shadow-black/5">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#faf9f6] rounded-full flex items-center justify-center text-[#C5A059]">
              <LockKey size={32} weight="thin" />
            </div>
          </div>
          <h2 className="text-2xl text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Curator Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-transparent border-0 border-b border-gray-300 py-3 text-sm focus:ring-0 focus:border-[#C5A059] transition-colors text-center tracking-widest"
                required
              />
            </div>
            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 uppercase tracking-[0.3em] text-[10px] font-bold text-white bg-black hover:bg-[#C5A059] transition-all duration-500"
            >
              {loading ? 'Authenticating...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100 pb-10 mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-[#C5A059]" />
          <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">
            CMS Portal
          </p>
        </div>
        <h1 className="text-4xl text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
          Review Curation
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-12">
        {(['pending', 'approved', 'rejected'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-bold transition-colors ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {tab} ({counts[tab]})
            {activeTab === tab && (
              <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]" />
            )}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredReviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="col-span-full py-20 text-center text-gray-400 text-sm uppercase tracking-widest font-medium"
            >
              No {activeTab} reviews found.
            </motion.div>
          ) : (
            filteredReviews.map((review) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={review.id}
                className="bg-[#faf9f6] border border-gray-100 p-8 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {review.author_name}
                    </h3>
                    {review.author_email && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <EnvelopeSimple size={14} />
                        <a href={`mailto:${review.author_email}`} className="hover:text-[#C5A059] transition-colors">{review.author_email}</a>
                      </div>
                    )}
                    <div className="flex text-[#C5A059]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} weight={i < review.rating ? 'fill' : 'regular'} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold whitespace-nowrap">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-mono lowercase text-gray-300 text-[8px] truncate max-w-[80px]" title={review.product_id}>
                      {review.product_id.split('/').pop()}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm flex-grow mb-8 italic leading-relaxed border-l-2 border-[#C5A059]/30 pl-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  "{review.content}"
                </p>

                <div className="flex gap-3 mt-auto border-t border-gray-200 pt-6">
                  {activeTab !== 'approved' && (
                    <button
                      onClick={() => handleAction(review.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-2 bg-black text-white text-[9px] uppercase tracking-widest font-bold py-3 hover:bg-[#C5A059] transition-colors"
                    >
                      <Check size={14} weight="bold" /> Approve
                    </button>
                  )}
                  {activeTab !== 'rejected' && (
                    <button
                      onClick={() => handleAction(review.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-black text-[9px] uppercase tracking-widest font-bold py-3 hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      <X size={14} weight="bold" /> Reject
                    </button>
                  )}
                  {activeTab !== 'pending' && (
                    <button
                      onClick={() => handleAction(review.id, 'pending')}
                      className="flex items-center justify-center px-4 bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                      title="Move back to Pending"
                    >
                      <Clock size={16} weight="bold" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
