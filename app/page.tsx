'use client';

import Link from 'next/link';
import { ArrowRight, Shield, AlertTriangle, Users, DollarSign, BarChart2, RefreshCw, Phone, Monitor } from 'lucide-react';

const stats = [
  {
    value: '$3.95M',
    label: "Samsara's BIPA settlement over AI data without driver consent (2026)",
    icon: AlertTriangle,
  },
  {
    value: '93%',
    label: 'Fleet managers overwhelmed — Samsara case studies show 93% review volume reduced by automation',
    icon: BarChart2,
  },
  {
    value: '$8,000',
    label: 'Average cost to replace one driver who quit due to perceived AI surveillance',
    icon: Users,
  },
];

const flowSteps = [
  {
    num: 1,
    icon: '🎯',
    title: 'AI Flags Event',
    description: 'AI detects distraction with 71% confidence — but is it real?',
    badge: 'Automated',
  },
  {
    num: 2,
    icon: '🗣️',
    title: 'Driver Disputes',
    description: 'Driver selects reason in 2 taps: Mirror Check, Sun Glare, Radio...',
    badge: 'Driver Voice',
  },
  {
    num: 3,
    icon: '✅',
    title: 'Manager Reviews',
    description: 'Side-by-side AI vs Driver comparison. Approve clears the record.',
    badge: 'Human Review',
  },
  {
    num: 4,
    icon: '🧠',
    title: 'AI Retrains',
    description: 'Resolution becomes labeled training data. The model improves.',
    badge: 'RLHF Loop',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section — dark, intentional */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#101E2D' }}
      >
        {/* Subtle CSS grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-[740px] mx-auto px-4 sm:px-6 text-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
          {/* RLHF badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ backgroundColor: 'rgba(29,202,211,0.15)', border: '1px solid rgba(29,202,211,0.4)' }}>
            <Shield className="w-3.5 h-3.5" style={{ color: '#1DCAD3' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#1DCAD3' }}>
              RLHF-Powered · APM Portfolio Prototype
            </span>
          </div>

          <h1 className="font-bold text-white leading-tight mb-6" style={{ fontSize: '54px' }}>
            AI Safety Events Shouldn&apos;t Cost You Your Best Drivers
          </h1>

          <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontSize: '20px', color: '#A0CFFF' }}>
            TrustLoop gives drivers a voice, cleans your fleet data, and retrains your AI — automatically. Built on Samsara&apos;s platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/driver"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              style={{ backgroundColor: '#0369EA' }}
            >
              <Phone className="w-4 h-4" />
              See the Driver Experience
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/manager"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full transition-all duration-200"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF' }}
            >
              <Monitor className="w-4 h-4" />
              View Manager Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs" style={{ color: '#6B7280' }}>
            Fully interactive — submit disputes in Driver View, review them instantly in Manager Dashboard
          </p>
        </div>
      </section>

      {/* Problem Stats — white bg */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6B7280' }}>
              THE PROOF BEHIND THE PROBLEM
            </p>
            <p className="max-w-xl mx-auto" style={{ color: '#6B7280' }}>
              Fleet AI without driver trust is a liability — financially, legally, and operationally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl p-6 flex flex-col gap-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D6DBE1',
                  borderLeft: '4px solid #0369EA',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#F0F6FE' }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: '#0369EA' }} />
                </div>
                <div className="text-5xl font-bold" style={{ color: '#00263E' }}>{stat.value}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — pale tint bg */}
      <section className="py-20" style={{ backgroundColor: '#F0F6FE' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#00263E' }}>How TrustLoop Works</h2>
            <p className="max-w-xl mx-auto" style={{ color: '#6B7280' }}>
              A four-step workflow that turns every dispute into a training signal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {flowSteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div
                  className="flex-1 rounded-xl p-5 flex flex-col gap-3"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D6DBE1',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: '#0369EA' }}
                    >
                      {step.num}
                    </div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="font-bold" style={{ color: '#00263E' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{step.description}</p>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full self-start"
                    style={{ backgroundColor: '#F0F6FE', color: '#0369EA', border: '1px solid #BFDBFE' }}
                  >
                    {step.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Flywheel note */}
          <div
            className="flex items-center gap-4 rounded-full px-6 py-3 mx-auto w-fit"
            style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
          >
            <RefreshCw className="w-4 h-4 shrink-0" style={{ color: '#0369EA' }} />
            <p className="text-sm font-medium" style={{ color: '#1D4ED8' }}>
              The RLHF Flywheel — every approved dispute retrains the model, reducing false positives over time
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator — white bg */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#00263E' }}>ROI at a Glance</h2>
            <p style={{ color: '#6B7280' }}>Conservative estimates for a 500-truck fleet.</p>
          </div>
          <div
            className="max-w-[600px] mx-auto rounded-xl overflow-hidden"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#D6DBE1' }}>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5" style={{ color: '#0DAB41' }} />
                <h3 className="font-bold" style={{ color: '#00263E' }}>Annual Value Calculation</h3>
              </div>
              <div className="space-y-0">
                {[
                  { label: 'Fleet size', value: '500 trucks' },
                  { label: 'Driver turnover prevented', value: '5 drivers/year' },
                  { label: 'Savings per driver', value: '$8,000' },
                  { label: 'Retention savings', value: '$40,000/year' },
                  { label: 'Manager hours saved', value: '52 hrs/year' },
                  { label: 'Productivity value', value: '$2,600/year' },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm px-3 py-2.5"
                    style={{ backgroundColor: i % 2 === 1 ? '#F8FAFC' : 'transparent' }}
                  >
                    <span style={{ color: '#6B7280' }}>{row.label}</span>
                    <span className="font-medium" style={{ color: '#333333' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 flex items-center justify-between" style={{ backgroundColor: '#F0F6FE' }}>
              <span className="font-semibold text-lg" style={{ color: '#00263E' }}>Total Annual Value</span>
              <span className="font-bold text-2xl" style={{ color: '#0369EA' }}>$42,600</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Demo — dark navy */}
      <section className="py-20" style={{ backgroundColor: '#00263E' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Explore the Demo</h2>
            <p className="max-w-lg mx-auto" style={{ color: '#A0CFFF' }}>
              Two fully interactive views — start as a driver disputing an AI flag, then switch to see it appear in the manager&apos;s review queue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/driver"
              className="group rounded-xl p-6 flex flex-col gap-4 transition-all duration-200"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(3,105,234,0.3)' }}>
                  <Phone className="w-5 h-5" style={{ color: '#A0CFFF' }} />
                </div>
                <div>
                  <div className="font-bold text-white">Driver Mobile View</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>Mobile-first dispute workflow</div>
                </div>
              </div>
              <div className="rounded-lg p-4 text-xs leading-relaxed" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#A0CFFF' }}>
                See your AI safety event list, review flagged incidents with confidence scores, and submit a dispute in 2 taps.
              </div>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#0369EA' }}>
                Open Driver View <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/manager"
              className="group rounded-xl p-6 flex flex-col gap-4 transition-all duration-200"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(13,171,65,0.25)' }}>
                  <Monitor className="w-5 h-5" style={{ color: '#0DAB41' }} />
                </div>
                <div>
                  <div className="font-bold text-white">Fleet Manager Dashboard</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>Full desktop review interface</div>
                </div>
              </div>
              <div className="rounded-lg p-4 text-xs leading-relaxed" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#A0CFFF' }}>
                Review pending disputes with a side-by-side AI vs. Driver comparison. Approve or send to coaching with one click.
              </div>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#0DAB41' }}>
                Open Manager Dashboard <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/case-study"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#A0CFFF' }}
            >
              Read the full PM Case Study
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center" style={{ backgroundColor: '#101E2D' }}>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Samsara TrustLoop — APM Portfolio · Ali Hasan · 2026
        </p>
      </footer>
    </div>
  );
}
