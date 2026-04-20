'use client';

import React from 'react';
import { useSettings } from './SettingsProvider';
import { transliterateToBn } from '../lib/transliterate';

export default function AyahCard({ ayah, translation, transliteration }) {
  const { arabicFont, arabicFontSize, translationFontSize, language } = useSettings();

  const fontClass = arabicFont === 'Amiri' ? 'font-amiri' : 'font-noto-naskh';
  
  const displayTransliteration = language === 'bn' ? transliterateToBn(transliteration) : transliteration;

  return (
    <div 
      id={`ayah-${ayah.numberInSurah}`}
      className="group relative p-8 md:p-10 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all duration-500 animate-fade-in"
    >
      {/* Ayah Index & Meta */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-emerald-500 font-bold text-xs group-hover:border-emerald-500 transition-colors">
          {ayah.numberInSurah}
        </div>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] opacity-40">
          Juz {ayah.juz} • Page {ayah.page}
        </div>
      </div>

      {/* Arabic Text */}
      <div 
        className={`text-right mb-10 leading-[2.2] tracking-wide text-gray-100 transition-all duration-300 ${fontClass}`}
        style={{ fontSize: `${arabicFontSize}px` }}
        dir="rtl"
      >
        {ayah.text}
      </div>

      {/* Transliteration */}
      {displayTransliteration && (
        <div 
          className={`text-left text-emerald-400/80 mb-6 font-medium italic tracking-wide transition-all duration-300 ${language === 'bn' ? 'font-siliguri text-xl leading-relaxed' : ''}`}
          style={{ fontSize: `${Math.max(14, translationFontSize - 2)}px` }}
        >
          {displayTransliteration}
        </div>
      )}

      {/* Translation */}
      <div 
        className={`text-left leading-relaxed text-gray-400 transition-all duration-300 ${language === 'bn' ? 'font-siliguri' : 'font-sans'}`}
        style={{ fontSize: `${translationFontSize}px` }}
      >
        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 opacity-60">
          {language === 'bn' ? 'অনুবাদ' : 'Translation'}
        </div>
        {translation}
      </div>
    </div>
  );
}
