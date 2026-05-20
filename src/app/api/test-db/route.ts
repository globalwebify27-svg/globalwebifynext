import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const pages = await db.servicePage.findMany({
      select: { id: true, title: true, slug: true, category: true },
      orderBy: { id: 'asc' }
    });
    return NextResponse.json({ success: true, count: pages.length, pages });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}
