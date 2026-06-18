import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    try {
      await requireAdmin();
    } catch (authError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const formData = await request.json();
    
    // Format slug to start with '/blog/' prefix
    let formattedSlug = formData.slug.trim();
    if (!formattedSlug.startsWith('/blog/')) {
      if (formattedSlug.startsWith('/')) {
        formattedSlug = `/blog${formattedSlug}`;
      } else {
        formattedSlug = `/blog/${formattedSlug}`;
      }
    }

    const data = {
      title: formData.title,
      slug: formattedSlug,
      summary: formData.summary,
      content: formData.content,
      image: formData.image || null,
      isActive: formData.isActive,
      seoTitle: formData.seoTitle || null,
      seoDescription: formData.seoDescription || null,
      seoKeywords: formData.seoKeywords || null,
    };

    let savedRecord;
    if (formData.id) {
      // Update existing post
      savedRecord = await db.blogPost.update({
        where: { id: formData.id },
        data,
      });
    } else {
      // Create new post
      savedRecord = await db.blogPost.create({
        data,
      });
    }

    // Revalidate lists and post detail paths
    revalidatePath('/blog');
    revalidatePath(formattedSlug);
    revalidatePath('/blog/[slug]');
    revalidatePath('/sitemap.ts');

    return NextResponse.json({ success: true, id: savedRecord.id, slug: savedRecord.slug });
  } catch (error: any) {
    console.error('API Save Blog Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save blog post' }, { status: 500 });
  }
}
