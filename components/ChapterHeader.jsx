'use client';
import React from 'react';
import { useSettings } from './SettingsProvider';

export default function ChapterHeader({ count }) {
  const { language } = useSettings();
  const isBn = language === 'bn';

  return (
    <div className="flex items-center justify-between mb-12">
      <h2 className={`text-2xl font-black uppercase tracking-tighter flex items-center gap-3 ${isBn ? 'font-siliguri tracking-normal text-3xl' : ''}`}>
        <span className="w-8 h-1 bg-emerald-600 rounded-full" />
        {isBn ? 'সূরাসমূহ ব্রাউজ করুন' : 'Browse Chapters'} <span className="text-emerald-600">({isBn ? new Intl.NumberFormat('bn-BD').format(count) : count})</span>
      </h2>
      <div className={`hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-emerald-600/60 ${isBn ? 'font-siliguri tracking-normal text-base' : ''}`}>
        {isBn ? 'মাক্কী • মাদানী' : 'Meccan • Medinan'}
      </div>
    </div>
  );
}
