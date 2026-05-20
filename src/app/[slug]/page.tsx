import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { replaceLocation, stripHtml } from '@/lib/replaceLocation';
import Link from 'next/link';
import HomeView from '@/components/views/HomeView';
import dynamic from 'next/dynamic';
import { ExpandableContent } from '@/components/ui/ExpandableContent';
import { CardIcon } from '@/components/ui/CardIcon';
import { CheckCircle2, ShieldCheck, Sparkles, Clock, Globe, Code, ArrowRight, Phone, MessageSquare, TrendingUp, Monitor, Smartphone, ShoppingCart, Layout, Palette, Settings, Building2, HeartPulse, Users, Home, ShoppingBag, Briefcase, MapPin, BarChart3, Search, Share2, Megaphone, FileText } from 'lucide-react';

import Hero from '@/components/sections/Hero';
import ServiceHero from '@/components/sections/ServiceHero';

const ServicesGrid = dynamic(() => import('@/components/sections/ServicesGrid'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50 rounded-3xl m-8" />
});

const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] animate-pulse bg-green-50/30 rounded-3xl m-8" />
});

const TechStack = dynamic(() => import('@/components/sections/TechStack'), {
  ssr: true,
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-50 rounded-3xl m-8" />
});

const LatestBlog = dynamic(() => import('@/components/sections/LatestBlog'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50 rounded-3xl m-8" />
});

const ResultsSection = dynamic(() => import('@/components/sections/ResultsSection'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-50 rounded-3xl m-8" />
});

const AboutSEO = dynamic(() => import('@/components/sections/AboutSEO'), {
  ssr: true
});

const TrustSection = dynamic(() => import('@/components/sections/TrustSection'), {
  ssr: true
});

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

// ---------- City config ----------
const CITIES_MAP: Record<string, { name: string; subtitle: string }> = {
  uk: { name: 'United Kingdom', subtitle: 'UK , UK' },
  ranchi: { name: 'Ranchi', subtitle: 'Jharkhand , India' },
  dubai: { name: 'Dubai', subtitle: 'Dubai , UAE' },
  argora: { name: 'Argora', subtitle: 'Jharkhand , India' },
  delhi: { name: 'Delhi', subtitle: 'Delhi , India' },
  noida: { name: 'Noida', subtitle: 'Uttar Pradesh , India' },
  gurugram: { name: 'Gurugram', subtitle: 'Haryana , India' },
  bangalore: { name: 'Bangalore', subtitle: 'Karnataka , India' },
  mumbai: { name: 'Mumbai', subtitle: 'Maharashtra , India' },
  pune: { name: 'Pune', subtitle: 'Maharashtra , India' },
  hyderabad: { name: 'Hyderabad', subtitle: 'Hyderabad , India' },
  kolkata: { name: 'Kolkata', subtitle: 'West Bengal , India' },
};

const CATEGORY_CONFIG: Record<string, { label: string; description: string; icons: string[] }> = {
  website: {
    label: 'Website Development Services',
    description: 'Custom, responsive, and high-performance websites built for your business.',
    icons: ['Monitor', 'Smartphone', 'ShoppingCart', 'Layout', 'Palette', 'Settings', 'Code', 'Briefcase'],
  },
  marketing: {
    label: 'Digital Marketing Services',
    description: 'Data-driven strategies to grow your online presence and generate leads.',
    icons: ['BarChart3', 'Search', 'Share2', 'Megaphone', 'FileText', 'Globe', 'TrendingUp', 'Briefcase'],
  },
  branding: {
    label: 'Branding & PR Services',
    description: 'Build a powerful brand identity that resonates with your audience.',
    icons: ['Palette', 'Globe', 'FileText', 'Megaphone', 'Share2', 'Settings', 'Code', 'Briefcase'],
  },
};

const COLORS = ["text-cyan-600", "text-blue-600", "text-purple-600", "text-emerald-600", "text-rose-500", "text-orange-500", "text-indigo-600", "text-teal-600"];

