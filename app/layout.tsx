import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inner Meaning',
  description: 'A calm meaning library.',
  verification: {
    google: 'FLcRRJLdzdFBb2tvDxWnGkbAIJ654F_wp5mAzTOyjqk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
