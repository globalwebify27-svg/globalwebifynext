import React from 'react';
import { db } from '@/lib/db';
import ContactsListClient from '@/features/admin/components/contacts/ContactsListClient';

export const revalidate = 0;

async function fetchSubmissions() {
  try {
    const data = await db.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return data.map(sub => ({
      ...sub,
      createdAt: sub.createdAt ? sub.createdAt.toISOString() : new Date().toISOString()
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ContactsPage() {
  const submissions = await fetchSubmissions();
  return <ContactsListClient initialSubmissions={submissions} />;
}
