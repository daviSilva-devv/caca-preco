import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: {
    default: 'Caça Preço',
    template: '%s · Caça Preço'
  },
  description: 'Swipe-first price discovery app with scoring, price history and store comparison.',
  manifest: '/manifest.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#07090d'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
