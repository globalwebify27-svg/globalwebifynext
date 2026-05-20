"use client";

import React from 'react';
import { Terminal, Eye } from 'lucide-react';

const seoHighlights = [
  {
    title: "Semantic HTML5 Architecture",
    desc: "We structure code using appropriate landmarks (header, nav, main, article, footer) and hierarchical heading structures (h1, h2, h3) so search engine crawlers can index your content correctly."
  },
  {
    title: "Dynamic Schema Markup Integration",
    desc: "Every page we develop includes fully configured JSON-LD LocalBusiness and WebPage schema markup, allowing Google to display rich snippet cards directly on search results."
  },
  {
    title: "Core Web Vitals Optimization",
    desc: "We optimize Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) so your website scores in the 'Good' range, boosting your search engine ranking factors."
  },
  {
    title: "Automated Metadata & Sitemap Generation",
    desc: "Never worry about unindexed pages. We configure custom automated XML sitemaps, indexable robots.txt directives, and optimized dynamic meta tags for perfect crawling efficiency."
  }
];

export default function WebDevSEOStats() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Bold headings & key details */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-[13px] font-bold mb-6 uppercase tracking-wide">
              <Terminal className="w-3.5 h-3.5" />
              <span>Search-Engine First Development</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 leading-[1.2] mb-6">
              Why Our Web Development Architecture Ranks #1 on Google
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
              Standard WordPress templates and DIY drag-and-drop builders generate bloated HTML code, heavy scripts, and slow network response times. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
              At GlobalWeblify, we compile your pages using **Static Site Generation (SSG)**. This turns your site into lightweight raw HTML files served instantly by edge servers. Google indexes this raw markup instantly, boosting your organic ranks before you even write a single blog post!
            </p>

            <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl flex gap-4">
              <div className="p-2.5 bg-[#eefcf3] rounded-xl shrink-0 h-fit">
                <Eye className="text-[#1a8b4c] w-6 h-6" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-bold text-gray-900 text-[16px] mb-1">Human & Crawler Compatibility</h4>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  We maintain absolute accessibility compliance (WCAG 2.1 AA) so that both impaired visitors and machine search-crawlers enjoy a seamless experience on your site.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Bullet Cards */}
          <div className="flex flex-col gap-6">
            {seoHighlights.map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-white border border-gray-200 rounded-3xl flex gap-5 hover:border-gray-300 transition-colors shadow-sm text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#1a8b4c] text-white flex items-center justify-center font-bold text-[14px] shrink-0">
                  ✓
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
