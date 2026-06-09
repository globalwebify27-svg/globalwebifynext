import React from 'react';
import { getApplications, getLockDuration } from '../actions';
import JobApplicationsListClient from '@/features/admin/components/careers/JobApplicationsListClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCareersApplicationsPage() {
  let applications: any[] = [];
  let lockDays = 30;
  try {
    applications = await getApplications();
    lockDays = await getLockDuration();
  } catch (error) {
    console.error('Failed to query job applications:', error);
  }

  return (
    <JobApplicationsListClient 
      applications={JSON.parse(JSON.stringify(applications))} 
      initialLockDays={lockDays} 
    />
  );
}
