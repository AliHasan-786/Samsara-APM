import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: 390, maxWidth: '100%' }}>
      {/* Phone shell */}
      <div className="relative rounded-[3rem] border-8 border-slate-700 bg-black shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-700" />
          <div className="w-12 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* Screen */}
        <div
          className="bg-[#0F172A] overflow-y-auto overscroll-contain"
          style={{ height: 720, paddingTop: 28 }}
        >
          {children}
        </div>

        {/* Home bar */}
        <div className="h-8 bg-black flex items-center justify-center">
          <div className="w-24 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute left-0 top-24 w-1 h-8 bg-slate-600 rounded-l" />
      <div className="absolute left-0 top-36 w-1 h-12 bg-slate-600 rounded-l" />
      <div className="absolute left-0 top-52 w-1 h-12 bg-slate-600 rounded-l" />
      <div className="absolute right-0 top-32 w-1 h-16 bg-slate-600 rounded-r" />
    </div>
  );
}
