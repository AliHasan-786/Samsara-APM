'use client';

import { useDisputes } from '@/context/DisputeContext';
import { DISPUTE_REASONS } from '@/lib/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import { CheckCircle, AlertTriangle, TrendingUp, DollarSign, Users } from 'lucide-react';

const COLORS = {
  approved: '#0DAB41',
  rejected: '#DF2036',
  pending: '#FBB924',
  blue: '#0369EA',
  teal: '#1DCAD3',
};

// 7 days of mock chart data
const dailyData = [
  { day: 'Jan 9', approved: 2, rejected: 1, pending: 0 },
  { day: 'Jan 10', approved: 1, rejected: 2, pending: 1 },
  { day: 'Jan 11', approved: 3, rejected: 0, pending: 0 },
  { day: 'Jan 12', approved: 1, rejected: 1, pending: 1 },
  { day: 'Jan 13', approved: 2, rejected: 2, pending: 2 },
  { day: 'Jan 14', approved: 3, rejected: 1, pending: 1 },
  { day: 'Jan 15', approved: 1, rejected: 0, pending: 2 },
];

// Confidence distribution data (events cluster in 40-75% range)
const confidenceData = [
  { bucket: '0-20%', count: 1 },
  { bucket: '20-40%', count: 3 },
  { bucket: '40-60%', count: 8 },
  { bucket: '60-75%', count: 11 },
  { bucket: '75-90%', count: 4 },
  { bucket: '90-100%', count: 2 },
];

const CustomTooltipLight = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg p-3 text-xs shadow-xl"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
      >
        <p className="font-semibold mb-1" style={{ color: '#333333' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const { events } = useDisputes();

  const totalDisputed = events.filter(e => e.disputeStatus !== 'none').length;
  const approvedCount = events.filter(e => e.disputeStatus === 'approved').length;
  const pendingCount = events.filter(e => e.disputeStatus === 'pending').length;
  const rejectedCount = events.filter(e => e.disputeStatus === 'rejected').length;
  const approvalRate = totalDisputed > 0 ? Math.round((approvedCount / totalDisputed) * 100) : 0;
  const retentionValue = approvedCount * 800; // simplified: each prevented false positive has value

  // Pie data from reason codes
  const reasonCounts: Record<string, number> = {};
  events.forEach(e => {
    if (e.disputeReasonCode) {
      reasonCounts[e.disputeReasonCode] = (reasonCounts[e.disputeReasonCode] || 0) + 1;
    }
  });
  const pieData = Object.entries(reasonCounts).map(([code, count]) => ({
    name: DISPUTE_REASONS.find(r => r.code === code)?.label ?? code,
    value: count,
  }));
  const PIE_COLORS = ['#0369EA', '#1DCAD3', '#FBB924', '#0DAB41', '#DF2036', '#6366F1'];

  const kpis = [
    {
      label: 'False Positives Prevented',
      value: approvedCount,
      icon: CheckCircle,
      iconColor: '#0DAB41',
      bg: '#ECFDF5',
      border: '#0DAB41',
      valueColor: '#065F46',
      sub: 'Approved disputes',
    },
    {
      label: 'Total Disputes Filed',
      value: totalDisputed,
      icon: AlertTriangle,
      iconColor: '#B45309',
      bg: '#FFF8E7',
      border: '#FBB924',
      valueColor: '#B45309',
      sub: `${pendingCount} pending`,
    },
    {
      label: 'Approval Rate',
      value: `${approvalRate}%`,
      icon: TrendingUp,
      iconColor: '#0369EA',
      bg: '#EFF6FF',
      border: '#0369EA',
      valueColor: '#0369EA',
      sub: `${rejectedCount} sent to coaching`,
    },
    {
      label: 'Driver Retention Value',
      value: `$${(40000 + retentionValue).toLocaleString()}`,
      icon: DollarSign,
      iconColor: '#1DCAD3',
      bg: '#F0FFFE',
      border: '#1DCAD3',
      valueColor: '#0369EA',
      sub: 'Estimated annual savings',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" style={{ backgroundColor: '#F0F6FE', minHeight: '100vh' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#00263E' }}>Trust Impact Analytics</h1>
        <p className="text-sm" style={{ color: '#6B7280' }}>How TrustLoop is improving data quality and driver retention</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="rounded-xl p-5"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>{kpi.label}</span>
              <kpi.icon className="w-4 h-4" style={{ color: kpi.iconColor }} />
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: kpi.valueColor }}>{kpi.value}</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar chart */}
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1', borderRadius: '12px' }}
        >
          <h2 className="font-bold mb-1 text-base" style={{ color: '#00263E' }}>Dispute Outcomes Over Time</h2>
          <p className="text-xs mb-4" style={{ color: '#6B7280' }}>7-day history of dispute resolutions</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipLight />} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#6B7280' }} />
              <Bar dataKey="approved" fill={COLORS.approved} name="Approved" radius={[3,3,0,0]} />
              <Bar dataKey="rejected" fill={COLORS.rejected} name="Rejected" radius={[3,3,0,0]} />
              <Bar dataKey="pending" fill={COLORS.pending} name="Pending" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1', borderRadius: '12px' }}
        >
          <h2 className="font-bold mb-1 text-base" style={{ color: '#00263E' }}>Dispute Reasons</h2>
          <p className="text-xs mb-4" style={{ color: '#6B7280' }}>Breakdown by driver-reported cause</p>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltipLight />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span style={{ color: '#6B7280' }}>{item.name}</span>
                    </div>
                    <span className="font-medium" style={{ color: '#333333' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-sm" style={{ color: '#6B7280' }}>
              No disputes filed yet
            </div>
          )}
        </div>
      </div>

      {/* Line chart — confidence distribution */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1', borderRadius: '12px' }}
      >
        <h2 className="font-bold mb-1 text-base" style={{ color: '#00263E' }}>AI Confidence Score Distribution</h2>
        <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
          Disputed events cluster in the 40–75% &ldquo;gray zone&rdquo; — where AI is uncertain and drivers are most likely to be falsely flagged
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={confidenceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="bucket" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Events', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 11 }} />
            <Tooltip content={<CustomTooltipLight />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke={COLORS.blue}
              strokeWidth={2.5}
              dot={{ fill: COLORS.blue, r: 4 }}
              name="Event Count"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ROI Summary Card */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#00263E', borderRadius: '12px' }}>
        <div className="p-5 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Users className="w-5 h-5" style={{ color: '#1DCAD3' }} />
          <h2 className="font-bold text-white text-base">ROI Summary — 500-Driver Fleet</h2>
        </div>
        <div className="p-5 font-mono text-sm space-y-1.5" style={{ color: '#A0CFFF' }}>
          <p>Fleet: <span className="text-white">500 drivers</span> | Turnover rate: <span className="text-white">90%</span> | Annual departures: <span className="text-white">450</span></p>
          <p>If TrustLoop prevents 1% turnover reduction: <span style={{ color: '#0DAB41' }}>5 drivers retained</span></p>
          <p>Value per driver: <span className="text-white">$8,000</span> | Total saved: <span style={{ color: '#0DAB41' }}>$40,000/year</span></p>
          <p>Manager review time saved: <span className="text-white">52 hrs × $50/hr</span> = <span style={{ color: '#0DAB41' }}>$2,600/year</span></p>
          <div className="border-t pt-2 mt-2" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <p className="text-lg font-bold">
              Estimated Annual Value:{' '}
              <span style={{ color: '#A0CFFF' }}>$42,600</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
