"use client";

import React from 'react';

const workflowSteps = [
  { step: "01", title: "Technical Strategy", desc: "We map out the project schema, evaluate integration requirements, and select the optimal framework to meet your speed and scale requirements." },
  { step: "02", title: "Fidelity Design Mockup", desc: "Our design team creates a breathtaking interactive wireframe, blending premium typography, harmonious color sets, and glassmorphic UI elements." },
  { step: "03", title: "Clean Semantic Development", desc: "Our elite engineers build your frontend with pristine Next.js, sanitized client files, and highly reusable, modular TypeScript/React elements." },
  { step: "04", title: "SEO Launch & Optimization", desc: "We run deep Lighthouse performance scans, submit sitemaps directly to Google Search Console, and verify Core Web Vitals targets are met." }
];

export default function WebDevWorkflow() {
  return (
    <section className="py-24 bg-gray-50/50 border-t border-gray-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 mb-6">
            Our 4-Phase Engineering Framework
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            We guide your custom web application through a meticulous development cycle, ensuring absolute compliance with security, performance, and SEO blueprints.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm text-left relative flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-black text-gray-100 group-hover:text-[#1a8b4c]/15 transition-colors">{step.step}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a8b4c]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[17px] mb-3">{step.title}</h3>
                <p className="text-[13.5px] text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
