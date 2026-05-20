"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Code, Search, Sparkles, Target, FileText,
  Palette, ArrowRight
} from 'lucide-react';
import { Section } from '../layout/Responsive/Section';

interface Service {
  title: string;
  icon: React.ReactElement;
  desc: string;
  link: string;
  color: string;
  borderColor: string;
  hoverBorder: string;
  mesh: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    icon: <Code />,
    desc: "We build custom, high-performance web solutions using cutting-edge tech stacks. From corporate sites to complex web apps, we ensure maximum speed, security, and a flawless user experience.",
    link: "/web-development",
    color: "#1a8b4c",
    borderColor: "border-green-100",
    hoverBorder: "border-[#1a8b4c]",
    mesh: "bg-[#1a8b4c]/10"
  },
  {
    title: "SEO Services",
    icon: <Search />,
    desc: "Dominate search engine rankings and capture high-intent organic traffic. Our proven strategies ensure your business stays ahead of the competition and reaches your target audience effectively.",
    link: "/seo-services",
    color: "#0ea5e9",
    borderColor: "border-blue-100",
    hoverBorder: "border-blue-500",
    mesh: "bg-blue-500/10"
  },
  {
    title: "AI SEO Services",
    icon: <Sparkles />,
    desc: "The future of search is here. We use advanced AI-driven keyword intelligence and automated ranking strategies to help your business appear in Google AI, ChatGPT, and modern search recommendations.",
    link: "/ai-seo-services",
    color: "#ec4899",
    borderColor: "border-pink-100",
    hoverBorder: "border-pink-500",
    mesh: "bg-pink-500/10"
  },
  {
    title: "Google Ads Management",
    icon: <Target />,
    desc: "Precision-targeted ad campaigns designed to maximize your ROI. We use data-driven bidding and advanced conversion tracking to ensure every dollar spent drives real growth for your business.",
    link: "/google-ads-management",
    color: "#f59e0b",
    borderColor: "border-amber-100",
    hoverBorder: "border-amber-500",
    mesh: "bg-amber-500/10"
  },
  {
    title: "Content Marketing",
    icon: <FileText />,
    desc: "High-quality, engaging content that builds authority and drives conversions. From blogs to technical copy, we create content that resonates with your audience and boosts your brand presence.",
    link: "/content-marketing",
    color: "#06b6d4",
    borderColor: "border-cyan-100",
    hoverBorder: "border-cyan-500",
    mesh: "bg-cyan-500/10"
  },
  {
    title: "Web Design Services",
    icon: <Palette />,
    desc: "User-focused, visually stunning designs that convert visitors into customers. Our design approach balances modern aesthetics with intuitive UI/UX for a world-class digital experience.",
    link: "/web-design-services",
    color: "#10b981",
    borderColor: "border-emerald-100",
    hoverBorder: "border-emerald-500",
    mesh: "bg-emerald-500/10"
  }
];

function ServiceCard({ service, index, cityKey }: { service: Service, index: number, cityKey?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const linkHref = cityKey ? `/${cityKey}${service.link}` : service.link;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative min-h-[380px] md:h-[400px] w-full"
    >
      <Link
        href={linkHref}
        className={`relative block h-full w-full bg-white rounded-[24px] md:rounded-[36px] border-[2px] md:border-[3px] ${service.borderColor} shadow-lg transition-all duration-500 overflow-hidden hover:shadow-2xl hover:${service.hoverBorder} hover:bg-gray-50/30`}
      >
        <div className={`absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 ${service.mesh} blur-[60px] md:blur-[80px] rounded-full`} />

        <div className="relative z-20 h-full p-6 md:p-8 flex flex-col items-center text-center">

          <motion.div
            style={{ translateZ: "40px" }}
            className="relative mb-5 md:mb-6"
          >
            <div className="absolute inset-0 rounded-full blur-[15px] scale-125 opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: service.color }} />
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-[18px] md:rounded-[22px] shadow-md flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-[8deg]" style={{ backgroundColor: service.color }}>
              {React.cloneElement(service.icon, { size: 28, strokeWidth: 2 })}
            </div>
            <div className="absolute -top-1 -right-1 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles size={16} fill="currentColor" />
            </div>
          </motion.div>

          <div style={{ transform: "translateZ(25px)" }} className="flex-1 flex flex-col">
            <h3 className="text-[18px] md:text-[22px] font-black text-gray-950 mb-2 md:mb-3 leading-tight tracking-tight group-hover:text-[#1a8b4c] transition-colors">
              {service.title}
            </h3>
            <p className="text-[13px] md:text-[15px] text-gray-600 font-medium leading-relaxed mb-4 md:mb-6">
              {service.desc}
            </p>
          </div>

          <div style={{ transform: "translateZ(15px)" }} className="w-full mt-auto">
            <div className="flex items-center justify-between pt-4 md:pt-5 border-t border-gray-100">
              <span className="flex items-center gap-1.5 text-[12px] md:text-[14px] font-black group-hover:translate-x-1.5 transition-transform duration-300" style={{ color: service.color }}>
                Explore <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
              </span>
              <div className="h-9 md:h-10 px-4 md:px-5 rounded-lg md:rounded-xl text-white text-[11px] md:text-[12px] font-black flex items-center justify-center transition-all duration-300 shadow-md active:scale-95" style={{ backgroundColor: service.color }}>
                Get Quote
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesGrid({ cityKey }: { cityKey?: string }) {
  return (
    <Section id="services" spacing="md" variant="white" className="relative overflow-hidden font-sans bg-white py-12 md:py-24">
      <div className="text-center max-w-[1200px] mx-auto mb-12 md:mb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 text-[#1a8b4c] text-[10px] md:text-[11px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest mb-4 md:mb-5 shadow-sm"
        >
          Our Expertise
        </motion.div>
        <h2 id="services-title" className="text-[24px] md:text-[32px] lg:text-[36px] font-black text-gray-950 leading-[1.2] tracking-tight mb-4 font-heading px-2">
          <span className="block xl:whitespace-nowrap">Is your business losing customers because of weak online platforms?</span>
          <span className="text-[#1a8b4c]">We have the solution.</span>
        </h2>
        <p className="text-gray-500 text-[14px] md:text-[16px] font-medium mx-auto leading-relaxed xl:whitespace-nowrap px-4">
          Explore our high-performance digital solutions designed for modern business growth and conversion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} cityKey={cityKey} />
        ))}
      </div>
    </Section>
  );
}
