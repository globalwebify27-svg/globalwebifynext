"use client";

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, Facebook, Twitter, 
  Instagram, Linkedin, Youtube, User, Briefcase, 
  Building2, Handshake, Globe2, CheckCircle2, MessageSquare
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/navigation';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        alert('Failed to send message: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while sending your message. Please try again.');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 relative overflow-hidden font-sans">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-200/30 blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/20 blur-[150px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <m.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[9999] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800"
          >
            <div className="w-8 h-8 rounded-full bg-[#1a8b4c] flex items-center justify-center text-white shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-green-400">Success</p>
              <p className="text-xs font-semibold text-gray-300">Message sent! We'll be in touch shortly.</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="container-custom relative z-10 px-4 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#1a8b4c] animate-pulse" />
            <span className="text-gray-600 text-xs font-black uppercase tracking-widest">Connect with Experts</span>
          </m.div>

          <m.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[36px] md:text-[52px] font-black font-heading text-gray-900 leading-tight mb-6"
          >
            Let's Start Your <span className="text-[#1a8b4c]">Success Story</span>
          </m.h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-[15px] md:text-[17px] font-medium leading-relaxed">
            Ready to transform your digital presence? Send us a message or visit one of our global offices. We're here to help you scale.
          </p>
        </div>

        {/* 2-Column Premium Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Clean Light Form */}
          <div className="lg:col-span-7">
            <m.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 h-full flex flex-col justify-center relative overflow-hidden group"
            >
              {/* Subtle Form Highlight */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-green-50 to-transparent blur-[80px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

              <h2 className="text-[26px] font-black text-gray-900 tracking-tight mb-2 font-heading relative z-10">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-10 relative z-10">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Full Name</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-[#1a8b4c] transition-colors">
                        <User size={16} />
                      </div>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:ring-4 focus:ring-green-50 transition-all placeholder-gray-400 shadow-sm shadow-gray-100/50"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Email Address</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-[#1a8b4c] transition-colors">
                        <Mail size={16} />
                      </div>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:ring-4 focus:ring-green-50 transition-all placeholder-gray-400 shadow-sm shadow-gray-100/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Phone Number</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-[#1a8b4c] transition-colors">
                        <Phone size={16} />
                      </div>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:ring-4 focus:ring-green-50 transition-all placeholder-gray-400 shadow-sm shadow-gray-100/50"
                        placeholder="e.g. +91... / +971... / +1..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Interested Service</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-[#1a8b4c] transition-colors">
                        <Briefcase size={16} />
                      </div>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:ring-4 focus:ring-green-50 transition-all cursor-pointer appearance-none shadow-sm shadow-gray-100/50"
                      >
                        <option value="">Select a service...</option>
                        <option value="web-dev">Web Development</option>
                        <option value="seo">SEO Services</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Your Message</label>
                  <div className="relative group/input">
                    <div className="absolute top-5 left-4 pointer-events-none text-gray-400 group-focus-within/input:text-[#1a8b4c] transition-colors">
                      <MessageSquare size={16} />
                    </div>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:border-[#1a8b4c] focus:ring-4 focus:ring-green-50 transition-all placeholder-gray-400 resize-none shadow-sm shadow-gray-100/50"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                </div>

                <m.button 
                  whileHover={{ scale: 1.01, translateY: -2 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-[#1a8b4c] text-white py-4 md:py-5 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-gray-900/20 hover:shadow-green-900/30 group/btn mt-4"
                >
                  Send Message
                  <Send size={15} className="stroke-[2.5] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </m.button>

              </form>
            </m.div>
          </div>

          {/* RIGHT COLUMN: Dark Premium Info Panel */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <m.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-slate-900 rounded-[32px] overflow-hidden h-full flex flex-col relative"
            >
              {/* Premium Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a8b4c]/10 to-transparent opacity-50 pointer-events-none" />

              {/* Seamless Map Widget */}
              <div className="w-full h-[280px] md:h-[350px] relative shrink-0 overflow-hidden group border-b border-slate-700/50">
                {/* Permanent Open in Map Button (Top Right) */}
                <a 
                  href="https://www.google.com/maps/place/Global+Webify/@23.3495578,85.3086946,17.82z/data=!3m1!5s0x39f4e0528e2c8fa7:0xf0b8c1d5d5dbe41a!4m6!3m5!1s0x39f4e195a816671d:0xa9ebf12893abb828!8m2!3d23.3496601!4d85.3104862!16s%2Fg%2F11wbvkw_tm?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur shadow-md hover:shadow-lg text-gray-800 hover:text-[#1a8b4c] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  title="Open in Google Maps"
                >
                  <MapPin size={12} className="text-[#1a8b4c]" />
                  Open in Map
                </a>

                {/* Clickable Overlay for entire map */}
                <a 
                  href="https://www.google.com/maps/place/Global+Webify/@23.3495578,85.3086946,17.82z/data=!3m1!5s0x39f4e0528e2c8fa7:0xf0b8c1d5d5dbe41a!4m6!3m5!1s0x39f4e195a816671d:0xa9ebf12893abb828!8m2!3d23.3496601!4d85.3104862!16s%2Fg%2F11wbvkw_tm?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-all duration-300 cursor-pointer"
                  title="Open in Google Maps"
                >
                </a>

                {/* Optional dark edge blending (kept subtle, no grayscale on map) */}
                <div className="absolute inset-0 bg-slate-900/10 pointer-events-none z-10 mix-blend-overlay" />
                
                <iframe
                  title="Global Webify HQ Map Location"
                  src="https://maps.google.com/maps?q=23.3496601,85.3104862&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 transition-transform duration-700 group-hover:scale-105"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Contact Info Content */}
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between relative z-10">
                <div className="space-y-10">
                  
                  {/* HQ Info */}
                  <div>
                    <h3 className="text-[11px] font-black text-green-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <Globe2 size={14} /> Global Webify (HQ)
                    </h3>
                    <div className="space-y-4 text-sm font-medium text-gray-300">
                      <div className="flex items-start gap-4">
                        <MapPin size={18} className="text-gray-500 shrink-0 mt-0.5" />
                        <a href="https://maps.google.com/?q=2nd+Floor,+Alam+Complex,+Ashok+Kunj,+Kadru,+Ranchi,+Jharkhand+834002" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">
                          2nd Floor, Alam Complex, Ashok Kunj,<br/> Kadru, Ranchi, Jharkhand 834002
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone size={18} className="text-gray-500" />
                        <a href="tel:+917563901100" className="hover:text-white transition-colors">+91 75639 01100</a>
                      </div>
                      <div className="flex items-center gap-4">
                        <Mail size={18} className="text-gray-500" />
                        <a href="mailto:help@globalwebify.com" className="hover:text-white transition-colors">help@globalwebify.com</a>
                      </div>
                    </div>
                  </div>

                  {/* Other Branches Grid */}
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                        US Branch
                      </h4>
                      <p className="text-xs font-medium text-gray-400 mb-1 line-clamp-2" title="473 Mundet Place, Ste US, Hillside, New Jersey 07205">
                        473 Mundet Place, Ste US<br/>Hillside, NJ 07205
                      </p>
                      <a href="tel:+19175908135" className="text-xs text-[#1a8b4c] hover:text-green-400 font-bold">+1 9175908135</a>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                        Dubai Partner
                      </h4>
                      <p className="text-xs font-medium text-gray-400 mb-1 line-clamp-2" title="Office 18, 2nd Floor, Aspin Commercial Tower">
                        Office 18, 2nd Floor<br/>Aspin Commercial Tower
                      </p>
                      <a href="tel:+971508461253" className="text-xs text-[#1a8b4c] hover:text-green-400 font-bold">+97 150 846 1253</a>
                    </div>
                  </div>
                </div>

                {/* Social Links Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Connect Online</span>
                  <div className="flex gap-2.5">
                    {SOCIAL_LINKS.map((social, i) => {
                      const IconMap: Record<string, any> = { Facebook, Twitter, Linkedin, Instagram, Youtube };
                      const Icon = IconMap[social.name] || Facebook;
                      return (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-[#1a8b4c] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                          <Icon size={16} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </m.div>
          </div>

        </div>
      </div>
    </div>
  );
}
