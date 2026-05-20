"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WebDevCTA() {
  return (
    <section className="py-20 relative bg-white overflow-hidden">
      <div className="container-custom">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-[#0e3b20] text-white p-12 md:p-16 rounded-[40px] shadow-2xl overflow-hidden text-center flex flex-col items-center">
          
          {/* Background design accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(26,139,76,0.2),transparent_40%)]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1a8b4c]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black font-heading leading-tight mb-6">
              Ready to Dominate Search Engines with a Custom Next.js Platform?
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-medium">
              Stop losing customers to slow, outdated page templates. Let our elite team of Next.js engineers build a blazing-fast, dynamic website that turns clicks into customers.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-[#1a8b4c] hover:bg-[#15703d] text-white px-10 py-5 rounded-2xl font-bold inline-flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] text-[15px]"
              >
                Schedule a Consultation <ArrowRight size={18} />
              </Link>
              <Link 
                href="/portfolio" 
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold inline-flex items-center justify-center transition-all text-[15px]"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
