"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Briefcase } from 'lucide-react';

export default function MobileStickyNav() {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#1a8b4c] border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] flex items-stretch h-[70px] safe-area-bottom overflow-hidden"
    >
      {/* Background with very subtle noise or gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Buttons in a clear grid structure */}
      {[
        { href: "tel:18008905489", icon: <Phone size={22} />, label: "Call", type: "a" },
        { href: "https://wa.me/917563901100", icon: <MessageCircle size={22} />, label: "WhatsApp", type: "a", target: "_blank" },
        { href: "/portfolio", icon: <Briefcase size={22} />, label: "Our Work", type: "Link" }
      ].map((item, i) => (
        <motion.div
          key={item.label}
          className={`flex-1 flex border-white/20 ${i !== 2 ? 'border-r-[1.5px]' : ''}`}
          whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          {item.type === "a" ? (
            <a 
              href={item.href}
              target={item.target}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 text-white transition-colors relative z-10"
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {item.icon}
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">{item.label}</span>
            </a>
          ) : (
            <Link 
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 text-white transition-colors relative z-10"
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {item.icon}
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">{item.label}</span>
            </Link>
          )}
        </motion.div>
      ))}

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </motion.div>
  );
}
