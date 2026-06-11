import React from 'react';
import ServiceForm from '@/features/admin/components/services/ServiceForm';

export const dynamic = 'force-dynamic';

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 font-lexend uppercase tracking-tight">
          Create New Service Page
        </h2>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Configure a new dynamic service page and SEO metadata settings
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
