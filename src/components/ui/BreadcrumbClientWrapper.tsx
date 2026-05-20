"use client";

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';

export default function BreadcrumbClientWrapper({ dynamicPages = [] }: { dynamicPages?: any[] }) {
  const pathname = usePathname();

  // Do not render breadcrumbs on the home page or city home pages
  const citySlugs = ['uk', 'ranchi', 'dubai', 'argora', 'delhi', 'noida', 'gurugram', 'bangalore', 'mumbai', 'pune', 'hyderabad', 'kolkata'];
  const segments = pathname.split('/').filter(Boolean);
  const isCityHome = segments.length === 1 && citySlugs.includes(segments[0].toLowerCase());

  if (pathname === '/' || pathname === '' || isCityHome) return null;

  return (
    <div className="relative z-30 container-custom pt-[80px] md:pt-[95px] lg:pt-[150px] pb-2 px-4 sm:px-6 bg-white">
      <Breadcrumbs pathname={pathname} dynamicPages={dynamicPages} />
    </div>
  );
}
