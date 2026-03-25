'use client';

import { useState } from 'react';
import PhoneMockup from '@/components/PhoneMockup';
import SafetyEventList from '@/components/driver/SafetyEventList';
import EventDetail from '@/components/driver/EventDetail';
import DisputeWorkflow from '@/components/driver/DisputeWorkflow';
import { useDisputes } from '@/context/DisputeContext';
import { useToast } from '@/components/Toast';
import { SafetyEvent } from '@/lib/mockData';
import { Info } from 'lucide-react';

type DriverView = 'list' | 'detail' | 'dispute';

export default function DriverPage() {
  const { events, submitDispute } = useDisputes();
  const { showToast } = useToast();
  const [view, setView] = useState<DriverView>('list');
  const [selectedEvent, setSelectedEvent] = useState<SafetyEvent | null>(null);

  // Show only Marcus Johnson's events as the "logged in" driver
  const DRIVER_ID = 'drv-101';

  const handleSelectEvent = (event: SafetyEvent) => {
    setSelectedEvent(event);
    setView('detail');
  };

  const handleDispute = () => {
    setView('dispute');
  };

  const handleSubmitDispute = (reasonCode: string, note: string) => {
    if (!selectedEvent) return;
    submitDispute(selectedEvent.id, reasonCode, note);
    showToast('Dispute submitted — your manager will review within 24 hours', 'success');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedEvent(null);
  };

  const handleBackToDetail = () => {
    setView('detail');
  };

  // Refresh selected event from context
  const currentEvent = selectedEvent
    ? events.find(e => e.id === selectedEvent.id) ?? selectedEvent
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Instruction banner */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-300 mb-1">
            Interact with the phone below — submit a dispute to see it appear in the Manager Dashboard instantly
          </p>
          <p className="text-sm text-slate-400">
            You are logged in as <strong className="text-slate-200">Marcus Johnson</strong> (Driver drv-101).
            Tap any event card to view details, then dispute an unfair flag in 2 steps.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left — label + phone */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Driver&apos;s Perspective</h1>
            <p className="text-slate-400 text-sm">Mobile App — iOS-style interface</p>
          </div>

          <PhoneMockup>
            {view === 'list' && (
              <SafetyEventList
                events={events}
                onSelectEvent={handleSelectEvent}
                driverFilter={DRIVER_ID}
              />
            )}
            {view === 'detail' && currentEvent && (
              <EventDetail
                event={currentEvent}
                onBack={handleBackToList}
                onDispute={handleDispute}
              />
            )}
            {view === 'dispute' && currentEvent && (
              <DisputeWorkflow
                eventId={currentEvent.id}
                eventLabel={currentEvent.aiLabel}
                onBack={handleBackToDetail}
                onSubmit={handleSubmitDispute}
              />
            )}
          </PhoneMockup>
        </div>

        {/* Right — context explainer */}
        <div className="lg:w-80 space-y-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-3 text-base">What you&apos;re seeing</h2>
            <div className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Event List',
                  desc: 'Driver sees all AI-flagged safety events with confidence scores color-coded by certainty.',
                  active: view === 'list',
                },
                {
                  step: '2',
                  title: 'Event Detail',
                  desc: 'Simulated dashcam view, event metadata, and an animated confidence bar.',
                  active: view === 'detail',
                },
                {
                  step: '3',
                  title: 'Dispute Workflow',
                  desc: '2-step form: pick reason → add optional note. Submits and updates context instantly.',
                  active: view === 'dispute',
                },
              ].map(item => (
                <div
                  key={item.step}
                  className={`flex gap-3 rounded-lg p-3 transition-colors ${
                    item.active ? 'bg-blue-500/10 border border-blue-500/20' : ''
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    item.active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {item.step}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${item.active ? 'text-blue-300' : 'text-slate-300'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5">
            <h3 className="font-bold text-white mb-2 text-sm">Design Decisions</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex gap-2">
                <span className="text-blue-400 shrink-0">—</span>
                Confidence score color-coding (amber/orange/red) communicates AI uncertainty without jargon
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 shrink-0">—</span>
                2-tap dispute flow minimizes friction for time-pressed commercial drivers
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 shrink-0">—</span>
                Pre-defined reason codes ensure structured data for RLHF labeling pipeline
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
