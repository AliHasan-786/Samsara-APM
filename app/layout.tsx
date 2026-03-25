import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { DisputeProvider } from '@/context/DisputeContext';
import { ToastProvider } from '@/components/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Samsara TrustLoop — APM Portfolio Demo',
  description:
    'A self-guided product demo showing how AI-powered fleet safety can incorporate driver dispute workflows to improve trust, data quality, and retention.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`} style={{ backgroundColor: '#FFFFFF', color: '#333333' }}>
        <DisputeProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
          </ToastProvider>
        </DisputeProvider>
      </body>
    </html>
  );
}
