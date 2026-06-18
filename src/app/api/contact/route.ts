import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function ensureTableExists() {
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS ContactSubmission (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NULL,
        service VARCHAR(255) NULL,
        message TEXT NOT NULL,
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
  } catch (e) {
    console.error('Failed to ensure ContactSubmission table exists:', e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    await ensureTableExists();

    await db.$executeRawUnsafe(
      `INSERT INTO ContactSubmission (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)`,
      name,
      email,
      phone || null,
      service || null,
      message
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact submission POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    try {
      await requireAdmin();
    } catch (authError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await ensureTableExists();
    const submissions = await db.$queryRawUnsafe(
      `SELECT * FROM ContactSubmission ORDER BY createdAt DESC`
    );
    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    console.error('Contact submission GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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

    await ensureTableExists();
    await db.$executeRawUnsafe(`DELETE FROM ContactSubmission WHERE id = ?`, id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact submission DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
