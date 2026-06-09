import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import JobForm from '@/features/admin/components/careers/JobForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function EditJobPage({ params }: Props) {
  const jobId = parseInt(params.id, 10);
  if (isNaN(jobId)) {
    notFound();
  }

  const job = await db.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    notFound();
  }

  const formattedJob = {
    id: job.id,
    title: job.title,
    slug: job.slug,
    location: job.location,
    type: job.type,
    experience: job.experience || undefined,
    salary: job.salary || undefined,
    description: job.description,
    requirements: job.requirements || undefined,
    isActive: job.isActive,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 font-lexend uppercase tracking-tight">
          Edit Job Posting: {job.title}
        </h2>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Update the details, description, and requirements for this position
        </p>
      </div>

      <JobForm job={formattedJob} />
    </div>
  );
}
