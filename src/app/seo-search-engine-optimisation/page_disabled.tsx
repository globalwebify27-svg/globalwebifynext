import { Metadata } from 'next';
import SEOClient from './SEOClient';

export const metadata: Metadata = {
  title: 'SEO Services | Search Engine Optimization | GlobalWebify',
  description: 'AI-driven SEO strategies to help your business rank higher, drive organic traffic, and convert visitors into customers.',
  keywords: ['SEO Services', 'Search Engine Optimization', 'Keyword Research', 'Link Building', 'SEO Agency']
};

export default function SEOPage() {
  return <SEOClient />;
}
