'use server';

import { db } from '@/lib/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

export async function saveJob(formData: {
  id?: number;
  title: string;
  slug: string;
  description: string;
  requirements?: string;
  location: string;
  type: string;
  experience?: string;
  salary?: string;
  category: string;
  lastDate?: string | Date;
  isActive?: boolean;
}) {
  await requireAdmin();

  const data = {
    title: formData.title,
    slug: formData.slug,
    description: formData.description,
    requirements: formData.requirements || null,
    location: formData.location || 'Ranchi',
    type: formData.type || 'Full-time',
    experience: formData.experience || null,
    salary: formData.salary || null,
    category: formData.category || 'Development',
    lastDate: formData.lastDate ? new Date(formData.lastDate) : null,
    isActive: formData.isActive ?? true,
  };

  let savedRecord;
  if (formData.id) {
    savedRecord = await db.job.update({
      where: { id: formData.id },
      data,
    });
  } else {
    savedRecord = await db.job.create({
      data,
    });
  }

  // Revalidate public career paths
  revalidatePath('/career');
  revalidatePath(`/career/${data.slug}`);
  revalidatePath('/admin/careers');
  revalidateTag('jobs');

  return { success: true, id: savedRecord.id, slug: savedRecord.slug };
}

export async function deleteJob(id: number) {
  await requireAdmin();
  const job = await db.job.findUnique({
    where: { id },
  });

  if (job) {
    await db.job.delete({
      where: { id },
    });
    revalidatePath('/career');
    revalidatePath(`/career/${job.slug}`);
  }

  revalidatePath('/admin/careers');
  revalidateTag('jobs');
}

export async function toggleJobStatus(id: number, active: boolean) {
  await requireAdmin();
  const job = await db.job.update({
    where: { id },
    data: { isActive: active },
  });

  revalidatePath('/career');
  revalidatePath(`/career/${job.slug}`);
  revalidatePath('/admin/careers');
  revalidateTag('jobs');
}

export async function getApplications() {
  await requireAdmin();
  return await db.jobApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteApplication(id: number) {
  await requireAdmin();
  await db.jobApplication.delete({
    where: { id },
  });
  revalidatePath('/admin/careers/applications');
}

export async function getLockDuration() {
  try {
    const setting = await db.siteSetting.findUnique({
      where: { key: 'career_lock_days' },
    });
    return setting ? parseInt(setting.value, 10) : 30;
  } catch (err) {
    return 30;
  }
}

export async function saveLockDuration(days: number) {
  await requireAdmin();
  if (isNaN(days) || days < 0) throw new Error('Invalid number of days');
  
  await db.siteSetting.upsert({
    where: { key: 'career_lock_days' },
    update: { value: days.toString() },
    create: { key: 'career_lock_days', value: days.toString() },
  });
  
  revalidatePath('/career');
  return { success: true };
}
