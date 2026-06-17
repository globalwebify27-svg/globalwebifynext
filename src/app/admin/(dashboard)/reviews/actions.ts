'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

export async function getReviews() {
  await requireAdmin();
  return await db.review.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function saveReview(formData: {
  id?: number;
  author: string;
  text: string;
  rating: number;
}) {
  await requireAdmin();

  const data = {
    author: formData.author.trim(),
    text: formData.text.trim().substring(0, 280),
    rating: Math.max(1, Math.min(5, formData.rating)),
  };

  let savedRecord;
  if (formData.id) {
    savedRecord = await db.review.update({
      where: { id: formData.id },
      data,
    });
  } else {
    savedRecord = await db.review.create({
      data,
    });
  }

  // Revalidate homepage since reviews are rendered there
  revalidatePath('/');
  revalidatePath('/admin/reviews');

  return { success: true, id: savedRecord.id };
}

export async function deleteReview(id: number) {
  await requireAdmin();
  
  await db.review.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/admin/reviews');
  return { success: true };
}
