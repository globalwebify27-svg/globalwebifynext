"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "E-Commerce Revolution",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "A full-scale online marketplace with real-time analytics."
  },
  {
    id: 2,
    title: "AI Healthcare Platform",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Revolutionizing patient care with predictive modeling."
  },
  {
    id: 3,
    title: "Organic Brand Growth",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "300% increase in organic traffic for a lifestyle brand."
  },
  {
    id: 4,
    title: "SaaS Dashboard UI",
    category: "Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Clean, intuitive interface for complex data management."
  },
  {
    id: 5,
    title: "Social Media Strategy",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Viral campaign that reached 2M+ unique users."
  },
  {
    id: 6,
    title: "Corporate Web Portal",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "High-performance portal for a global logistics firm."
  }
];

const categories = ["All", "Web Development", "SEO", "Marketing", "AI Solutions", "Design"];

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold font-heading text-gray-900 mb-6"
          >
            Our <span className="text-primary">Portfolio</span>
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
            A showcase of our best work across various industries. We bring visions to life through code and strategy.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3]"
              >
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-10">
                  <span className="text-primary-light text-sm font-bold uppercase tracking-widest mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-6">{project.desc}</p>
                  <div className="flex gap-4">
                    <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary-dark transition-colors">
                      <ExternalLink size={20} />
                    </button>
                    <button className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/20 transition-colors">
                      <Search size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
