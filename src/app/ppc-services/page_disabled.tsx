import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPC Services | GlobalWebify',
  description: 'Professional PPC Services tailored for your business growth.',
};

export default function PPCServicesPage() {
  return (
    <main className="pt-40 pb-20 container-custom min-h-[60vh]">
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">PPC Services</h1>
      <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
        Welcome to our PPC Services page. Detailed content is coming soon!
      </p>
      <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
        <p className="text-gray-500">
          This is a placeholder for the <strong>PPC Services</strong> service page. 
        </p>
      </div>
    </main>
  );
}
