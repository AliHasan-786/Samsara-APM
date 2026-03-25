'use client';

import Link from 'next/link';
import { ArrowRight, Shield, AlertTriangle, Users, DollarSign, BarChart2, RefreshCw, Phone, Monitor } from 'lucide-react';

const stats = [
  {
    value: '$3.95M',
    label: "Samsara's BIPA settlement over AI data without driver consent (2026)",
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    value: '93%',
    label: 'Fleet managers overwhelmed — Samsara case studies show 93% review volume reduced by automation',
    icon: BarChart2,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    value: '$8,000',
    label: 'Average cost to replace one driver who quit due to perceived AI surveillance',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
];

const flowSteps = [
  {
    icon: '🎯',
    title: 'AI Flags Event',
    description: 'AI detects distraction with 71% confidence — but is it real?',
    color: 'border-red-500/40 bg-red-500/5',
    badge: 'Automated',
    badgeColor: 'bg-red-500/20 text-red-300',
  },
  {
    icon: '🗣️',
    title: 'Driver Disputes',
    description: 'Driver selects reason in 2 taps: Mirror Check, Sun Glare, Radio...',
    color: 'border-amber-500/40 bg-amber-500/5',
    badge: 'Driver Voice',
    badgeColor: 'bg-amber-500/20 text-amber-300',
  },
  {
    icon: '✅',
    title: 'Manager Reviews',
    description: 'Side-by-side AI vs Driver comparison. Approve clears the record.',
    color: 'border-green-500/40 bg-green-500/5',
    badge: 'Human Review',
    badgeColor: 'bg-green-500/20 text-green-300',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">
              APM Portfolio — Functional Prototype
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            AI Safety Events{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
              Shouldn&apos;t Cost You
            </span>{' '}
            <br />
            Your Best Drivers
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            TrustLoop gives drivers a voice, cleans your fleet data, and retrains your AI —
            automatically. Built on Samsara&apos;s platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/driver"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40"
            >
              <Phone className="w-4 h-4" />
              See the Driver Experience
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/manager"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
            >
              <Monitor className="w-4 h-4" />
              View Manager Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            Fully interactive — submit disputes in Driver View, review them instantly in Manager Dashboard
          </p>
        </div>
      </section>

      {/* Problem Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">The Problem is Real</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Fleet AI without driver trust is a liability — financially, legally, and operationally.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl border ${stat.border} ${stat.bg} p-6 flex flex-col gap-3`}
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The TrustLoop System */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The TrustLoop System
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A three-step workflow that turns every dispute into a training signal.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-4 flex-1">
              <div className={`flex-1 w-full border ${step.color} rounded-xl p-5 flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{step.icon}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-slate-600 shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
            <RefreshCw className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-300 text-base mb-1">
              The RLHF Flywheel — Model Retrains on Clean Data
            </h3>
            <p className="text-slate-400 text-sm">
              Every approved dispute becomes a labeled training example. The AI gets smarter every review cycle,
              reducing false positives and rebuilding driver trust over time.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">ROI at a Glance</h2>
          <p className="text-slate-400">Conservative estimates for a 500-truck fleet.</p>
        </div>
        <div className="max-w-xl mx-auto bg-[#1E293B] border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-400" />
              <h3 className="font-bold text-white">Annual Value Calculation</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Fleet size', value: '500 trucks' },
                { label: 'Driver turnover prevented', value: '5 drivers/year' },
                { label: 'Savings per driver', value: '$8,000' },
                { label: 'Retention savings', value: '$40,000/year' },
                { label: 'Manager hours saved', value: '52 hrs/year' },
                { label: 'Productivity value', value: '$2,600/year' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{row.label}</span>
                  <span className="font-medium text-slate-200">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 bg-green-500/10 flex items-center justify-between">
            <span className="font-semibold text-green-300 text-lg">Total Annual Value</span>
            <span className="font-bold text-green-400 text-2xl">$42,600</span>
          </div>
        </div>
      </section>

      {/* Try the Demo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Try the Demo</h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Two fully interactive views — start as a driver disputing an AI flag, then switch to see
            it appear in the manager&apos;s review queue.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/driver"
            className="group bg-[#1E293B] border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 flex flex-col gap-4 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-white">Driver Mobile View</div>
                <div className="text-xs text-slate-500">Mobile-first dispute workflow</div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 text-xs text-slate-400 leading-relaxed">
              See your AI safety event list, review flagged incidents with confidence scores, and submit
              a dispute in 2 taps.
            </div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
              Open Driver View <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/manager"
            className="group bg-[#1E293B] border border-slate-700 hover:border-green-500/50 rounded-xl p-6 flex flex-col gap-4 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="font-bold text-white">Fleet Manager Dashboard</div>
                <div className="text-xs text-slate-500">Full desktop review interface</div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 text-xs text-slate-400 leading-relaxed">
              Review pending disputes with a side-by-side AI vs. Driver comparison. Approve or send
              to coaching with one click.
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium group-hover:gap-3 transition-all">
              Open Manager Dashboard <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/case-study"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors"
          >
            Read the full PM Case Study
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
