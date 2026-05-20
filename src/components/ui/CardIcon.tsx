"use client";

import React, { useState } from "react";
import { 
  Monitor, 
  Smartphone, 
  ShoppingCart, 
  Layout, 
  Palette, 
  Settings, 
  Code, 
  Briefcase, 
  BarChart3, 
  Search, 
  Share2, 
  Megaphone, 
  FileText, 
  Globe, 
  TrendingUp,
  HelpCircle
} from "lucide-react";

const ICON_MAP = {
  Monitor, 
  Smartphone, 
  ShoppingCart, 
  Layout, 
  Palette, 
  Settings, 
  Code, 
  Briefcase, 
  BarChart3, 
  Search, 
  Share2, 
  Megaphone, 
  FileText, 
  Globe, 
  TrendingUp
};

interface CardIconProps {
  src?: string | null;
  alt?: string;
  iconName: string;
  colorClass: string;
}

export function CardIcon({ src, alt, iconName, colorClass }: CardIconProps) {
  const [error, setError] = useState(false);

  // Resolve the Lucide icon from the string name, defaulting to HelpCircle
  const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP] || HelpCircle;

  if (error || !src || src.trim() === "" || src === "null" || src === "undefined") {
    return <IconComponent className={`w-5 h-5 ${colorClass} stroke-[2] group-hover:scale-110 transition-transform`} />;
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      onError={() => setError(true)}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
    />
  );
}
