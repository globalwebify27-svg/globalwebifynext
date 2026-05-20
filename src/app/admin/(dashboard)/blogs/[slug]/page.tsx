import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import BlogPostForm from '../BlogPostForm';

interface Props {
  params: { slug: string };
}

export default async function EditBlogPostPage({ params }: Props) {
  // Blog slug starts with '/blog/' in the database. Format it correctly.
  const blogSlug = `/blog/${params.slug}`;

  const post = await db.blogPost.findUnique({
    where: { slug: blogSlug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 font-lexend uppercase tracking-tight">
          Edit Blog Post: {post.title}
        </h2>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Update article details, publication state, and SEO metadata settings
        </p>
      </div>

      <BlogPostForm post={post} />
    </div>
  );
}
