import { Metadata } from 'next';
import BookingClient from '@/features/company/components/BookingClient';

export const metadata: Metadata = {
  title: 'Book a Consultation | GlobalWebify',
  description: 'Book an appointment with GlobalWebify experts. Ready to transform your digital presence? Let\'s discuss your project.',
  keywords: ['Book Appointment', 'Consultation GlobalWebify', 'Digital Marketing Agency Contact']
};

export default function BookingPage() {
  return <BookingClient />;
}
