import { db } from '@/lib/db';
import BreadcrumbClientWrapper from './BreadcrumbClientWrapper';

export default async function BreadcrumbWrapper() {
  let dynamicPages = [];
  try {
    dynamicPages = await db.servicePage.findMany({
      select: { slug: true, title: true, category: true }
    });
  } catch (error) {
    console.error('Failed to fetch dynamic pages for breadcrumbs', error);
  }

  return <BreadcrumbClientWrapper dynamicPages={dynamicPages} />;
}
