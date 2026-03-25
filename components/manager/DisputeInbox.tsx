'use client';

import { AlertTriangle, Phone, Zap, Shield, Navigation, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { SafetyEvent, DISPUTE_REASONS } from '@/lib/mockData';

const eventIcons: Record<string, React.ElementType> = {
  distraction: AlertTriangle,
  fatigue: Zap,
  phone_use: Phone,
  seatbelt: Shield,
  speeding: Navigation,
};

const confidenceBadge = (score: number) => {
  if (score < 60) return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
  if (score <= 75) return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  return 'bg-red-500/15 text-red-400 border-red-500/30';
};

const formatRelativeTime = (ts: string) => {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return 'Just now';
};

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

interface Props {
  events: SafetyEvent[];
  selectedId: string | null;
  onSelect: (event: SafetyEvent) => void;
}

export default function DisputeInbox({ events, selectedId, onSelect }: Props) {
  const pending = events.filter(e => e.disputeStatus === 'pending');
  const reviewed = events.filter(e => e.disputeStatus === 'approved' || e.disputeStatus === 'rejected');

  const [tab, setTab] = useState<'pending' | 'reviewed'>('pending');
  const displayed = tab === 'pending' ? pending : reviewed;

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 px-4 pt-4 gap-1">
        <button
          onClick={() => setTab('pending')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
            tab === 'pending'
              ? 'bg-[#1E293B] text-white border-t border-l border-r border-slate-700'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Pending
          {pending.length > 0 && (
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
              {pending.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('reviewed')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            tab === 'reviewed'
              ? 'bg-[#1E293B] text-white border-t border-l border-r border-slate-700'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Reviewed ({reviewed.length})
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {displayed.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle className="w-8 h-8 text-green-500/40 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">All caught up!</p>
            <p className="text-slate-600 text-xs mt-1">No pending disputes</p>
          </div>
        ) : (
          displayed.map(event => {
            const Icon = eventIcons[event.eventType] ?? AlertTriangle;
            const reasonData = DISPUTE_REASONS.find(r => r.code === event.disputeReasonCode);
            const isSelected = event.id === selectedId;

            return (
              <button
                key={event.id}
                onClick={() => onSelect(event)}
                className={`w-full rounded-xl p-3.5 text-left transition-all duration-150 border ${
                  isSelected
                    ? 'bg-blue-600/10 border-blue-500/50'
                    : 'bg-[#1E293B] border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                    {initials(event.driverName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold text-white truncate">{event.driverName}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs text-slate-500">{formatRelativeTime(event.timestamp)}</span>
                        {tab === 'pending' && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                        {event.disputeStatus === 'approved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {event.disputeStatus === 'rejected' && <XCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-xs text-slate-400 truncate">{event.aiLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {reasonData && (
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                          {reasonData.label}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${confidenceBadge(event.aiConfidenceScore)}`}>
                        {event.aiConfidenceScore}% conf.
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// Need useState import
import { useState } from 'react';
