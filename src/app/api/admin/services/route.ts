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
    console.log('API Save Service Request Body:', formData);
    
    const data = {
      title: formData.title,
      contentTitle: formData.contentTitle || null,
      slug: formData.slug.startsWith('/') ? formData.slug : `/${formData.slug}`,
      category: formData.category,
      seoTitle: formData.seoTitle || null,
      seoDescription: formData.seoDescription || null,
      heroDescription: formData.heroDescription || null,
      seoKeywords: formData.seoKeywords || null,
      content: formData.content,
      image: formData.image || null,
      isActive: formData.isActive ?? true,
      bgType: formData.bgType || 'image',
      bgColor: formData.bgColor || null,
      bgGradientStart: formData.bgGradientStart || null,
      bgGradientEnd: formData.bgGradientEnd || null,
      mobileImage: formData.mobileImage || null,
      bgImage: formData.bgImage || null,
    };

    let savedRecord;
    if (formData.id) {
      // Update existing service page
      savedRecord = await db.servicePage.update({
        where: { id: formData.id },
        data,
      });
    } else {
      // Create new service page
      savedRecord = await db.servicePage.create({
        data,
      });
    }

    // Trigger path revalidations so updates appear instantly without full rebuilds
    const slugPath = data.slug.startsWith('/') ? data.slug : `/${data.slug}`;
    revalidatePath(slugPath);
    revalidatePath('/web-development');
    revalidatePath('/sitemap.ts');
    revalidatePath('/[slug]');
    revalidatePath('/[slug]/[serviceSlug]');
    revalidatePath('/admin/services');

    return NextResponse.json({ success: true, id: savedRecord.id, slug: savedRecord.slug });
  } catch (error: any) {
    console.error('API Save Service Error:', error);
    return NextResponse.json({ error: 'Failed to save service page. Please try again.' }, { status: 500 });
  }
}
