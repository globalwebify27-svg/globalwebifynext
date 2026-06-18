import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { message, stack, digest } = await request.json();
    const logContent = `
=== ERROR REPORT ===
Time: ${new Date().toISOString()}
Message: ${message}
Digest: ${digest}
Stack Trace:
${stack}
====================
`;
    fs.appendFileSync(path.join(process.cwd(), 'error_log.txt'), logContent, 'utf8');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
