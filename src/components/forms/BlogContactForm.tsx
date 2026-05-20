"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function BlogContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your API
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200">
      <h3 className="text-[15.5px] font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2 pb-3 border-b border-gray-50">
        <span className="text-[#1a8b4c]">📧</span> Contact Us
      </h3>
      
      {submitted ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-xs font-bold text-center">
          Thank you! Your message has been sent successfully. We will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Field: Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Your Name *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c]/50 transition-colors"
            />
          </div>
          
          {/* Field: Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Your Email *</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email address"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c]/50 transition-colors"
            />
          </div>
          
          {/* Field: Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Your Phone *</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c]/50 transition-colors"
            />
          </div>
          
          {/* Field: Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Message</label>
            <textarea 
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a8b4c]/50 transition-colors resize-none"
            />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#1a8b4c] hover:bg-[#15703d] text-white font-black py-3.5 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-xs tracking-wider uppercase mt-2"
          >
            <Send size={12} className="stroke-[2.5]" /> Submit
          </button>
        </form>
      )}
    </div>
  );
}
