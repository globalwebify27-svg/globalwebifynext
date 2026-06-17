import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const { id, bgType, bgColor, bgGradientStart, bgGradientEnd, mobileImage, bgImage, slug } = await request.json();
    console.log('API Save Background Request Body:', { id, bgType, bgColor, bgGradientStart, bgGradientEnd, mobileImage, bgImage, slug });
    
    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const updated = await db.servicePage.update({
      where: { id: Number(id) },
      data: {
        bgType: bgType || 'image',
        bgColor: bgColor || null,
        bgGradientStart: bgGradientStart || null,
        bgGradientEnd: bgGradientEnd || null,
        mobileImage: mobileImage || null,
        bgImage: bgImage || null,
      }
    });

    // Revalidate routes
    const slugPath = slug ? (slug.startsWith('/') ? slug : `/${slug}`) : '';
    if (slugPath) {
      revalidatePath(slugPath);
    }
    revalidatePath('/[slug]');
    revalidatePath('/[slug]/[serviceSlug]');

    return NextResponse.json({ success: true, id: updated.id });
  } catch (error: any) {
    console.error('API Save Background Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save background settings' }, { status: 500 });
  }
}
