import { Metadata } from 'next';
import SocialMediaClient from './SocialMediaClient';

export const metadata: Metadata = {
  title: 'Social Media Management & Marketing | GlobalWebify',
  description: 'Connect with your audience where they spend their time. We offer expert content creation, community management, and paid advertising.',
  keywords: ['Social Media Marketing', 'Social Media Management', 'Facebook Ads', 'Instagram Growth', 'Brand Awareness']
};

export default function SocialMediaPage() {
  return <SocialMediaClient />;
}
