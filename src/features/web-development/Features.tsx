"use client";

import React from 'react';
import { Cpu, Database, Globe, Smartphone, Shield, Zap } from 'lucide-react';

const features = [
  { 
    title: "Next.js & React Applications", 
    desc: "We specialize in React-based Next.js applications, utilizing Server-Side Rendering (SSR) and Static Site Generation (SSG) for instantaneous load times and perfect SEO.",
    icon: <Cpu className="text-[#1a8b4c] w-6 h-6" /> 
  },
  { 
    title: "Headless CMS Architectures", 
    desc: "Decouple your content management from the frontend. We build with Sanity, Strapi, and Headless WordPress to provide content flexibility and speed.",
    icon: <Database className="text-[#1a8b4c] w-6 h-6" /> 
  },
  { 
    title: "High-Converting E-Commerce Solutions", 
    desc: "Custom Shopify stores, WooCommerce platforms, and custom cart systems designed to deliver friction-free checkout flows and secure payment processing.",
    icon: <Globe className="text-[#1a8b4c] w-6 h-6" /> 
  },
  { 
    title: "Mobile-First Fluid Layouts", 
    desc: "100% responsive responsive layouts tested across dozens of devices. We ensure your website looks flawless on mobile phones, tablets, and 4K displays.",
    icon: <Smartphone className="text-[#1a8b4c] w-6 h-6" /> 
  },
  { 
    title: "Enterprise Grade Cybersecurity", 
    desc: "Secure-by-design development frameworks. We prevent XSS, CSRF, and SQL injections through rigorous sanitized code, SSL protocols, and cloud protection.",
    icon: <Shield className="text-[#1a8b4c] w-6 h-6" /> 
  },
  { 
    title: "Speed & Performance Tuning", 
    desc: "Achieve a perfect 100/100 Mobile Lighthouse score. We compress media files, leverage static pre-rendering, and deploy via global edge CDNs.",
    icon: <Zap className="text-[#1a8b4c] w-6 h-6" /> 
  }
];

export default function WebDevFeatures() {
  return (
    <section id="services-grid" className="py-24 bg-gray-50/50 border-t border-b border-gray-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 mb-6">
            Full-Stack Engineering Designed for Business Acceleration
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            We leverage modern architectures and sanitized backend databases to build custom digital solutions that load instantaneously and keep your audience fully engaged.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="p-8 bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-gray-300 hover:translate-y-[-2px] transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="p-3 bg-[#eefcf3] rounded-2xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
              <p className="text-[14.5px] text-gray-600 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
