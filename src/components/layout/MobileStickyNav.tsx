"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Briefcase } from 'lucide-react';

export default function MobileStickyNav() {
  const pathname = usePathname();
  const isHomepage = pathname === '/' || pathname === '';

  const [animateCall, setAnimateCall] = useState(false);
  const [animateWhatsApp, setAnimateWhatsApp] = useState(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const idleInterval = useRef<NodeJS.Timeout | null>(null);

  // Scroll Triggered Tingle Animation
  useEffect(() => {
    const handleScroll = () => {
      // Trigger wiggle on scroll
      setAnimateCall(true);
      
      // Stagger WhatsApp slightly for better aesthetic feel
      const waTimeout = setTimeout(() => {
        setAnimateWhatsApp(true);
      }, 150);

      // Reset animation states after the duration of the wiggle (600ms)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setAnimateCall(false);
        setAnimateWhatsApp(false);
      }, 600);

      return () => clearTimeout(waTimeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Idle Periodic Tingle Animation (Only on Homepage)
  useEffect(() => {
    if (!isHomepage) return;

    // Trigger wiggle periodically when user is not scrolling
    idleInterval.current = setInterval(() => {
      // Wiggle Call
      setAnimateCall(true);
      const callTimer = setTimeout(() => setAnimateCall(false), 600);

      // Wiggle WhatsApp 1.8s later
      const waTimer = setTimeout(() => {
        setAnimateWhatsApp(true);
        setTimeout(() => setAnimateWhatsApp(false), 600);
      }, 1800);

    }, 5000); // 5-second interval loop

    return () => {
      if (idleInterval.current) clearInterval(idleInterval.current);
    };
  }, [isHomepage]);

  const getVariants = (delay: number) => ({
    tingle: {
      rotate: [0, -12, 12, -12, 12, 0],
      scale: [1, 1.15, 1.15, 1.15, 1.15, 1],
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    idle: {
      rotate: 0,
      scale: 1,
      y: [0, -2, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }
      }
    }
  });

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
        { 
          href: "tel:18008905489", 
          icon: <Phone size={22} />, 
          label: "Call", 
          type: "a",
          animateState: animateCall,
          delay: 0
        },
        { 
          href: "https://wa.me/917563901100", 
          icon: <MessageCircle size={22} />, 
          label: "WhatsApp", 
          type: "a", 
          target: "_blank",
          animateState: animateWhatsApp,
          delay: 0.5
        },
        { 
          href: "/portfolio", 
          icon: <Briefcase size={22} />, 
          label: "Our Work", 
          type: "Link",
          animateState: false,
          delay: 1.0
        }
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
                animate={item.animateState ? "tingle" : "idle"}
                variants={getVariants(item.delay)}
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
                animate={item.animateState ? "tingle" : "idle"}
                variants={getVariants(item.delay)}
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
