import './globals.css';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Cellia | Engineering Project Management Professional',
  description: 'Portfolio of Cellia - MSc Engineering Project Management student at Manchester Metropolitan University. Specializing in construction management, BIM, and sustainable development.',
  keywords: ['Engineering', 'Project Management', 'Construction', 'BIM', 'Cellia', 'Portfolio'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
