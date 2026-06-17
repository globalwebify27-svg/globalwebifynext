'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Star, Trash2, Edit2, Plus, Save, RotateCcw } from 'lucide-react';
import { getReviews, saveReview, deleteReview } from './actions';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [id, setId] = useState<number | undefined>(undefined);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Status message
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchReviewsList = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsList();
  }, []);

  const handleReset = () => {
    setId(undefined);
    setAuthor('');
    setText('');
    setRating(5);
    setStatusMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      setStatusMsg({ type: 'error', text: 'Author name and review text are required.' });
      return;
    }

    startTransition(async () => {
      try {
        const res = await saveReview({ id, author, text, rating });
        if (res.success) {
          setStatusMsg({
            type: 'success',
            text: id ? 'Review updated successfully!' : 'Review added successfully!',
          });
          handleReset();
          await fetchReviewsList();
        } else {
          setStatusMsg({ type: 'error', text: 'Failed to save review.' });
        }
      } catch (err: any) {
        setStatusMsg({ type: 'error', text: err.message || 'An error occurred.' });
      }
    });
  };

  const handleDelete = async (reviewId: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await deleteReview(reviewId);
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Review deleted successfully!' });
        if (id === reviewId) {
          handleReset();
        }
        await fetchReviewsList();
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete review.' });
    }
  };

  const handleEdit = (review: any) => {
    setId(review.id);
    setAuthor(review.author);
    setText(review.text);
    setRating(review.rating);
    setStatusMsg(null);
    // Scroll form into view on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 font-poppins uppercase tracking-tight">
            Client Reviews & Testimonials
          </h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
            Add, Edit, and Manage Google/Client reviews shown in the Homepage Growth Section.
          </p>
        </div>

        {/* Stats widget */}
        <div className="flex gap-4">
          <div className="bg-[#f0fdf4] border border-[#1a8b4c]/20 rounded-2xl px-5 py-3 flex flex-col justify-center shadow-sm">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Reviews</span>
            <span className="text-xl font-black text-[#1a8b4c]">{reviews.length}</span>
          </div>
          <div className="bg-[#fefcbf] border border-yellow-300 rounded-2xl px-5 py-3 flex flex-col justify-center shadow-sm">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Avg Rating</span>
            <span className="text-xl font-black text-yellow-700 flex items-center gap-1">
              {averageRating} <Star size={16} fill="currentColor" className="text-yellow-500" />
            </span>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-2xl text-sm font-semibold border ${
            statusMsg.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Main Grid: Form Left, List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Review Editor Form */}
        <div className="lg:col-span-5 bg-gray-50 rounded-3xl p-6 border border-gray-200/80 shadow-inner h-fit">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-6 flex items-center gap-2">
            {id ? <Edit2 size={16} className="text-[#1a8b4c]" /> : <Plus size={16} className="text-[#1a8b4c]" />}
            {id ? 'Edit Review' : 'Create New Review'}
          </h3>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            {/* Author */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="author" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Author Name
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. John Doe, Padmacourier"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1a8b4c]/20 focus:border-[#1a8b4c] transition-all bg-white"
                required
              />
            </div>

            {/* Rating Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Star Rating
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform active:scale-90"
                    title={`${star} Star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={28}
                      fill={star <= (hoverRating || rating) ? '#eab308' : 'none'}
                      stroke={star <= (hoverRating || rating) ? '#eab308' : '#cbd5e1'}
                      className="transition-colors duration-150"
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-500 ml-2">({rating} Stars)</span>
              </div>
            </div>

            {/* Review Content */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="text" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Review Text
              </label>
              <textarea
                id="text"
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={280}
                placeholder="Paste the Google review or write client testimony here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1a8b4c]/20 focus:border-[#1a8b4c] transition-all bg-white resize-y"
                required
              />
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                <span className="text-gray-400">Max limit to fit UI: 280 chars</span>
                <span className={text.length >= 280 ? 'text-red-500 font-extrabold' : 'text-gray-500'}>
                  {text.length}/280
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-[#1a8b4c] hover:bg-[#15803d] text-white py-3 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                <Save size={16} />
                {isPending ? 'Saving...' : id ? 'Update' : 'Publish'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center"
                title="Reset Form"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Reviews Listing */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-2">
            Published Reviews ({reviews.length})
          </h3>

          {loading ? (
            <div className="py-12 text-center text-gray-400 font-semibold text-sm">
              Loading reviews database...
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 border-2 border-dashed border-gray-200 rounded-3xl text-center text-gray-400 font-semibold text-sm flex flex-col items-center justify-center gap-2">
              <Star size={32} className="text-gray-300 stroke-[1.5]" />
              <span>No custom reviews in database. Fallback mock data will be shown.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow relative group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-gray-900 text-sm">{review.author}</h4>
                      <div className="flex gap-0.5 mt-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            fill={idx < review.rating ? 'currentColor' : 'none'}
                            stroke="currentColor"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(review)}
                        className="p-2 text-gray-400 hover:text-[#1a8b4c] hover:bg-[#1a8b4c]/10 rounded-lg transition-colors"
                        title="Edit Review"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-line italic">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
