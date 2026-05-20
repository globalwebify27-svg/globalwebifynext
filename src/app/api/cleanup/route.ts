import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const servicesIdPath = path.join(process.cwd(), 'src/app/admin/(dashboard)/services/[id]');
    const blogsIdPath = path.join(process.cwd(), 'src/app/admin/(dashboard)/blogs/[id]');

    if (fs.existsSync(servicesIdPath)) {
      fs.rmSync(servicesIdPath, { recursive: true, force: true });
    }
    if (fs.existsSync(blogsIdPath)) {
      fs.rmSync(blogsIdPath, { recursive: true, force: true });
    }

    return NextResponse.json({ success: true, message: 'Cleanup complete' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