// ---------- Static params ----------
export async function generateStaticParams() {
  try {
    const pages = await db.servicePage.findMany({
      where: { isActive: true },
      select: { slug: true }
    });
    const serviceParams = pages.map((page) => ({
      slug: page.slug.startsWith('/') ? page.slug.slice(1) : page.slug,
    }));
    const cityParams = Object.keys(CITIES_MAP).map((city) => ({ slug: city }));
    return [...serviceParams, ...cityParams];
  } catch (error) {
    return [];
  }
}

// ---------- Metadata ----------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawSlug = params.slug;

  // City landing page metadata
  const cityInfo = CITIES_MAP[rawSlug.toLowerCase()];
  if (cityInfo) {
    return {
      title: `Best Web Development & Digital Marketing Services in ${cityInfo.name} | GlobalWeblify`,
      description: `Explore GlobalWeblify's professional web development, SEO, digital marketing, and branding services in ${cityInfo.name}. Custom solutions tailored to your local market.`,
    };
  }

  // Service page metadata
  try {
    const slugsToTry = [rawSlug, `/${rawSlug}`];
    const page = await db.servicePage.findFirst({
      where: { slug: { in: slugsToTry }, isActive: true }
    });
    if (!page) return {};

    const locationName = "";
    const title = replaceLocation(page.seoTitle || page.title || '', locationName);
    const description = replaceLocation(page.seoDescription || `Professional ${page.title} services.`, locationName);
    return {
      title: title ? `${title} | GlobalWeblify` : `GlobalWeblify`,
      description,
      keywords: page.seoKeywords ? page.seoKeywords.split(',').map(k => k.trim()) : undefined,
    };
  } catch { return {}; }
}

// ---------- Page component ----------
export default async function DynamicPage({ params }: Props) {
  const rawSlug = params.slug;

  // ===== CITY LANDING PAGE =====
  const cityInfo = CITIES_MAP[rawSlug.toLowerCase()];
  if (cityInfo) {
    return <CityLandingView cityKey={rawSlug.toLowerCase()} cityInfo={cityInfo} />;
  }

  // ===== SERVICE PAGE =====
  return <ServicePageView rawSlug={rawSlug} />;
}

// ==========================================
// City Landing Component (Looks like Homepage but customized Hero)
// ==========================================
async function CityLandingView({ cityKey, cityInfo }: { cityKey: string; cityInfo: { name: string; subtitle: string } }) {
  const locationName = cityInfo.name;
  return <HomeView city={locationName} cityKey={cityKey} />;
}

