import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { message, stack, digest } = await request.json();

    // CRIT-3 Fix: Prevent DoS & Log Injection by truncating inputs
    // Normal errors won't exceed these limits, but hackers trying to fill the disk will be stopped.
    const safeMessage = typeof message === 'string' ? message.slice(0, 1000) : '';
    const safeStack = typeof stack === 'string' ? stack.slice(0, 3000) : '';
    const safeDigest = typeof digest === 'string' ? digest.slice(0, 500) : '';

    if (!safeMessage && !safeStack) {
      return NextResponse.json({ success: true }); // Silent ignore if no data
    }

    const logContent = `
=== ERROR REPORT ===
Time: ${new Date().toISOString()}
Message: ${safeMessage}
Digest: ${safeDigest}
Stack Trace:
${safeStack}
====================
`;
    fs.appendFileSync(path.join(process.cwd(), 'error_log.txt'), logContent, 'utf8');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
