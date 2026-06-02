import React from 'react';
import { Metadata } from 'next';
import HomeView from '@/features/home/components/HomeView';
import { getHomepageSeo } from '@/app/admin/(dashboard)/homepage/actions';

export const revalidate = 3600; // Cache page and revalidate at most every hour or on-demand via revalidatePath

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getHomepageSeo();
    return {
      title: seo.title || "GlobalWeblify | Web Development & Digital Marketing Agency",
      description: seo.description || "Leading Web Development, SEO, and Digital Marketing Agency in India. We build AI-powered solutions for your business growth.",
      keywords: seo.keywords || "Web Development, SEO, Digital Marketing, AI Solutions, GlobalWeblify",
    };
  } catch (error) {
    console.error("Failed to generate homepage metadata:", error);
    return {
      title: "GlobalWeblify | Web Development & Digital Marketing Agency",
      description: "Leading Web Development, SEO, and Digital Marketing Agency in India. We build AI-powered solutions for your business growth.",
      keywords: "Web Development, SEO, Digital Marketing, AI Solutions, GlobalWeblify",
    };
  }
}

export default async function Home() {
  return <HomeView />;
}
