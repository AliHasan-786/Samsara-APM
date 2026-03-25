'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, RefreshCw, Target, Users, BarChart2, DollarSign, Code, Lightbulb, Shield, BookOpen, AlertTriangle } from 'lucide-react';

const sections = [
  { id: 'summary', label: 'Executive Summary', icon: BookOpen },
  { id: 'problem', label: 'The Problem', icon: AlertTriangle },
  { id: 'users', label: 'Users & Pain Points', icon: Users },
  { id: 'solution', label: 'The Solution', icon: Shield },
  { id: 'flywheel', label: 'The RLHF Flywheel', icon: RefreshCw },
  { id: 'metrics', label: 'Success Metrics', icon: BarChart2 },
  { id: 'roi', label: 'ROI Calculation', icon: DollarSign },
  { id: 'next', label: "What I'd Build Next", icon: Lightbulb },
  { id: 'tech', label: 'Technical Architecture', icon: Code },
];

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-20" />;
}

function SectionHeader({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: '#EFF6FF' }}
      >
        <Icon className="w-4 h-4" style={{ color: '#0369EA' }} />
      </div>
      <h2 id={id} className="text-xl font-bold scroll-mt-24" style={{ color: '#00263E' }}>{title}</h2>
    </div>
  );
}

export default function CaseStudyPage() {
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero — dark, intentional */}
      <div className="py-16 px-4 sm:px-6 text-center" style={{ backgroundColor: '#101E2D' }}>
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
          style={{ backgroundColor: 'rgba(3,105,234,0.2)', border: '1px solid rgba(3,105,234,0.4)' }}
        >
          <Target className="w-3.5 h-3.5" style={{ color: '#A0CFFF' }} />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#A0CFFF' }}>PM Case Study</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Samsara TrustLoop</h1>
        <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#A0CFFF' }}>
          An RLHF-powered dispute layer that transforms driver friction into AI training signal —
          improving fleet safety data quality while rebuilding driver trust.
        </p>
      </div>

      {/* Content area — white */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex gap-10">
            {/* Left sidebar */}
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-24 space-y-0.5">
                <p className="text-xs uppercase tracking-wider font-medium mb-3 px-3" style={{ color: '#6B7280' }}>Contents</p>
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                      style={{
                        color: activeSection === section.id ? '#0369EA' : '#6B7280',
                        backgroundColor: activeSection === section.id ? '#EFF6FF' : 'transparent',
                        border: activeSection === section.id ? '1px solid #BFDBFE' : '1px solid transparent',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="leading-tight">{section.label}</span>
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* Right content */}
            <div className="flex-1 max-w-3xl space-y-16">

              {/* Executive Summary */}
              <section>
                <SectionAnchor id="summary" />
                <SectionHeader icon={BookOpen} title="Executive Summary" id="summary-h" />
                {/* Pull quote */}
                <div
                  className="rounded-r-xl p-6 mb-6"
                  style={{ borderLeft: '4px solid #0369EA', backgroundColor: '#F0F6FE' }}
                >
                  <p className="text-base leading-relaxed font-medium" style={{ color: '#00263E' }}>
                    TrustLoop is an RLHF-powered dispute layer that transforms driver friction into AI training signal.
                  </p>
                </div>
                <p className="leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                  Commercial fleet AI systems like Samsara&apos;s Driver Safety product flag thousands of events per day.
                  When those flags are wrong — a driver glancing at mirrors flagged as &ldquo;distraction&rdquo; — the consequences
                  compound: the driver loses trust, disputes go unheard, safety scores are gamed or ignored, and the AI
                  never learns from its mistakes.
                </p>
                <p className="leading-relaxed" style={{ color: '#6B7280' }}>
                  TrustLoop closes this loop by adding a structured dispute workflow that feeds every resolution back
                  into the model as labeled training data. The result: fewer false positives, higher driver trust,
                  and a continuously improving safety AI.
                </p>
              </section>

              {/* The Problem */}
              <section>
                <SectionAnchor id="problem" />
                <SectionHeader icon={AlertTriangle} title="The Problem" id="problem-h" />

                <div className="space-y-4">
                  {[
                    {
                      title: 'The $3.95M BIPA Lawsuit (2026)',
                      borderColor: '#DF2036',
                      badge: 'Legal Risk',
                      badgeBg: '#FEF2F2',
                      badgeText: '#991B1B',
                      badgeBorder: '#DF2036',
                      content:
                        "Illinois's Biometric Information Privacy Act lawsuit against Samsara demonstrates that capturing driver biometric data (eye tracking, facial recognition) without proper consent frameworks creates existential legal risk. A dispute layer creates an explicit consent and data governance touchpoint.",
                    },
                    {
                      title: 'Driver Rage on r/Truckers',
                      borderColor: '#FBB924',
                      badge: 'Retention Risk',
                      badgeBg: '#FFF8E7',
                      badgeText: '#B45309',
                      badgeBorder: '#FBB924',
                      content:
                        'Threads like "My company\'s AI flagged me for sneezing" with thousands of upvotes reveal the operator-driver trust gap. Drivers who feel surveilled without recourse leave — at $8,000 replacement cost per driver. With a 90% industry turnover rate, this is the #1 non-obvious churn driver.',
                    },
                    {
                      title: 'Alert Fatigue Kills Data Quality',
                      borderColor: '#0369EA',
                      badge: 'Data Quality',
                      badgeBg: '#EFF6FF',
                      badgeText: '#1D4ED8',
                      badgeBorder: '#0369EA',
                      content:
                        "Jordan Carriers reduced review workload 93% with Samsara automation — but automation without ground truth feedback loops creates training data contamination. False positives that go unchallenged become labeled as true positives, degrading model accuracy over time.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D6DBE1',
                        borderLeft: `4px solid ${item.borderColor}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold" style={{ color: '#00263E' }}>{item.title}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: item.badgeBg, color: item.badgeText, border: `1px solid ${item.badgeBorder}` }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{item.content}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Users & Pain Points */}
              <section>
                <SectionAnchor id="users" />
                <SectionHeader icon={Users} title="Users & Pain Points" id="users-h" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Driver persona */}
                  <div
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: '#EFF6FF' }}
                      >🚛</div>
                      <div>
                        <p className="font-bold" style={{ color: '#00263E' }}>The Driver</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>Marcus, 8 years OTR experience</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>Pain Points</p>
                        <ul className="space-y-1.5 text-sm" style={{ color: '#6B7280' }}>
                          <li className="flex gap-2"><span style={{ color: '#DF2036' }} className="shrink-0">✗</span>Feels surveilled without consent or recourse</li>
                          <li className="flex gap-2"><span style={{ color: '#DF2036' }} className="shrink-0">✗</span>Safety score impacts pay with no appeal process</li>
                          <li className="flex gap-2"><span style={{ color: '#DF2036' }} className="shrink-0">✗</span>No visibility into what the AI actually flagged</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>Job-to-be-Done</p>
                        <p className="text-sm" style={{ color: '#333333' }}>&ldquo;When I&apos;m wrongly flagged, I want to quickly explain what really happened so my record stays clean.&rdquo;</p>
                      </div>
                    </div>
                  </div>

                  {/* Fleet Manager persona */}
                  <div
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: '#ECFDF5' }}
                      >📊</div>
                      <div>
                        <p className="font-bold" style={{ color: '#00263E' }}>The Fleet Manager</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>Sarah, manages 150-truck fleet</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>Pain Points</p>
                        <ul className="space-y-1.5 text-sm" style={{ color: '#6B7280' }}>
                          <li className="flex gap-2"><span style={{ color: '#DF2036' }} className="shrink-0">✗</span>Drowning in alerts — can&apos;t distinguish real vs. false</li>
                          <li className="flex gap-2"><span style={{ color: '#DF2036' }} className="shrink-0">✗</span>No structured way to give driver feedback</li>
                          <li className="flex gap-2"><span style={{ color: '#DF2036' }} className="shrink-0">✗</span>Coaching wrong drivers damages morale</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>Job-to-be-Done</p>
                        <p className="text-sm" style={{ color: '#333333' }}>&ldquo;I need to quickly tell real safety risks from AI noise, so I coach the right drivers.&rdquo;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Solution */}
              <section>
                <SectionAnchor id="solution" />
                <SectionHeader icon={Shield} title="The Solution" id="solution-h" />

                <p className="leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  Three deliberate design decisions shaped the TrustLoop product:
                </p>

                <div className="space-y-5">
                  {[
                    {
                      num: '01',
                      title: 'Lowest-Friction Dispute Flow (Mobile-First, 2 Taps)',
                      content: 'Commercial drivers spend ~11 hours a day on-road. Any dispute mechanism requiring more than 2 minutes of attention will be ignored. TrustLoop uses pre-categorized reason codes (Mirror Check, Sun Glare, Radio/HVAC) instead of free text as the primary input, with an optional note field for context. This reduces cognitive load while producing structured data for the RLHF pipeline.',
                      insight: 'Structured reasons > free text for ML training data quality',
                      borderColor: '#0369EA',
                    },
                    {
                      num: '02',
                      title: 'Side-by-Side AI vs. Driver Comparison for Managers',
                      content: 'Managers reviewing disputes need to make calibrated trust decisions. Showing both the AI\'s raw confidence score and the driver\'s structured claim simultaneously — without requiring them to dig through logs — reduces decision time and improves consistency. The confidence score color-coding (amber <60%, orange 60-75%, red >75%) provides immediate visual triage.',
                      insight: 'Managers make better decisions with parallel evidence, not sequential',
                      borderColor: '#1DCAD3',
                    },
                    {
                      num: '03',
                      title: 'Every Review Labels Training Data',
                      content: 'The key product insight: dispute resolution is not just a customer service workflow — it is a data labeling pipeline. Every approved dispute creates a high-quality negative example for the computer vision model (this pattern ≠ distraction). Every rejected dispute confirms a true positive. The cumulative effect is a continuously improving model with human-in-the-loop supervision.',
                      insight: 'Product workflow as ML data pipeline — the RLHF flywheel',
                      borderColor: '#0DAB41',
                    },
                  ].map(item => (
                    <div
                      key={item.num}
                      className="rounded-xl p-5"
                      style={{
                        backgroundColor: '#F0F6FE',
                        borderLeft: `4px solid ${item.borderColor}`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl font-bold shrink-0 leading-none" style={{ color: '#D6DBE1' }}>{item.num}</span>
                        <div>
                          <h3 className="font-bold mb-2" style={{ color: '#00263E' }}>{item.title}</h3>
                          <p className="text-sm leading-relaxed mb-3" style={{ color: '#6B7280' }}>{item.content}</p>
                          <div
                            className="rounded-lg px-3 py-2"
                            style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
                          >
                            <p className="text-xs font-medium" style={{ color: '#1D4ED8' }}>Key Insight: {item.insight}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* RLHF Flywheel */}
              <section>
                <SectionAnchor id="flywheel" />
                <SectionHeader icon={RefreshCw} title="The RLHF Flywheel" id="flywheel-h" />

                <p className="leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  The &ldquo;Collaborative AI&rdquo; pitch positions TrustLoop not as a dispute mechanism, but as a continuous
                  learning system. This reframe is critical for both driver adoption (agency over AI) and executive
                  buy-in (data moat).
                </p>

                <div
                  className="rounded-xl p-6 mb-6"
                  style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: '🎯', step: 'AI Flags', desc: 'Event detected with confidence score' },
                      { icon: '🗣️', step: 'Driver Disputes', desc: 'Structured reason + optional note submitted' },
                      { icon: '✅', step: 'Manager Reviews', desc: 'Human decision: approve or reject' },
                      { icon: '🧠', step: 'Model Retrains', desc: 'Resolution labeled as training data' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-2">
                        <span className="text-2xl">{item.icon}</span>
                        <p className="font-semibold text-sm" style={{ color: '#00263E' }}>{item.step}</p>
                        <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{item.desc}</p>
                        {i < 3 && <span className="text-lg font-bold hidden lg:block" style={{ color: '#0369EA' }}>→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  Over 6–12 months, the false positive rate should measurably decrease for the top disputed event
                  categories (distraction, phone use). This creates a defensible network effect: fleets using TrustLoop
                  generate better training data, producing a more accurate model, which increases driver trust, which
                  increases dispute participation, which produces more training data.
                </p>
              </section>

              {/* Metrics */}
              <section>
                <SectionAnchor id="metrics" />
                <SectionHeader icon={BarChart2} title="How I&apos;d Measure Success" id="metrics-h" />

                <div className="space-y-4">
                  {[
                    {
                      metric: 'Dispute Rate by Confidence Bucket',
                      type: 'Proxy Metric',
                      description: 'Track what % of events are disputed, segmented by AI confidence score. Hypothesis: if TrustLoop is working, the dispute rate for low-confidence events (40-60%) should decline over time as the model improves. A rising dispute rate at >80% confidence would be a red flag.',
                      target: 'Dispute rate for <60% confidence events decreases by 30% in 6 months',
                    },
                    {
                      metric: 'Driver Churn Rate Pre/Post Rollout',
                      type: 'Business Metric',
                      description: 'Compare quarterly driver turnover rate before and after TrustLoop rollout, controlling for seasonality. This is the ultimate product metric — if drivers feel heard and fairly treated, they stay. Requires coordination with HR/Operations for data access.',
                      target: '1% reduction in annual turnover = $40,000 saved per 500-driver fleet',
                    },
                    {
                      metric: 'AI Model Accuracy by Quarter',
                      type: 'Technical Metric',
                      description: 'Track precision/recall for the top 3 disputed event types (distraction, phone_use, fatigue) across model versions. This is the RLHF payoff metric — as labeled dispute data accumulates, model performance should improve measurably on held-out test sets.',
                      target: '+5% precision on distraction events per model iteration',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold" style={{ color: '#00263E' }}>{item.metric}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-md whitespace-nowrap"
                          style={{ backgroundColor: '#F0F6FE', color: '#6B7280' }}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: '#6B7280' }}>{item.description}</p>
                      <div
                        className="rounded-lg px-3 py-2"
                        style={{ backgroundColor: '#ECFDF5', border: '1px solid #0DAB41' }}
                      >
                        <p className="text-xs" style={{ color: '#065F46' }}>Target: {item.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ROI */}
              <section>
                <SectionAnchor id="roi" />
                <SectionHeader icon={DollarSign} title="ROI Calculation" id="roi-h" />

                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}>
                  <div className="p-5 border-b" style={{ borderColor: '#D6DBE1' }}>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                      Conservative model for a mid-size fleet operator (500 drivers). All figures are floor estimates —
                      actual value scales with fleet size and baseline turnover rate.
                    </p>
                    <div className="space-y-0 font-mono text-sm">
                      {[
                        ['Fleet size', '500 drivers'],
                        ['Industry annual turnover rate', '90% (ATRI 2023)'],
                        ['Annual driver departures', '450 drivers/year'],
                        ['TrustLoop turnover reduction (conservative)', '1%'],
                        ['Drivers retained per year', '5 drivers'],
                        ['Cost to replace one driver', '$8,000 (recruiting + onboarding + training)'],
                        ['Retention savings', '$40,000/year'],
                        ['', ''],
                        ['Manager review time saved (per dispute)', '15 min'],
                        ['Disputes per year (est.)', '208'],
                        ['Total hours saved', '52 hrs/year'],
                        ['Manager hourly cost', '$50/hr'],
                        ['Review time value', '$2,600/year'],
                      ].map(([label, value], i) => (
                        label === '' ? (
                          <div key={i} className="border-t my-2" style={{ borderColor: '#D6DBE1' }} />
                        ) : (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-4 px-2 py-2"
                            style={{ backgroundColor: i % 2 === 0 ? '#F8FAFC' : 'transparent' }}
                          >
                            <span style={{ color: '#6B7280' }}>{label}</span>
                            <span className="text-right" style={{ color: '#333333' }}>{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between" style={{ backgroundColor: '#F0F6FE' }}>
                    <span className="font-bold text-lg" style={{ color: '#00263E' }}>Total Annual Value</span>
                    <span className="font-bold text-2xl" style={{ color: '#0369EA' }}>$42,600</span>
                  </div>
                </div>
              </section>

              {/* What I'd Build Next */}
              <section>
                <SectionAnchor id="next" />
                <SectionHeader icon={Lightbulb} title="What I&apos;d Build Next" id="next-h" />

                <div className="space-y-4">
                  {[
                    {
                      title: 'Driver Reputation Score',
                      priority: 'P1',
                      description: 'Prevent gaming by tracking dispute accuracy over time. Drivers whose disputes are consistently approved earn a higher "trust weight" — their dispute auto-approves for low-confidence events. Drivers with repeated rejected disputes receive increased review scrutiny. This creates a virtuous cycle for honest actors.',
                      tech: 'Requires a driver_reputation table tracking dispute_rate, approval_rate, false_negative_rate over 90d rolling windows',
                    },
                    {
                      title: 'Bulk AI Auto-Review',
                      priority: 'P1',
                      description: 'For events with AI confidence <50% from high-reputation drivers, auto-approve without manager review. This scales TrustLoop to large fleets without proportionally scaling manager workload — the core scalability unlock.',
                      tech: 'Rule engine: IF confidence < 50 AND driver_reputation_score > 0.85 THEN auto_approve',
                    },
                    {
                      title: 'Cross-Fleet Benchmarking',
                      priority: 'P2',
                      description: 'Anonymized aggregate data showing how a fleet\'s false positive rate compares to industry average by event type. Fleet operators can see "Your distraction false positive rate is 23% higher than similar fleets" — a compelling reason to invest in better training data.',
                      tech: 'Requires consent framework and anonymization at the fleet level, not driver level',
                    },
                  ].map(item => (
                    <div
                      key={item.title}
                      className="rounded-xl p-5"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={
                            item.priority === 'P1'
                              ? { backgroundColor: '#EFF6FF', color: '#0369EA', border: '1px solid #BFDBFE' }
                              : { backgroundColor: '#F0F6FE', color: '#6B7280', border: '1px solid #D6DBE1' }
                          }
                        >
                          {item.priority}
                        </span>
                        <h3 className="font-bold" style={{ color: '#00263E' }}>{item.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: '#6B7280' }}>{item.description}</p>
                      <div className="rounded-lg px-3 py-2" style={{ backgroundColor: '#1E293B' }}>
                        <p className="text-xs font-mono" style={{ color: '#94A3B8' }}>{item.tech}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Technical Architecture */}
              <section className="pb-16">
                <SectionAnchor id="tech" />
                <SectionHeader icon={Code} title="Technical Architecture" id="tech-h" />

                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  Brief architecture sketch for a Samsara-native implementation:
                </p>

                {/* Code blocks — intentionally dark */}
                <div className="rounded-xl p-5 mb-4" style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
                  <h3 className="font-mono text-xs mb-3 uppercase tracking-wider" style={{ color: '#64748B' }}>Data Schema</h3>
                  <pre className="text-xs font-mono leading-relaxed overflow-x-auto" style={{ color: '#CBD5E1' }}>{`safety_events (
  id           UUID PRIMARY KEY,
  driver_id    UUID REFERENCES drivers(id),
  event_type   ENUM('distraction','fatigue','phone_use','seatbelt','speeding'),
  ai_label     TEXT,
  confidence   FLOAT(0-1),
  timestamp    TIMESTAMPTZ,
  location     TEXT,
  video_url    TEXT,
  dispute_status ENUM('none','pending','approved','rejected') DEFAULT 'none'
)

disputes (
  id           UUID PRIMARY KEY,
  event_id     UUID REFERENCES safety_events(id),
  driver_id    UUID REFERENCES drivers(id),
  reason_code  TEXT,
  note         TEXT,
  submitted_at TIMESTAMPTZ,
  reviewed_by  UUID REFERENCES managers(id),
  action       ENUM('approved','rejected'),
  reviewed_at  TIMESTAMPTZ
)

rlhf_labels (
  id           UUID PRIMARY KEY,
  event_id     UUID REFERENCES safety_events(id),
  dispute_id   UUID REFERENCES disputes(id),
  label        ENUM('true_positive','false_positive'),
  reason_code  TEXT,
  created_at   TIMESTAMPTZ,
  exported_at  TIMESTAMPTZ  -- when sent to ML training pipeline
)`}</pre>
                </div>

                <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
                  <h3 className="font-mono text-xs mb-3 uppercase tracking-wider" style={{ color: '#64748B' }}>RLHF Pipeline Concept</h3>
                  <div className="text-sm space-y-2" style={{ color: '#94A3B8' }}>
                    <p>1. On dispute approval: write to <code style={{ color: '#818CF8' }}>rlhf_labels</code> with <code style={{ color: '#4ADE80' }}>label=&apos;false_positive&apos;</code></p>
                    <p>2. On dispute rejection: write with <code style={{ color: '#F87171' }}>label=&apos;true_positive&apos;</code></p>
                    <p>3. Nightly export job: pull unlabeled rows, package with video clip hash and reason_code, send to training pipeline</p>
                    <p>4. Model retrain: fine-tune on accumulated labeled dataset per event type (separate models for distraction, fatigue, etc.)</p>
                    <p>5. A/B shadow mode: new model scores events in parallel for 2 weeks before cutover</p>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="text-center">
                  <Link
                    href="/driver"
                    className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
                    style={{ backgroundColor: '#0369EA' }}
                  >
                    Try the Live Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
