"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '../layout/Responsive/Section';

export default function AboutSEO() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Section id="about-seo" variant="white" className="bg-[#fcfdfc] border-t border-gray-100">
      <article className="max-w-[1000px] mx-auto px-4 text-center">
        
        <h2 className="text-[28px] md:text-[36px] font-black text-gray-950 mb-4 leading-tight">
          Web Design & Web Development <span className="text-[#1a8b4c]">Services in India</span>
        </h2>
        <p className="text-[18px] md:text-[22px] font-bold text-gray-600 mb-8">
          Professional Web Design Solutions for Global Brands
        </p>

        <div className="relative">
          <div 
            className={`text-gray-600 text-[15px] md:text-[16px] leading-relaxed space-y-6 text-left transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[3000px]' : 'max-h-[180px]'}`}
            aria-expanded={isExpanded}
          >
            <p>
              Need to lift your online presence? Yes. We at <strong>Global Webify</strong> are your trusted partner to boost your digital growth within the shortest time possible. As a prominent Web Design and Web Development Company in India, we are here to empower businesses worldwide with pioneering, user-focused, and SEO-optimized web solutions. Our team brings global excellence with local proficiency, serving clients across India, UAE, Canada, Australia, USA, and UK.
            </p>
            
            <p>
              Based in India, we're not simply a top Web Design Company, but also a preferred Web Development partner for startups and enterprises alike. Our team is dedicated to delivering visually stunning, high-performance websites focused on driving more engagement and conversions. Our expert web developers, web designers, and digital strategists work together to give you the best tailor-made websites that meet the goals of every brand.
            </p>

            <p>
              Starting from E-commerce to Real Estate, Travel & Tourism to Healthcare, Manufacturing to Fashion, we serve a broad spectrum of industries with accuracy and creativity. Whether you're a startup searching for a digital kickstart or an enterprise focusing on digital transformation, as the best Digital Marketing Agency in India, we have the right solution for you.
            </p>

            <p>
              But that's not all - <strong>Global Webify</strong> has even driven success as a leading SEO Company and a full-service Digital Marketing Agency. Our data-backed policies in SEO, social media marketing, PPC, email marketing, and content marketing confirm that your brand not only gets noticed but succeeds in the digital space.
            </p>

            <p>
              At Global Webify, we don't simply develop or design websites - we build highly presentable brands online. We focus on creating digital experiences that resonate with your audience and turn visitors into loyal customers.
            </p>

            <p>
              So, are you ready to unlock your digital potential? Partner with one of the most reliable and trusted web design and development companies in India - Global Webify. Contact our team today and set your goals to meet new digital heights!
            </p>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fcfdfc] to-transparent pointer-events-none" />
          )}
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#1a8b4c] text-[#1a8b4c] font-black text-[15px] hover:bg-[#1a8b4c] hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a8b4c] focus:ring-offset-2"
          aria-label={isExpanded ? "Show less content" : "Show more content about Global Webify services"}
        >
          {isExpanded ? (
            <>Read Less <ChevronUp size={20} /></>
          ) : (
            <>Read More <ChevronDown size={20} /></>
          )}
        </button>
      </article>
    </Section>
  );
}
