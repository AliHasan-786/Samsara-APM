'use client';

import { CheckCircle, XCircle, AlertTriangle, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import { SafetyEvent, DISPUTE_REASONS } from '@/lib/mockData';

const confidenceLabel = (score: number) => {
  if (score < 60) return { text: 'Low Confidence', color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30', bar: 'bg-amber-500' };
  if (score <= 75) return { text: 'Medium Confidence', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30', bar: 'bg-orange-500' };
  return { text: 'High Confidence', color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30', bar: 'bg-red-500' };
};

const formatDateTime = (ts: string) => {
  const d = new Date(ts);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

interface Props {
  event: SafetyEvent | null;
  onApprove: (eventId: string) => void;
  onReject: (eventId: string) => void;
}

export default function ReviewPanel({ event, onApprove, onReject }: Props) {
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7 text-slate-600" />
        </div>
        <h3 className="text-slate-400 font-semibold mb-2">Select a dispute to review</h3>
        <p className="text-slate-600 text-sm">
          Choose a pending dispute from the inbox on the left to see the AI vs. Driver comparison.
        </p>
      </div>
    );
  }

  const conf = confidenceLabel(event.aiConfidenceScore);
  const reasonData = DISPUTE_REASONS.find(r => r.code === event.disputeReasonCode);
  const isResolved = event.disputeStatus === 'approved' || event.disputeStatus === 'rejected';

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      {/* Driver header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-base font-bold text-slate-300">
          {initials(event.driverName)}
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{event.driverName}</h2>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDateTime(event.timestamp)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          </div>
        </div>
        {isResolved && (
          <div className="ml-auto">
            {event.disputeStatus === 'approved' ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-400 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1">
                <CheckCircle className="w-4 h-4" /> Approved
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium text-red-400 bg-red-500/15 border border-red-500/30 rounded-full px-3 py-1">
                <XCircle className="w-4 h-4" /> Rejected
              </span>
            )}
          </div>
        )}
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* AI Assessment */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-red-300">AI&apos;s Assessment</h3>
          </div>
          <p className="text-white font-semibold text-base mb-1">{event.aiLabel}</p>
          <p className="text-slate-500 text-xs mb-3">What the computer vision model detected</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Confidence</span>
              <span className={`font-bold ${conf.color}`}>{event.aiConfidenceScore}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${conf.bar} rounded-full`}
                style={{ width: `${event.aiConfidenceScore}%` }}
              />
            </div>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${conf.bg} ${conf.color}`}>
              {conf.text}
            </span>
          </div>
        </div>

        {/* Driver's Claim */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-blue-300">Driver&apos;s Claim</h3>
          </div>
          {reasonData ? (
            <>
              <p className="text-white font-semibold text-base mb-1">{reasonData.label}</p>
              <p className="text-slate-400 text-xs mb-3">{reasonData.description}</p>
            </>
          ) : (
            <p className="text-slate-400 text-xs mb-3">No reason provided</p>
          )}

          {event.disputeNote && (
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <MessageSquare className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-500 font-medium">Driver&apos;s Note</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">&ldquo;{event.disputeNote}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      {/* Guidance */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 text-sm text-slate-400">
        <strong className="text-slate-300">Review Guidance:</strong>{' '}
        {event.aiConfidenceScore < 60
          ? 'Low AI confidence suggests higher chance of false positive. Consider approving if the driver\'s explanation is plausible.'
          : event.aiConfidenceScore <= 75
          ? 'Medium confidence — weigh the driver\'s explanation carefully against the event type.'
          : 'High AI confidence. Verify the driver\'s claim is consistent with the detection before approving.'}
      </div>

      {/* Action buttons */}
      {!isResolved ? (
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => onApprove(event.id)}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Approve Dispute
          </button>
          <button
            onClick={() => onReject(event.id)}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
          >
            <XCircle className="w-4 h-4" />
            Send to Coaching
          </button>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-slate-400 text-sm">
            {event.disputeStatus === 'approved'
              ? 'This event has been archived and the data has been labeled for model retraining.'
              : 'A coaching session has been scheduled. This event remains in the driver\'s record.'}
          </p>
        </div>
      )}
    </div>
  );
}
