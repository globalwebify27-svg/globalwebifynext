import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Digital Insights & Blog | GlobalWebify',
  description: 'Stay updated with the latest trends in technology, marketing, and business growth on the GlobalWebify blog.',
  keywords: ['Web Development Blog', 'SEO Tips', 'Digital Marketing Insights', 'Tech Trends']
};

import { db } from '@/lib/db';

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await db.blogPost.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Could not fetch blog posts from database:", error);
  }

  return <BlogClient posts={posts} />;
}
