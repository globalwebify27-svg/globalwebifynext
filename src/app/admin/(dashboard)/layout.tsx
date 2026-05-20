import React from 'react';
import Link from 'next/link';
import { Newspaper, Layers, LogOut, Shield, LayoutDashboard, ArrowLeft, MessageSquare } from 'lucide-react';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import SidebarNav from '@/components/admin/SidebarNav';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const fullUrl = headersList.get('x-url') || '';

  const isOverview = pathname === '/admin';
  const isServices = pathname.startsWith('/admin/services');
  const isBlogs = pathname.startsWith('/admin/blogs');
  const isContacts = pathname.startsWith('/admin/contacts');

  // Fetch services for sidebar dynamic dropdown
  const sidebarServices = await db.servicePage.findMany({
    select: {
      id: true,
      title: true,
      category: true,
    },
    orderBy: {
      title: 'asc',
    },
  });

  const categories = {
    website: { label: 'Website Services', services: [] as any[] },
    marketing: { label: 'Digital Marketing', services: [] as any[] },
    branding: { label: 'Branding & PR', services: [] as any[] },
    hosting: { label: 'Hosting', services: [] as any[] },
  };

  sidebarServices.forEach((service) => {
    const cat = service.category as keyof typeof categories;
    if (categories[cat]) {
      categories[cat].services.push(service);
    } else {
      categories.website.services.push(service);
    }
  });

  // Determine editing category to auto-expand accordion
  let activeServiceCategory = '';
  if (pathname.startsWith('/admin/services/')) {
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];
    
    if (lastPart !== 'new') {
      const id = parseInt(lastPart, 10);
      try {
        let service = null;
        if (!isNaN(id)) {
          service = await db.servicePage.findUnique({
            where: { id },
            select: { category: true }
          });
        } else {
          // If not a number, it's a slug. Query the DB by slug.
          const slugToQuery = `/${lastPart}`;
          service = await db.servicePage.findUnique({
            where: { slug: slugToQuery },
            select: { category: true }
          });
        }
        if (service) {
          activeServiceCategory = service.category;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  // Determine active category from URL parameter or page context
  let activeCategory = '';
  if (fullUrl) {
    try {
      const parsedUrl = new URL(fullUrl);
      activeCategory = parsedUrl.searchParams.get('category') || '';
    } catch (e) {
      if (fullUrl.includes('category=website')) activeCategory = 'website';
      else if (fullUrl.includes('category=marketing')) activeCategory = 'marketing';
      else if (fullUrl.includes('category=branding')) activeCategory = 'branding';
      else if (fullUrl.includes('category=hosting')) activeCategory = 'hosting';
    }
  }

  if (!activeCategory) {
    activeCategory = activeServiceCategory;
  }

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-xs md:text-sm font-bold group/navlink ${isActive
      ? 'bg-[#1a8b4c] text-white shadow-lg shadow-[#1a8b4c]/10'
      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
    }`;

  const iconClass = (isActive: boolean) =>
    `stroke-[2.2] flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover/navlink:text-white'}`;

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-950 text-white flex flex-col flex-shrink-0 border-r border-gray-900 h-full hidden md:flex">
        {/* Brand/Header */}
        <div className="p-6 border-b border-gray-900 flex flex-col items-center justify-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-1.5 flex-shrink-0 shadow-lg shadow-black/30">
            <img
              src="/global_webify_logo.png"
              alt="GlobalWeblify Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-[11px] font-black tracking-widest uppercase font-lexend text-white leading-none">
              GlobalWeblify
            </h2>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1 block">
              CMS Workstation
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <SidebarNav initialActiveServiceCategory={activeServiceCategory} />

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-gray-900">
          <a
            href="/api/auth/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-950/40 text-red-400/90 hover:text-red-400 text-xs md:text-sm font-bold transition-all duration-200"
          >
            <LogOut size={18} className="stroke-[2.2]" />
            <span>Sign Out</span>
          </a>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 md:px-8 flex-shrink-0 md:hidden">
          <div className="flex items-center gap-3">
            {!isOverview && (
              <Link
                href="/admin"
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors mr-1 flex items-center justify-center border border-gray-200"
                title="Back to Overview"
              >
                <ArrowLeft size={14} className="stroke-[2.5]" />
              </Link>
            )}
            <h1 className="text-sm font-black text-gray-900 font-lexend uppercase tracking-wider">
              {isOverview ? 'GlobalWeblify Console' : isServices ? 'GlobalWeblify Services Portal' : isBlogs ? 'GlobalWeblify Blogs Portal' : isContacts ? 'GlobalWeblify Contacts Portal' : 'GlobalWeblify Console'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Small screen navigation shortcuts */}
            <div className="flex md:hidden gap-1 bg-gray-100 p-1 rounded-xl">
              <Link
                href="/admin"
                className={`p-2 rounded-lg transition-all ${isOverview ? 'bg-[#1a8b4c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                title="Overview"
              >
                <LayoutDashboard size={16} />
              </Link>
              <Link
                href="/admin/services"
                className={`p-2 rounded-lg transition-all ${isServices ? 'bg-[#1a8b4c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                title="Manage Services"
              >
                <Layers size={16} />
              </Link>
              <Link
                href="/admin/blogs"
                className={`p-2 rounded-lg transition-all ${isBlogs ? 'bg-[#1a8b4c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                title="Manage Blogs"
              >
                <Newspaper size={16} />
              </Link>
              <Link
                href="/admin/contacts"
                className={`p-2 rounded-lg transition-all ${isContacts ? 'bg-[#1a8b4c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                title="Contact Submissions"
              >
                <MessageSquare size={16} />
              </Link>
              <a
                href="/api/auth/logout"
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Sign Out"
              >
                <LogOut size={16} />
              </a>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#1a8b4c] font-black text-xs flex items-center justify-center border border-green-200 shadow-sm">
                A
              </div>
              <span className="text-xs font-bold text-gray-700 hidden md:block">
                System Administrator
              </span>
            </div>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="flex-grow p-4 md:p-5 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
