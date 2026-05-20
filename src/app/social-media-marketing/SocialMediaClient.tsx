"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, MessageCircle, Users, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const socialStats = [
  { label: "Reach", value: "10M+" },
  { label: "Engagement", value: "25%" },
  { label: "Ad Spend Managed", value: "$1M+" },
  { label: "Clients", value: "100+" }
];

export default function SocialMediaClient() {
  return (
    <div className="pt-20">
      <section className="bg-secondary-dark py-24 text-gray-900">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold font-heading mb-8">
              Social Media <span className="text-primary">Management</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              We help brands connect with their audience where they spend their time. From content creation to community management and paid advertising.
            </p>
            <Link 
              href="/contact" 
              className="bg-primary text-white px-10 py-5 rounded-2xl font-bold inline-flex items-center gap-3 hover:bg-primary-dark transition-all shadow-xl"
            >
              Grow Your Brand <ArrowRight size={20} />
            </Link>
          </motion.div>
          <div className="relative">
             <div className="grid grid-cols-2 gap-6">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <div key={i} className="aspect-square bg-white rounded-3xl shadow-lg flex items-center justify-center border border-gray-50 hover:border-primary transition-all group">
                    <Icon className="text-gray-300 group-hover:text-primary transition-colors" size={64} />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {socialStats.map((stat, i) => (
              <div key={i} className="text-center p-8 bg-gray-50 rounded-3xl">
                <p className="text-4xl font-black text-primary mb-2 font-heading">{stat.value}</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom grid lg:grid-cols-3 gap-8">
          {[
            { title: "Content Creation", icon: <MessageCircle className="text-primary" />, desc: "Visuals and copy that stop the scroll." },
            { title: "Community Management", icon: <Users className="text-primary" />, desc: "Engaging with your fans 24/7." },
            { title: "Social Advertising", icon: <Share2 className="text-primary" />, desc: "Targeted ads that drive direct sales." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all">
              <div className="mb-8">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
