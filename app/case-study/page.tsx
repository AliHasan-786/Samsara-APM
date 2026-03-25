'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, RefreshCw, Target, Users, BarChart2, DollarSign, Code, Lightbulb, Shield, BookOpen } from 'lucide-react';

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

import { AlertTriangle } from 'lucide-react';

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-20" />;
}

function SectionHeader({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-blue-400" />
      </div>
      <h2 id={id} className="text-xl font-bold text-white scroll-mt-24">{title}</h2>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-10 pb-8 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-3 py-1 mb-4">
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs text-indigo-300 font-medium uppercase tracking-wider">PM Case Study</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Samsara TrustLoop</h1>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          An RLHF-powered dispute layer that transforms driver friction into AI training signal —
          improving fleet safety data quality while rebuilding driver trust.
        </p>
      </div>

      <div className="flex gap-10">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24 space-y-0.5">
            <p className="text-xs text-slate-600 uppercase tracking-wider font-medium mb-3 px-3">Contents</p>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    activeSection === section.id
                      ? 'bg-blue-600/15 text-blue-300 border border-blue-500/30'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                  }`}
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
            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 mb-6">
              <p className="text-slate-200 text-base leading-relaxed font-medium">
                TrustLoop is an RLHF-powered dispute layer that transforms driver friction into AI training signal.
              </p>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Commercial fleet AI systems like Samsara&apos;s Driver Safety product flag thousands of events per day.
              When those flags are wrong — a driver glancing at mirrors flagged as &ldquo;distraction&rdquo; — the consequences
              compound: the driver loses trust, disputes go unheard, safety scores are gamed or ignored, and the AI
              never learns from its mistakes.
            </p>
            <p className="text-slate-400 leading-relaxed">
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
                  color: 'border-red-500/30 bg-red-500/5',
                  badge: 'Legal Risk',
                  badgeColor: 'bg-red-500/20 text-red-300',
                  content:
                    "Illinois's Biometric Information Privacy Act lawsuit against Samsara demonstrates that capturing driver biometric data (eye tracking, facial recognition) without proper consent frameworks creates existential legal risk. A dispute layer creates an explicit consent and data governance touchpoint.",
                },
                {
                  title: 'Driver Rage on r/Truckers',
                  color: 'border-amber-500/30 bg-amber-500/5',
                  badge: 'Retention Risk',
                  badgeColor: 'bg-amber-500/20 text-amber-300',
                  content:
                    'Threads like "My company&apos;s AI flagged me for sneezing" with thousands of upvotes reveal the operator-driver trust gap. Drivers who feel surveilled without recourse leave — at $8,000 replacement cost per driver. With a 90% industry turnover rate, this is the #1 non-obvious churn driver.',
                },
                {
                  title: 'Alert Fatigue Kills Data Quality',
                  color: 'border-blue-500/30 bg-blue-500/5',
                  badge: 'Data Quality',
                  badgeColor: 'bg-blue-500/20 text-blue-300',
                  content:
                    "Jordan Carriers reduced review workload 93% with Samsara automation — but automation without ground truth feedback loops creates training data contamination. False positives that go unchallenged become labeled as true positives, degrading model accuracy over time.",
                },
              ].map((item, i) => (
                <div key={i} className={`border ${item.color} rounded-xl p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.content}</p>
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
              <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-lg">🚛</div>
                  <div>
                    <p className="font-bold text-white">The Driver</p>
                    <p className="text-xs text-slate-500">Marcus, 8 years OTR experience</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pain Points</p>
                    <ul className="space-y-1.5 text-sm text-slate-400">
                      <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Feels surveilled without consent or recourse</li>
                      <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Safety score impacts pay with no appeal process</li>
                      <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>No visibility into what the AI actually flagged</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Job-to-be-Done</p>
                    <p className="text-sm text-slate-300">&ldquo;When I&apos;m wrongly flagged, I want to quickly explain what really happened so my record stays clean.&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Fleet Manager persona */}
              <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-lg">📊</div>
                  <div>
                    <p className="font-bold text-white">The Fleet Manager</p>
                    <p className="text-xs text-slate-500">Sarah, manages 150-truck fleet</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pain Points</p>
                    <ul className="space-y-1.5 text-sm text-slate-400">
                      <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Drowning in alerts — can&apos;t distinguish real vs. false</li>
                      <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>No structured way to give driver feedback</li>
                      <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Coaching wrong drivers damages morale</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Job-to-be-Done</p>
                    <p className="text-sm text-slate-300">&ldquo;I need to quickly tell real safety risks from AI noise, so I coach the right drivers.&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Solution */}
          <section>
            <SectionAnchor id="solution" />
            <SectionHeader icon={Shield} title="The Solution" id="solution-h" />

            <p className="text-slate-400 leading-relaxed mb-6">
              Three deliberate design decisions shaped the TrustLoop product:
            </p>

            <div className="space-y-5">
              {[
                {
                  num: '01',
                  title: 'Lowest-Friction Dispute Flow (Mobile-First, 2 Taps)',
                  content: 'Commercial drivers spend ~11 hours a day on-road. Any dispute mechanism requiring more than 2 minutes of attention will be ignored. TrustLoop uses pre-categorized reason codes (Mirror Check, Sun Glare, Radio/HVAC) instead of free text as the primary input, with an optional note field for context. This reduces cognitive load while producing structured data for the RLHF pipeline.',
                  insight: 'Structured reasons > free text for ML training data quality',
                },
                {
                  num: '02',
                  title: 'Side-by-Side AI vs. Driver Comparison for Managers',
                  content: 'Managers reviewing disputes need to make calibrated trust decisions. Showing both the AI\'s raw confidence score and the driver\'s structured claim simultaneously — without requiring them to dig through logs — reduces decision time and improves consistency. The confidence score color-coding (amber <60%, orange 60-75%, red >75%) provides immediate visual triage.',
                  insight: 'Managers make better decisions with parallel evidence, not sequential',
                },
                {
                  num: '03',
                  title: 'Every Review Labels Training Data',
                  content: 'The key product insight: dispute resolution is not just a customer service workflow — it is a data labeling pipeline. Every approved dispute creates a high-quality negative example for the computer vision model (this pattern ≠ distraction). Every rejected dispute confirms a true positive. The cumulative effect is a continuously improving model with human-in-the-loop supervision.',
                  insight: 'Product workflow as ML data pipeline — the RLHF flywheel',
                },
              ].map(item => (
                <div key={item.num} className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-slate-700 shrink-0 leading-none">{item.num}</span>
                    <div>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.content}</p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-2">
                        <p className="text-xs text-indigo-300 font-medium">Key Insight: {item.insight}</p>
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

            <p className="text-slate-400 leading-relaxed mb-6">
              The &ldquo;Collaborative AI&rdquo; pitch positions TrustLoop not as a dispute mechanism, but as a continuous
              learning system. This reframe is critical for both driver adoption (agency over AI) and executive
              buy-in (data moat).
            </p>

            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '🎯', step: 'AI Flags', desc: 'Event detected with confidence score' },
                  { icon: '🗣️', step: 'Driver Disputes', desc: 'Structured reason + optional note submitted' },
                  { icon: '✅', step: 'Manager Reviews', desc: 'Human decision: approve or reject' },
                  { icon: '🧠', step: 'Model Retrains', desc: 'Resolution labeled as training data' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-semibold text-white text-sm">{item.step}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    {i < 3 && <span className="text-indigo-500 text-lg font-bold hidden lg:block">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
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
                <div key={i} className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-white">{item.metric}</h3>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md whitespace-nowrap">{item.type}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                    <p className="text-xs text-green-300">Target: {item.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ROI */}
          <section>
            <SectionAnchor id="roi" />
            <SectionHeader icon={DollarSign} title="ROI Calculation" id="roi-h" />

            <div className="bg-[#1E293B] border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Conservative model for a mid-size fleet operator (500 drivers). All figures are floor estimates —
                  actual value scales with fleet size and baseline turnover rate.
                </p>
                <div className="space-y-3 font-mono text-sm">
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
                      <div key={i} className="border-t border-slate-800 my-2" />
                    ) : (
                      <div key={i} className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">{label}</span>
                        <span className="text-slate-300 text-right">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div className="p-5 bg-green-500/10 flex items-center justify-between">
                <span className="font-bold text-white text-lg">Total Annual Value</span>
                <span className="font-bold text-green-400 text-2xl">$42,600</span>
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
                <div key={item.title} className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.priority === 'P1' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'
                    }`}>{item.priority}</span>
                    <h3 className="font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="bg-slate-800 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500 font-mono">{item.tech}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Architecture */}
          <section className="pb-16">
            <SectionAnchor id="tech" />
            <SectionHeader icon={Code} title="Technical Architecture" id="tech-h" />

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Brief architecture sketch for a Samsara-native implementation:
            </p>

            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5 mb-4">
              <h3 className="font-mono text-xs text-slate-500 mb-3 uppercase tracking-wider">Data Schema</h3>
              <pre className="text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto">{`safety_events (
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

            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5 mb-6">
              <h3 className="font-mono text-xs text-slate-500 mb-3 uppercase tracking-wider">RLHF Pipeline Concept</h3>
              <div className="text-sm text-slate-400 space-y-2">
                <p>1. On dispute approval: write to <code className="text-indigo-300">rlhf_labels</code> with <code className="text-green-300">label=&apos;false_positive&apos;</code></p>
                <p>2. On dispute rejection: write with <code className="text-red-300">label=&apos;true_positive&apos;</code></p>
                <p>3. Nightly export job: pull unlabeled rows, package with video clip hash and reason_code, send to training pipeline</p>
                <p>4. Model retrain: fine-tune on accumulated labeled dataset per event type (separate models for distraction, fatigue, etc.)</p>
                <p>5. A/B shadow mode: new model scores events in parallel for 2 weeks before cutover</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/driver"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Try the Live Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
