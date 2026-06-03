import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read the file data into a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define public/uploads directory path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize and create a unique file name, forcing .webp extension
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const uniqueFilename = `${Date.now()}-${baseName || 'image'}.webp`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Process image with Sharp: Resize max width to 1600px, compress to WebP at 80% quality
    await sharp(buffer)
      .resize({
        width: 1600,
        withoutEnlargement: true, // Don't scale up smaller images
      })
      .webp({ quality: 80, effort: 4 })
      .toFile(filePath);

    // Return the URL path to access it
    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueFilename}`,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during upload' },
      { status: 500 }
    );
  }
}
