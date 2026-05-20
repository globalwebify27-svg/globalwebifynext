"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'white' | 'gray' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'hero';
}

export const Section = ({ 
  children, 
  className, 
  id, 
  variant = 'white',
  spacing = 'md' 
}: SectionProps) => {
  
  const variantStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-950 text-white'
  };

  const spacingStyles = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16 lg:py-20',
    lg: 'py-16 md:py-24 lg:py-32',
    hero: 'pb-12 md:pb-16 lg:pb-24'
  };

  return (
    <section 
      id={id}
      className={cn(
        variantStyles[variant],
        spacingStyles[spacing],
        'relative w-full overflow-hidden',
        className
      )}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 w-full">
        {children}
      </div>
    </section>
  );
};
