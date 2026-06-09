import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, jobTitle, experience, resumeUrl, coverLetter, linkedin, portfolio } = await req.json();

    if (!name || !email || !phone || !jobTitle || !resumeUrl || !experience) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if candidate is currently locked out for this position
    const existing = await db.jobApplication.findFirst({
      where: {
        email,
        jobTitle,
        lockedUntil: {
          gt: new Date(),
        },
      },
    });

    if (existing) {
      const formattedDate = existing.lockedUntil 
        ? new Date(existing.lockedUntil).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        : 'later';
      return NextResponse.json({ 
        success: false, 
        error: `You have already applied for the "${jobTitle}" position. You will be eligible to reapply after ${formattedDate}.` 
      }, { status: 400 });
    }

    // 2. Fetch lock period configuration from settings (default to 30 days)
    const setting = await db.siteSetting.findUnique({
      where: { key: 'career_lock_days' },
    });
    const lockDays = setting ? parseInt(setting.value, 10) : 30;

    // 3. Compute lockedUntil date
    const lockedUntil = new Date();
    lockedUntil.setDate(lockedUntil.getDate() + lockDays);

    const application = await db.jobApplication.create({
      data: {
        name,
        email,
        phone,
        jobTitle,
        experience,
        resumeUrl,
        coverLetter: coverLetter || null,
        linkedin: linkedin || null,
        portfolio: portfolio || null,
        lockedUntil,
      },
    });

    return NextResponse.json({ success: true, id: application.id });
  } catch (error: any) {
    console.error('Job Application error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
