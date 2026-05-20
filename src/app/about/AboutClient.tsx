"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Award } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    title: "Innovation First",
    desc: "We stay ahead of the curve with AI and the latest web technologies.",
    icon: <Lightbulb className="text-primary" size={32} />
  },
  {
    title: "Client-Centric",
    desc: "Your success is our priority. We tailor solutions to your specific needs.",
    icon: <Users className="text-primary" size={32} />
  },
  {
    title: "Excellence",
    desc: "We don't just deliver; we excel in every project we undertake.",
    icon: <Award className="text-primary" size={32} />
  },
  {
    title: "Strategic Growth",
    desc: "Our goal is to drive long-term ROI for your business.",
    icon: <Target className="text-primary" size={32} />
  }
];

export default function AboutClient() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold font-heading mb-8"
            >
              Driving the Future of <span className="text-primary-light">Digital Business</span>
            </motion.h1>
            <p className="text-xl text-primary-light/80 leading-relaxed">
              GlobalWebify is more than just an agency. We are a team of passionate creators, developers, and strategists dedicated to redefining what's possible in the digital realm.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 mb-8">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                To empower businesses worldwide by providing innovative, high-quality digital solutions that drive growth and create lasting impact. We believe in the power of technology to solve complex problems and create new opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-bold text-gray-800">Global Standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-bold text-gray-800">Uncompromising Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-bold text-gray-800">Ethical Practices</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Mission" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hidden md:block z-10">
                <p className="text-4xl font-black text-primary mb-1">10+</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all"
              >
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
