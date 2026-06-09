'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, Plus, Search, CheckCircle2, XCircle, Briefcase, MapPin, Clock } from 'lucide-react';
import { deleteJob, toggleJobStatus } from '@/app/admin/(dashboard)/careers/actions';

interface Job {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  experience?: string;
  salary?: string;
  isActive: boolean;
  updatedAt: Date;
}

export default function JobListClient({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await deleteJob(id);
        setJobs(jobs.filter((j) => j.id !== id));
        showToast('Job posting deleted successfully!', 'success');
      } catch (error) {
        showToast('Failed to delete job posting.', 'error');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await toggleJobStatus(id, !currentStatus);
      setJobs(jobs.map((j) => (j.id === id ? { ...j, isActive: !currentStatus } : j)));
      showToast(`Job posting ${!currentStatus ? 'activated' : 'deactivated'} successfully!`, 'success');
    } catch (err) {
      showToast('Failed to toggle status.', 'error');
    }
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.type.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Page Title & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[#1a8b4c] font-poppins uppercase tracking-tight">
            Job Openings
          </h3>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
            Manage your company's career opportunities and listings
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Advanced Search Input Bar */}
          <div className="relative w-full sm:w-80 group">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 group-hover:text-[#1a8b4c] transition-colors">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search postings..."
              className="w-full bg-white border-2 border-gray-150 hover:border-gray-250 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c] focus:ring-4 focus:ring-[#1a8b4c]/5 transition-all shadow-sm"
            />
          </div>

          {/* New Job Posting Button */}
          <Link
            href="/admin/careers/new"
            className="bg-[#1a8b4c] hover:bg-[#15703d] text-white font-black py-3 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Position
          </Link>
        </div>
      </div>

      {/* Main Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-lg">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-green-50 text-[#1a8b4c] flex items-center justify-center mx-auto text-3xl">
              💼
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest font-heading">
              No Positions Posted
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              Currently there are no job postings. Click the button above to add a new job listing.
            </p>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center text-gray-400 font-bold shadow-sm">
          No matching jobs found. Try modifying your search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-100 hover:border-gray-250 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[200px] group"
            >
              <div>
                <div className="flex items-start justify-between gap-2.5">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border bg-green-50 text-[#1a8b4c] border-green-150">
                    {job.type}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(job.id, job.isActive)}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border transition-all flex-shrink-0 ${
                      job.isActive
                        ? 'bg-green-50 text-[#1a8b4c] border-green-200 hover:bg-green-100/80'
                        : 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100/80'
                    }`}
                    title={job.isActive ? 'Deactivate Posting' : 'Activate Posting'}
                  >
                    {job.isActive ? 'Active' : 'Draft'}
                  </button>
                </div>

                <h4 className="text-base font-black text-gray-900 mt-3 line-clamp-1 group-hover:text-[#1a8b4c] transition-colors leading-tight">
                  {job.title}
                </h4>

                <div className="flex items-center gap-4 mt-2.5 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#1a8b4c]" />
                    {job.location}
                  </span>
                  {job.experience && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#1a8b4c]" />
                      {job.experience}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-3">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  Updated {new Date(job.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/career/${job.slug}`}
                    target="_blank"
                    className="p-2 hover:bg-gray-50 text-gray-400 hover:text-gray-700 rounded-xl border border-gray-100 transition-colors"
                    title="View Live Posting"
                  >
                    <Briefcase size={14} />
                  </Link>

                  <Link
                    href={`/admin/careers/${job.id}`}
                    className="p-2 bg-gray-50 hover:bg-[#1a8b4c] text-gray-600 hover:text-white rounded-xl border border-transparent transition-all"
                    title="Edit Job Post"
                  >
                    <Edit2 size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(job.id)}
                    disabled={deletingId === job.id}
                    className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-xl transition-all"
                    title="Delete Job Post"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Alert Popups */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border animate-in slide-in-from-bottom-4 duration-300 ${
            toast.type === 'success' ? 'bg-gray-900 text-white border-gray-800' : 'bg-red-600 text-white border-red-700'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} className="text-[#1a8b4c]" /> : <XCircle size={18} />}
          <span className="text-xs tracking-wide">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
