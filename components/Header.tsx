'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/driver', label: 'Driver View' },
  { href: '/manager', label: 'Manager Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/case-study', label: 'Case Study' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: '#D6DBE1', height: '64px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0369EA' }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm sm:text-base" style={{ color: '#00263E' }}>
            Samsara <span style={{ color: '#0369EA' }}>· TrustLoop</span>
          </span>
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 relative ${
                  isActive ? '' : ''
                }`}
                style={{
                  color: isActive ? '#0369EA' : '#6B7280',
                  borderBottom: isActive ? '2px solid #0369EA' : '2px solid transparent',
                  paddingBottom: '6px',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Live Demo badge */}
          <div className="flex items-center gap-2 rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(13,171,65,0.1)', border: '1px solid rgba(13,171,65,0.3)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium" style={{ color: '#0DAB41' }}>Live Demo</span>
          </div>

          {/* CTA button */}
          <Link
            href="/manager"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-white rounded-full px-4 py-2 transition-all duration-200"
            style={{ backgroundColor: '#0369EA' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#0255C5';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#0369EA';
            }}
          >
            View Dashboard →
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t px-4 py-2 flex gap-1 overflow-x-auto" style={{ borderColor: '#D6DBE1', backgroundColor: '#FFFFFF' }}>
        {navLinks.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200 rounded-full"
              style={{
                color: isActive ? '#0369EA' : '#6B7280',
                backgroundColor: isActive ? '#F0F6FE' : 'transparent',
                border: isActive ? '1px solid #0369EA' : '1px solid transparent',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