// ==========================================
// Service Page Component (original logic)
// ==========================================
async function ServicePageView({ rawSlug }: { rawSlug: string }) {
  const slugsToTry = [rawSlug, `/${rawSlug}`];

  const page = await db.servicePage.findFirst({
    where: { slug: { in: slugsToTry }, isActive: true }
  });

  if (!page) {
    notFound();
  }

  const locationName = "";
  if (page.title) page.title = replaceLocation(page.title, locationName);
  if (page.contentTitle) page.contentTitle = replaceLocation(page.contentTitle, locationName);
  if (page.seoTitle) page.seoTitle = replaceLocation(page.seoTitle, locationName);
  if (page.seoDescription) page.seoDescription = replaceLocation(page.seoDescription, locationName);
  if (page.content) page.content = replaceLocation(page.content, locationName);

  const remainingSubMenus = await db.servicePage.findMany({
    where: { category: page.category, isActive: true, id: { not: page.id } },
    select: { title: true, slug: true, seoDescription: true, content: true, image: true },
    orderBy: { createdAt: 'desc' }
  });

  const ICONS = ['Monitor', 'Smartphone', 'ShoppingCart', 'Layout', 'Palette', 'Settings', 'Code', 'Briefcase'];

  const getDesc = (m: any) => {
    if (m.seoDescription) return replaceLocation(m.seoDescription, locationName);
    if (m.content) return stripHtml(replaceLocation(m.content, locationName)).substring(0, 150) + '...';
    return 'Explore our professional web services designed for performance and scale.';
  };

  return (
    <div className="bg-white min-h-screen">
      <ServiceHero 
        title={page.title || ""} 
        description={page.seoDescription || undefined}
        city={locationName || undefined}
      />

      {/* Intro Section */}
      {page.content && page.content.trim() !== "" && stripHtml(page.content).trim() !== "" && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-[30px] lg:text-[32px] font-black text-gray-900 text-center mb-2 tracking-tight leading-tight max-w-4xl mx-auto px-4">
              {page.contentTitle || `Professional ${page.title}`}
            </h2>
            <div className="w-12 h-[3px] bg-[#1a8b4c] rounded-full mx-auto mb-4" />
            <ExpandableContent htmlContent={page.content} maxHeight={162} />
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section id="services-grid" className="py-16 bg-white border-t border-gray-100 scroll-mt-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-[32px] font-black text-gray-900 mb-3">Why Our Services Deliver Better Results</h2>
            <p className="text-sm md:text-base text-gray-600 font-medium">We Bring Life To The "Few Megabytes Of Virtual Space" You Own</p>
          </div>
          <input type="checkbox" id="show-more-cards" className="peer hidden" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto peer-checked:[&_.card-item]:!block">
            {remainingSubMenus.length > 0 ? (
              remainingSubMenus.map((menu, i) => {
                const categoryIcons = CATEGORY_CONFIG[page.category as keyof typeof CATEGORY_CONFIG]?.icons || ICONS;
                const Icon = categoryIcons[i % categoryIcons.length];
                
                const CARD_THEMES = [
                  { bg: 'bg-[#1a8b4c]', border: 'border-green-100', hoverBorder: 'hover:border-[#1a8b4c]', mesh: 'bg-[#1a8b4c]/10' },
                  { bg: 'bg-[#0ea5e9]', border: 'border-blue-100', hoverBorder: 'hover:border-blue-500', mesh: 'bg-blue-500/10' },
                  { bg: 'bg-[#ec4899]', border: 'border-pink-100', hoverBorder: 'hover:border-pink-500', mesh: 'bg-pink-500/10' },
                  { bg: 'bg-[#f59e0b]', border: 'border-amber-100', hoverBorder: 'hover:border-amber-500', mesh: 'bg-amber-500/10' },
                  { bg: 'bg-[#8b5cf6]', border: 'border-purple-100', hoverBorder: 'hover:border-purple-500', mesh: 'bg-purple-500/10' },
                  { bg: 'bg-[#10b981]', border: 'border-emerald-100', hoverBorder: 'hover:border-emerald-500', mesh: 'bg-emerald-500/10' },
                ];
                const theme = CARD_THEMES[i % CARD_THEMES.length];
                const linkHref = menu.slug.startsWith('/') ? menu.slug : `/${menu.slug}`;
                const displayTitle = replaceLocation(menu.title, locationName);
                
                return (
                  <Link href={linkHref} key={i} className={`card-item relative min-h-[240px] md:min-h-[300px] bg-white rounded-[18px] md:rounded-[24px] border-[2px] ${theme.border} shadow-lg transition-all duration-500 overflow-hidden hover:shadow-2xl ${theme.hoverBorder} group ${i >= 6 ? 'hidden md:block' : 'block'}`}>
                    <div className={`absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 ${theme.mesh} blur-[50px] rounded-full`} />
                    <div className="relative z-20 h-full p-4 md:p-7 flex flex-col items-center text-center">
                      <div className="relative mb-3 md:mb-5">
                        <div className={`absolute inset-0 rounded-full blur-[12px] scale-125 opacity-10 group-hover:opacity-30 transition-opacity ${theme.bg}`} />
                        <div className={`relative w-10 h-10 md:w-14 md:h-14 rounded-[14px] md:rounded-[20px] shadow-md flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-[8deg] ${theme.bg}`}>
                          <CardIcon iconName={Icon} colorClass="!w-4 !h-4 md:!w-6 md:!h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-[15px] md:text-[20px] font-black text-gray-950 mb-1.5 md:mb-2.5 leading-tight tracking-tight group-hover:text-blue-700 transition-colors">
                          {displayTitle}
                        </h3>
                        <p className="text-[12px] md:text-[13.5px] text-gray-600 font-medium leading-relaxed mb-3 md:mb-5 line-clamp-3">
                          {getDesc(menu)}
                        </p>
                      </div>
                      <div className="w-full mt-auto">
                        <div className="flex items-center justify-between pt-3 md:pt-5 border-t border-gray-100">
                          <span className={`flex items-center gap-1 md:gap-1.5 text-[12px] md:text-[14px] font-black group-hover:translate-x-1.5 transition-transform duration-300 text-gray-800`}>
                            Explore <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                          </span>
                          <div className={`h-8 md:h-10 px-3 md:px-5 rounded-lg md:rounded-xl text-white text-[11px] md:text-[12px] font-black flex items-center justify-center transition-all duration-300 shadow-md ${theme.bg}`}>
                            Read More
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : null}
          </div>
          {remainingSubMenus.length > 6 && (
            <div className="mt-10 text-center md:hidden peer-checked:[&_label_.see-more]:hidden peer-checked:[&_label_.see-less]:block">
              <label htmlFor="show-more-cards" className="cursor-pointer inline-flex items-center justify-center bg-[#1a8b4c] hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-full shadow-md text-[14px] transition-all">
                <span className="see-more block">See More Services</span>
                <span className="see-less hidden">See Less Services</span>
              </label>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#dcfce7] to-[#bbf7d0] py-12 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Talk with our experts to plan your perfect website experience.</h3>
          <Link href="/contact" className="inline-block bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-md text-[14px]">Request A Free Consultation</Link>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-[32px] font-black text-gray-900 mb-12">Industries We Work With</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 mb-12">
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 last:border-0"><Building2 className="w-12 h-12 text-blue-600 mb-3 stroke-[1.5]" /><p className="text-[13px] font-bold text-blue-700 text-center leading-tight">B2B & Business<br/>Portals</p></div>
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 last:border-0"><Users className="w-12 h-12 text-orange-500 mb-3 stroke-[1.5]" /><p className="text-[13px] font-bold text-blue-700 text-center leading-tight">Matrimonial &<br/>Matchmaking Platforms</p></div>
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 last:border-0"><HeartPulse className="w-12 h-12 text-red-500 mb-3 stroke-[1.5]" /><p className="text-[13px] font-bold text-blue-700 text-center leading-tight">Healthcare &<br/>Medical Websites</p></div>
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 lg:border-r last:border-0"><Briefcase className="w-12 h-12 text-orange-700 mb-3 stroke-[1.5]" /><p className="text-[13px] font-bold text-blue-700 text-center leading-tight">Job Portals &<br/>Career Platforms</p></div>
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 last:border-0"><Home className="w-12 h-12 text-red-600 mb-3 stroke-[1.5]" /><p className="text-[13px] font-bold text-blue-700 text-center leading-tight">Real Estate<br/>Websites</p></div>
            <div className="flex flex-col items-center justify-center p-4 border-0"><ShoppingBag className="w-12 h-12 text-gray-700 mb-3 stroke-[1.5]" /><p className="text-[13px] font-bold text-blue-700 text-center leading-tight">E-Commerce<br/>Businesses</p></div>
          </div>
          <Link href="/contact" className="inline-block bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md text-[14px]">View All Industries</Link>
        </div>
      </section>
    </div>
  );
}
