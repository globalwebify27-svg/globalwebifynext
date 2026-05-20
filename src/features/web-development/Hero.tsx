"use client";

import React from 'react';
import { ArrowRight, Phone, MessageSquare, TrendingUp, Code } from 'lucide-react';
import Link from 'next/link';

export default function WebDevHero({ title, description }: { title?: string, description?: string }) {
  return (
    <section className="relative w-full min-h-[440px] md:min-h-[480px] pt-[130px] md:pt-[150px] lg:pt-[210px] pb-12 lg:pb-16 flex items-center justify-center bg-gray-950 overflow-hidden border-b border-gray-900">

      {/* 🚀 Breathtaking 3D abstract waves background spanning edge-to-edge */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/web-dev-banner-bg.png"
          alt="Next-Gen Web Development Services"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Soft dark overlay to set the primary canvas contrast */}
        <div className="absolute inset-0 bg-gray-950/40 z-10" />
      </div>

      {/* Ambient glowing highlights inside the banner */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-10 pointer-events-none" />

      {/* Foreground content: Wide Horizontal Glassmorphic Plate */}
      <div className="container-custom relative z-20 w-full flex justify-center px-4 sm:px-6">

        {/* 🔮 Wide Horizontal Glassmorphic Card Container - FROSTED WHITE GLASS (NOT BLACK) */}
        <div
          className="w-full max-w-[1140px] rounded-[32px] p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col items-start text-left"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12)'
          }}
        >




          {/* 🚀 Brand Headline - EXACTLY ONE LINE on Desktop/Tablet with high contrast dark text */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-black font-heading text-gray-950 uppercase leading-tight tracking-wide mb-4 w-full">
            <span className="text-purple-700">{title || "Web Development"}</span>
          </h1>

          {/* Subtitle - Light Theme */}
          <p className="text-sm md:text-[15.5px] text-gray-800 leading-relaxed font-semibold max-w-2xl mb-8">
            {description || "Custom web solutions that drive business growth. Scalable, secure, and user-friendly websites built for success."}
          </p>

          {/* Contact Actions in a fluid left-aligned horizontal flexrow */}
          <div className="flex flex-wrap items-center justify-start gap-3 w-full">

            {/* Button 1: Contact Us → (Signature Brand Purple Gradient - Inline CSS) */}
            <Link
              href="/contact"
              className="text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-[13px] md:text-[13.5px] tracking-wide"
              style={{
                background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
                border: '1px solid #7c3aed'
              }}
            >
              Contact Us <ArrowRight size={15} />
            </Link>

            {/* Button 2: Call → (Sleek Obsidian Slate Gradient - Inline CSS) */}
            <a
              href="tel:+919876543210"
              className="text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-[13px] md:text-[13.5px] tracking-wide"
              style={{
                background: 'linear-gradient(to right, #1f2937, #111827)',
                border: '1px solid #1f2937'
              }}
            >
              <Phone size={14} className="stroke-[2.5] text-white" /> Call
            </a>

            {/* Button 3: WhatsApp (Signature Vibrant Emerald Green - Inline CSS) */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-[13px] md:text-[13.5px] tracking-wide"
              style={{
                background: 'linear-gradient(to right, #25D366, #1b8a4a)',
                border: '1px solid #25D366'
              }}
            >
              <MessageSquare size={14} className="fill-white stroke-none" /> WhatsApp
            </a>

            {/* Button 4: Free Audit (Cyber Royal Blue Tech Gradient - Inline CSS) */}
            <Link
              href="/contact?subject=Free Audit"
              className="text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-[13px] md:text-[13.5px] tracking-wide"
              style={{
                background: 'linear-gradient(to right, #2563eb, #0891b2)',
                border: '1px solid #2563eb'
              }}
            >
              <TrendingUp size={14} className="stroke-[2.5] text-white" /> Free Audit
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
