'use client';

import React, { useState } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { saveJob } from '@/app/admin/(dashboard)/careers/actions';
import { ArrowLeft, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import ContentEditor from '@/features/admin/components/shared/ContentEditor';
import { useRouter } from 'next/navigation';

interface Job {
  id?: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  experience?: string;
  salary?: string;
  category?: string;
  lastDate?: string | Date;
  description: string;
  requirements?: string;
  isActive?: boolean;
}

export default function JobForm({ job }: { job?: Job }) {
  const router = useRouter();

  const [title, setTitle] = useState(job?.title || '');
  const [slug, setSlug] = useState(job?.slug || '');
  const [location, setLocation] = useState(job?.location || 'Ranchi, Jharkhand');
  const [type, setType] = useState(job?.type || 'Full-time');
  const [experience, setExperience] = useState(job?.experience || '');
  const [salary, setSalary] = useState(job?.salary || '');
  const [category, setCategory] = useState(job?.category || 'Web Development');
  const [lastDate, setLastDate] = useState(
    job?.lastDate
      ? new Date(job.lastDate).toISOString().split('T')[0]
      : ''
  );
  const [description, setDescription] = useState(job?.description || '');
  const [requirements, setRequirements] = useState(job?.requirements || '');
  const [isActive, setIsActive] = useState(job?.isActive ?? true);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!job?.id) {
      const suggestedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(suggestedSlug);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSaving(true);
    try {
      const result = await saveJob({
        id: job?.id,
        title,
        slug,
        location,
        type,
        experience,
        salary,
        category,
        lastDate: lastDate || undefined,
        description,
        requirements,
        isActive,
      });

      if (result.success) {
        showToast('Job posting saved successfully!', 'success');
        setTimeout(() => {
          router.push('/admin/careers');
        }, 1500);
      } else {
        throw new Error('Failed to save job');
      }
    } catch (err) {
      if (isRedirectError(err)) {
        throw err;
      }
      console.error('Job Form Submit Error:', err);
      showToast('Error saving job: ' + (err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full font-sans relative">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[9999] px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border ${
            toast.type === 'success'
              ? 'bg-[#1a8b4c] text-white border-[#15703d]'
              : 'bg-red-600 text-white border-red-700'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span className="text-sm tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/admin/careers"
          className="inline-flex items-center gap-2 text-[#1a8b4c] font-black text-xs uppercase tracking-wider hover:gap-3 transition-all font-poppins"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" /> Back to Job Postings
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        {/* Core Details Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest font-poppins">
              Job Position Details
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Specify key characteristics of the job post
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Job Slug (URL Path) *
              </label>
              <input
                type="text"
                required
                disabled={!!job?.id}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. senior-frontend-engineer"
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
              {job?.id && (
                <span className="text-[9px] text-amber-600 font-bold uppercase tracking-wider">
                  ⚠️ Job slugs cannot be edited after creation to prevent broken links.
                </span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              >
                <option value="Web Development">Web Development</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Sales & Business Development">Sales & Business Development</option>
              </select>
            </div>

            {/* Last Date to Apply */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Last Date to Apply (Expiry Date)
              </label>
              <input
                type="date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ranchi, Jharkhand (or Remote)"
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              />
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Job Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Experience Required */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Experience Level
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 2-5 Years"
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              />
            </div>

            {/* Salary Range */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                Salary (Numerical amount, e.g. 450000 or range 400000 - 600000)
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. 400000 or 400000 - 600000 (No Rs symbol)"
                className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3 pt-2 md:col-span-2">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#1a8b4c] focus:ring-[#1a8b4c]/20 border-gray-300"
              />
              <label htmlFor="isActive" className="text-xs font-bold text-gray-700 uppercase tracking-wide cursor-pointer">
                Active Posting (Visible on Website Careers section)
              </label>
            </div>
          </div>
        </div>

        {/* Job Description editor card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest font-poppins">
              Job Description *
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Detailed responsibilities, team overview, and benefits
            </p>
          </div>
          <ContentEditor
            content={description}
            setContent={setDescription}
            placeholder="Describe the job role, responsibilities, culture, and what candidate will do..."
          />
        </div>

        {/* Requirements editor card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest font-poppins">
              Requirements & Skills
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Skills, education, tool expertise required
            </p>
          </div>
          <textarea
            rows={5}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g.&#10;- Proficient in React, Next.js, CSS&#10;- Good communication skills&#10;- 2+ years of production experience"
            className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:bg-white transition-all"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Link
            href="/admin/careers"
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider font-poppins flex items-center gap-1"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#1a8b4c] hover:bg-[#15703d] text-white font-black py-2.5 px-6 rounded-xl shadow-sm hover:shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2"
          >
            {saving ? 'Saving...' : 'Save Job Posting'}
          </button>
        </div>
      </form>
    </div>
  );
}
