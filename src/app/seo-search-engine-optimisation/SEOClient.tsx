"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart, TrendingUp, Target, MousePointer2, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const seoFeatures = [
  { title: "Keyword Research", icon: <Search className="text-primary" /> },
  { title: "On-Page SEO", icon: <Settings className="text-primary" /> },
  { title: "Content Strategy", icon: <Target className="text-primary" /> },
  { title: "Link Building", icon: <TrendingUp className="text-primary" /> },
  { title: "Conversion Tracking", icon: <MousePointer2 className="text-primary" /> },
  { title: "Performance Reports", icon: <BarChart className="text-primary" /> }
];

export default function SEOClient() {
  return (
    <div className="pt-20">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Search size={400} />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold font-heading mb-8"
            >
              Master the <span className="text-primary-light">Search Results</span>
            </motion.h1>
            <p className="text-xl text-primary-light/80 leading-relaxed mb-10">
              Our AI-driven SEO strategies help your business rank higher, drive more organic traffic, and convert visitors into loyal customers. Don't just be found—be chosen.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-primary px-10 py-5 rounded-2xl font-bold inline-flex items-center gap-3 hover:bg-gray-100 transition-all shadow-xl"
            >
              Get a Free SEO Audit <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 mb-6">Complete SEO Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We cover every aspect of search engine optimization to ensure your long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoFeatures.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We use data-driven approaches to optimize your {f.title.toLowerCase()}, ensuring maximum visibility and ROI.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
