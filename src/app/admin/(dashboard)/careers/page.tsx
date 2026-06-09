import React from 'react';
import { db } from '@/lib/db';
import JobListClient from '@/features/admin/components/careers/JobListClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCareersPage() {
  let jobs: any[] = [];
  try {
    jobs = await db.job.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to query jobs:', error);
  }

  return <JobListClient jobs={jobs} />;
}
