'use client';

import React from 'react';
import Link from 'next/link';
import { useSettings } from './SettingsProvider';
import { bnSurahNames } from '../lib/bnSurahNames';

export default function SurahCard({ surah }) {
  const { language } = useSettings();
  
  const isBn = language === 'bn';
  const displayTitle = isBn && bnSurahNames[surah.number] ? bnSurahNames[surah.number].name : surah.englishName;
  const displayTranslation = isBn && bnSurahNames[surah.number] ? bnSurahNames[surah.number].meaning : surah.englishNameTranslation;
  
  const formattedNumber = isBn ? new Intl.NumberFormat('bn-BD').format(surah.number) : surah.number;
  const formattedAyahs = isBn ? new Intl.NumberFormat('bn-BD').format(surah.numberOfAyahs) : surah.numberOfAyahs;
  const ayatLabel = isBn ? 'আয়াত' : 'AYAT';
  return (
    <Link 
      href={`/surah/${surah.number}`}
      className="group relative flex items-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 glass-hover-effect overflow-hidden backdrop-blur-sm"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 group-hover:to-emerald-500/10 transition-colors duration-500" />

      {/* Surah Number Circle */}
      <div className="relative flex items-center justify-center w-12 h-12 mr-6 shrink-0">
        <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300" />
        <span className="relative text-sm font-bold text-gray-400 group-hover:text-emerald-400 transition-colors">
          {formattedNumber}
        </span>
      </div>

      {/* Surah Info */}
      <div className="flex-1 min-w-0 relative z-10">
        <h3 className={`text-lg font-bold text-gray-200 group-hover:text-white transition-colors truncate ${isBn ? 'font-siliguri text-xl' : ''}`}>
          {displayTitle}
        </h3>
        <p className={`text-xs font-medium text-emerald-500/70 mt-1 uppercase tracking-widest truncate group-hover:text-emerald-400 transition-colors duration-300 ${isBn ? 'font-siliguri tracking-normal text-sm' : ''}`}>
          {displayTranslation}
        </p>
      </div>

      {/* Arabic Name & Ayah Count */}
      <div className="text-right ml-4 relative z-10">
        <div className="text-2xl font-amiri font-bold text-emerald-500 group-hover:text-gold transition-colors duration-300 drop-shadow-md">
          {surah.name}
        </div>
        <div className="flex items-center justify-end gap-1.5 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-gold/80 ${isBn ? 'font-siliguri tracking-normal text-xs' : ''}`}>
            {formattedAyahs} {ayatLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
