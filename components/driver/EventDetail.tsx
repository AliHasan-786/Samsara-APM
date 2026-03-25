'use client';

import { ChevronLeft, MapPin, Clock, Camera, AlertTriangle } from 'lucide-react';
import { SafetyEvent } from '@/lib/mockData';

const confidenceColor = (score: number) => {
  if (score < 60) return { bar: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400' };
  if (score <= 75) return { bar: 'bg-orange-500', text: 'text-orange-400', badge: 'bg-orange-500/15 border-orange-500/30 text-orange-400' };
  return { bar: 'bg-red-500', text: 'text-red-400', badge: 'bg-red-500/15 border-red-500/30 text-red-400' };
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
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-amber-400">Dispute Submitted</p>
          <p className="text-xs text-slate-400 mt-1">Your fleet manager will review within 24 hours</p>
        </div>
      );
    case 'approved':
      return (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-green-400">Dispute Approved</p>
          <p className="text-xs text-slate-400 mt-1">Event removed from your safety record</p>
        </div>
      );
    case 'rejected':
      return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-red-400">Dispute Not Accepted</p>
          <p className="text-xs text-slate-400 mt-1">A coaching session has been scheduled</p>
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0F172A] sticky top-0 z-10 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-sm mb-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Safety Events
        </button>
        <h1 className="text-base font-bold text-white">{event.aiLabel}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Mock video player */}
        <div className="relative bg-slate-900 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Camera className="w-10 h-10 text-slate-700" />
            <span className="text-xs text-slate-600">Dashcam Footage</span>
          </div>
          {/* AI overlay badge */}
          <div className="absolute top-3 left-3 right-3">
            <div className="bg-red-900/90 border border-red-500/50 rounded-lg px-3 py-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-300">AI DETECTED: {event.aiLabel.toUpperCase()}</p>
                <p className="text-xs text-red-400/80">Confidence: {event.aiConfidenceScore}%</p>
              </div>
            </div>
          </div>
          {/* Play button hint */}
          <div className="absolute bottom-3 right-3 bg-black/50 rounded-lg px-2 py-1">
            <span className="text-xs text-slate-400">Simulated footage</span>
          </div>
        </div>

        {/* Event metadata */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Event Details</h3>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white">{date}</p>
              <p className="text-xs text-slate-400">{time}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-sm text-white">{event.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-slate-500 shrink-0" />
            <span className={`text-sm font-medium px-2 py-0.5 rounded-full border ${colors.badge}`}>
              {event.aiLabel}
            </span>
          </div>
        </div>

        {/* Confidence score */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Confidence Score</span>
            <span className={`text-sm font-bold ${colors.text}`}>{event.aiConfidenceScore}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
              style={{ width: `${event.aiConfidenceScore}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
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
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            This doesn&apos;t seem right? Dispute it
          </button>
        )}
      </div>
    </div>
  );
}
