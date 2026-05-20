import { Metadata } from 'next';
import WebDevClient from './WebDevClient';
import { db } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // Enable ISR cache (purged instantly via revalidatePath when CMS saves changes)

// 🚀 Automatic server-side sync of our custom premium wave asset
try {
  const sourcePath = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\5359d0dc-a535-4c31-a7ae-e01009de1174\\web_dev_banner_bg_1779106518831.png";
  const destDir = path.join(process.cwd(), 'public');
  const destPath = path.join(destDir, 'web-dev-banner-bg.png');
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log("Successfully synced premium wave banner asset to public folder!");
  }
} catch (error) {
  console.error("Auto-sync asset copy error:", error);
}

export const metadata: Metadata = {
  title: 'Next-Gen Web Development Services | Next.js & React Experts | GlobalWeblify',
  description: 'Scale your business with premium Web Development Services by GlobalWeblify. We build lightning-fast, secure, and custom Next.js & React websites engineered for 100/100 Core Web Vitals, organic search indexing, and high conversions.',
  keywords: [
    'Web Development Services', 
    'Custom Web Design', 
    'Next.js Developers', 
    'React Web Development', 
    'Jamstack Architecture', 
    'E-commerce Solutions', 
    'API Integrations',
    'Core Web Vitals Optimization',
    'SEO Friendly Web Development'
  ]
};

export default async function WebDevelopmentPage() {
  const pageData = await db.servicePage.findFirst({
    where: { slug: { in: ['web-development', '/web-development'] } }
  });

  const subMenus = await db.servicePage.findMany({
    where: { 
      category: 'website', 
      isActive: true,
      slug: { notIn: ['web-development', '/web-development'] }
    },
    select: { title: true, slug: true, seoDescription: true, content: true, image: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return <WebDevClient subMenus={subMenus} pageData={pageData} />;
}
