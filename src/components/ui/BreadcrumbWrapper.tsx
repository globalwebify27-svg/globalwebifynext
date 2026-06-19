import { db } from '@/lib/db';
import BreadcrumbClientWrapper from './BreadcrumbClientWrapper';
// Removed unstable_cache because it deadlocks Prisma connection pools in Vercel Serverless
async function getDynamicPages() {
  try {
    const servicePages = await db.servicePage.findMany({
      select: { slug: true, title: true, category: true }
    });
    const blogPosts = await db.blogPost.findMany({
      select: { slug: true, title: true }
    });
    return [
      ...servicePages,
      ...blogPosts.map(p => ({
        slug: p.slug,
        title: p.title,
        category: 'blog'
      }))
    ];
  } catch (error) {
    console.error('Failed to fetch dynamic pages for breadcrumbs', error);
    return [];
  }
}

export default async function BreadcrumbWrapper() {
  const dynamicPages = await getDynamicPages();
  return <BreadcrumbClientWrapper dynamicPages={dynamicPages} />;
}
