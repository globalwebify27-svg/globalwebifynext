import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';



export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, companyName, websiteUrl, partnershipType, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    await db.partnershipSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        companyName: companyName || null,
        websiteUrl: websiteUrl || null,
        partnershipType: partnershipType || null,
        message
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Partnership submission POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    try {
      await requireAdmin();
    } catch (authError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const submissions = await db.partnershipSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1000
    });
    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    console.error('Partnership submission GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    try {
      await requireAdmin();
    } catch (authError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ success: false, error: 'Missing id parameter' }, { status: 400 });
    }
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid id parameter' }, { status: 400 });
    }

    await db.partnershipSubmission.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Partnership submission DELETE error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
