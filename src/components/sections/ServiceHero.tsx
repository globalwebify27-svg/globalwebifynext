import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MessageSquare, TrendingUp } from "lucide-react";

interface ServiceHeroProps {
  title: string;
  description?: string;
  city?: string;
}

export default function ServiceHero({ title, description, city }: ServiceHeroProps) {
  // Format the title to highlight the main part in purple
  const formattedTitle = title || "";

  return (
    <section className="relative w-full min-h-[360px] md:min-h-[400px] py-10 md:py-14 flex items-center justify-center bg-gray-950 overflow-hidden border-b border-gray-900">
      {/* Background Image Banner */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/web-dev-banner-bg.png"
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/40 z-10" />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-10 pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-20 flex justify-center">
        <div 
          className="w-full max-w-[1140px] rounded-[32px] p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col items-start text-left border border-white/50"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.65)", 
            backdropFilter: "blur(14px)", 
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)"
          }}
        >
          {/* Location Badge (only if city is present) */}
          {city && (
            <div className="inline-flex items-center gap-1.5 bg-purple-100/90 border border-purple-200 text-purple-800 text-[10px] md:text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
              </span>
              <span>{city} Market Area</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-black font-heading text-gray-950 uppercase leading-tight tracking-wide mb-4 w-full">
            <span className="text-purple-700">{formattedTitle}</span>{" "}
            <span className="text-gray-950">Services{city && ` in ${city}`}</span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-[15.5px] text-gray-800 leading-relaxed font-semibold max-w-2xl mb-8">
            {description || "Custom web solutions that drive business growth. Scalable, secure, and user-friendly websites built for success."}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-start gap-3 w-full">
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
            <a
              href="tel:+917563901100"
              className="text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-[13px] md:text-[13.5px] tracking-wide"
              style={{
                background: 'linear-gradient(to right, #1f2937, #111827)',
                border: '1px solid #1f2937'
              }}
            >
              <Phone size={14} className="stroke-[2.5] text-white" /> Call
            </a>
            <a
              href="https://wa.me/917563901100"
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
