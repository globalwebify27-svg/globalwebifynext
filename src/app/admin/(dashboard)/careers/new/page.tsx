import React from 'react';
import JobForm from '@/features/admin/components/careers/JobForm';

export const dynamic = 'force-dynamic';

export default function NewJobPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 font-lexend uppercase tracking-tight">
          Create Job Posting
        </h2>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Publish a new career opportunity on the website
        </p>
      </div>

      <JobForm />
    </div>
  );
}
