'use client';

import { ChevronLeft, MapPin, Clock, Camera, AlertTriangle } from 'lucide-react';
import { SafetyEvent } from '@/lib/mockData';

const confidenceColor = (score: number) => {
  if (score < 60) return {
    bar: 'bg-amber-500',
    text: '#B45309',
    badge: { bg: '#FFF8E7', border: '#FBB924', color: '#B45309' },
  };
  if (score <= 75) return {
    bar: 'bg-orange-500',
    text: '#C2410C',
    badge: { bg: '#FFF1F0', border: '#FB923C', color: '#C2410C' },
  };
  return {
    bar: 'bg-red-500',
    text: '#991B1B',
    badge: { bg: '#FEF2F2', border: '#FCA5A5', color: '#991B1B' },
  };
};

const formatDateTime = (ts: string) => {
  const d = new Date(ts);
  return {
    date: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }),
  };
};

const disputeStatusDisplay = (status: SafetyEvent['disputeStatus']) => {
  switch (status) {
    case 'pending':
      return (
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#FFF8E7', border: '1px solid #FBB924' }}>
          <p className="text-sm font-semibold" style={{ color: '#B45309' }}>Dispute Submitted</p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Your fleet manager will review within 24 hours</p>
        </div>
      );
    case 'approved':
      return (
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#ECFDF5', border: '1px solid #0DAB41' }}>
          <p className="text-sm font-semibold" style={{ color: '#065F46' }}>Dispute Approved</p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Event removed from your safety record</p>
        </div>
      );
    case 'rejected':
      return (
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#FEF2F2', border: '1px solid #DF2036' }}>
          <p className="text-sm font-semibold" style={{ color: '#991B1B' }}>Dispute Not Accepted</p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>A coaching session has been scheduled</p>
        </div>
      );
    default:
      return null;
  }
};

interface Props {
  event: SafetyEvent;
  onBack: () => void;
  onDispute: () => void;
}

export default function EventDetail({ event, onBack, onDispute }: Props) {
  const colors = confidenceColor(event.aiConfidenceScore);
  const { date, time } = formatDateTime(event.timestamp);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 sticky top-0 z-10 border-b"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#D6DBE1' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm mb-2 transition-colors"
          style={{ color: '#0369EA' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Safety Events
        </button>
        <h1 className="text-base font-bold" style={{ color: '#00263E' }}>{event.aiLabel}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Mock video player — intentionally dark (camera feed simulation) */}
        <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: '#1E293B', aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Camera className="w-10 h-10 text-slate-700" />
            <span className="text-xs text-slate-600">Dashcam Footage</span>
          </div>
          {/* AI overlay badge */}
          <div className="absolute top-3 left-3 right-3">
            <div
              className="rounded-lg px-3 py-2 flex items-center gap-2"
              style={{ backgroundColor: '#DF2036', border: 'none' }}
            >
              <AlertTriangle className="w-4 h-4 text-white shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">AI DETECTED: {event.aiLabel.toUpperCase()}</p>
                <p className="text-xs text-white/80">Confidence: {event.aiConfidenceScore}%</p>
              </div>
            </div>
          </div>
          {/* Footage label */}
          <div className="absolute bottom-3 right-3 bg-black/50 rounded-lg px-2 py-1">
            <span className="text-xs text-slate-400">Simulated footage</span>
          </div>
        </div>

        {/* Event metadata */}
        <div
          className="rounded-xl p-4 space-y-3"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Event Details</h3>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#6B7280' }} />
            <div>
              <p className="text-sm" style={{ color: '#333333' }}>{date}</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>{time}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#6B7280' }} />
            <p className="text-sm" style={{ color: '#333333' }}>{event.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: '#6B7280' }} />
            <span
              className="text-sm font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: colors.badge.bg,
                border: `1px solid ${colors.badge.border}`,
                color: colors.badge.color,
              }}
            >
              {event.aiLabel}
            </span>
          </div>
        </div>

        {/* Confidence score */}
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>AI Confidence Score</span>
            <span className="text-sm font-bold" style={{ color: colors.text }}>{event.aiConfidenceScore}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E7EB' }}>
            <div
              className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
              style={{ width: `${event.aiConfidenceScore}%` }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: '#6B7280' }}>
            {event.aiConfidenceScore < 60
              ? 'Low confidence — AI is uncertain about this detection'
              : event.aiConfidenceScore <= 75
              ? 'Medium confidence — review recommended'
              : 'High confidence — AI is fairly certain'}
          </p>
        </div>

        {/* Dispute status or CTA */}
        {event.disputeStatus !== 'none' ? (
          disputeStatusDisplay(event.disputeStatus)
        ) : (
          <button
            onClick={onDispute}
            className="w-full text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: '#DF2036' }}
          >
            This doesn&apos;t seem right? Dispute it
          </button>
        )}
      </div>
    </div>
  );
}
