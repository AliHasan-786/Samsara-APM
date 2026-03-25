'use client';

import { useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { DISPUTE_REASONS } from '@/lib/mockData';

interface Props {
  eventId?: string;
  eventLabel: string;
  onBack: () => void;
  onSubmit: (reasonCode: string, note: string) => void;
}

export default function DisputeWorkflow({ eventLabel, onBack, onSubmit }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedReason, setSelectedReason] = useState('');
  const [note, setNote] = useState('');

  const handleSelectReason = (code: string) => {
    setSelectedReason(code);
    setStep(2);
  };

  const handleSubmit = () => {
    onSubmit(selectedReason, note);
    setStep(3);
  };

  const selectedReasonData = DISPUTE_REASONS.find(r => r.code === selectedReason);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0F172A] sticky top-0 z-10 border-b border-slate-800">
        {step < 3 && (
          <button
            onClick={step === 1 ? onBack : () => setStep(1)}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-sm mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 1 ? eventLabel : 'Back'}
          </button>
        )}
        {/* Step indicator */}
        {step < 3 && (
          <div className="flex items-center gap-2">
            {[1, 2].map(s => (
              <div
                key={s}
                className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                  s <= step ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Step 1 — Pick reason */}
        {step === 1 && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold text-white mb-1">What really happened?</h2>
            <p className="text-sm text-slate-400 mb-5">
              Select the reason that best describes the situation at the time of the flag.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {DISPUTE_REASONS.map(reason => (
                <button
                  key={reason.code}
                  onClick={() => handleSelectReason(reason.code)}
                  className="bg-[#1E293B] border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl p-3.5 text-left flex flex-col gap-1.5 transition-all duration-150"
                >
                  <span className="text-sm font-semibold text-white">{reason.label}</span>
                  <span className="text-xs text-slate-500 leading-relaxed">{reason.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Add note */}
        {step === 2 && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold text-white mb-1">Add any details?</h2>
            <p className="text-sm text-slate-400 mb-5">
              Optional — a brief note helps your manager make an informed decision.
            </p>

            {/* Selected reason chip */}
            {selectedReasonData && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 mb-4">
                <p className="text-xs text-blue-400 font-medium">
                  Selected reason: {selectedReasonData.label}
                </p>
                <p className="text-xs text-slate-400">{selectedReasonData.description}</p>
              </div>
            )}

            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="e.g. I was adjusting the heat — the truck HVAC button is near the center console..."
              rows={4}
              className="w-full bg-[#1E293B] border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 resize-none outline-none transition-colors"
            />
            <p className="text-xs text-slate-600 mt-1.5 mb-5">{note.length}/500 characters</p>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm"
            >
              Submit Dispute
            </button>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className="px-4 py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Dispute Submitted!</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-2 max-w-xs">
              Your dispute has been sent to your fleet manager.
            </p>
            <p className="text-sm text-slate-500 mb-8">
              Expected review: <span className="text-slate-300">within 24 hours</span>
            </p>
            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 w-full text-left mb-6">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">You submitted</p>
              {selectedReasonData && (
                <p className="text-sm font-semibold text-white mb-1">{selectedReasonData.label}</p>
              )}
              {note && <p className="text-xs text-slate-400">&ldquo;{note}&rdquo;</p>}
            </div>
            <p className="text-xs text-slate-500 text-center px-2">
              Switch to the <span className="text-blue-400">Manager Dashboard</span> to see this dispute in the review queue
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
