'use client';

import React from 'react';
import AyahCard from '../../../components/AyahCard';
import { useSettings } from '../../../components/SettingsProvider';
import { BookOpen, Star, Sparkles, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SurahDetailClient({ data, id }) {
  const { language } = useSettings();
  const { arabic, en, bn, transliteration } = data;
  
  const translations = language === 'bn' ? bn.ayahs : en.ayahs;

  return (
    <div className="space-y-16 pb-20">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 hover:gap-4 transition-all opacity-60 hover:opacity-100">
        <ChevronLeft className="w-4 h-4" />
        Back to Chapters
      </Link>

      {/* Surah Hero Card */}
      <section className="relative overflow-hidden rounded-[3rem] bg-white/5 border border-white/5 px-8 py-16 md:py-20 text-white shadow-2xl">
        {/* Background Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }} />
        
        <div className="relative flex flex-col items-center text-center gap-10">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            {arabic.revelationType} Revelation
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter flex items-center justify-center gap-6">
              <span className="opacity-20 text-3xl md:text-5xl font-medium">#{id}</span>
              {arabic.englishName}
            </h1>
            <div className="text-4xl md:text-7xl font-amiri font-bold text-gold-gradient drop-shadow-2xl" dir="rtl">
              {arabic.name}
            </div>
            <p className="text-lg md:text-xl font-medium text-gray-400 max-w-2xl mx-auto">
              {arabic.englishNameTranslation}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-emerald-500/60">
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 opacity-40" />
              {arabic.numberOfAyahs} Ayahs
            </span>
          </div>
        </div>
      </section>

      {/* Bismillah Section */}
      {id !== '9' && id !== '1' && (
        <div className="py-16 text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-amiri text-emerald-500 font-bold mb-6 drop-shadow-lg" dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h2>
          <p className={`font-medium italic opacity-60 ${language === 'bn' ? 'hidden' : 'text-emerald-400/80 mb-2'}`}>
            Bismillaahir Rahmaanir Raheem
          </p>
          <p className={`text-emerald-400/80 font-medium italic mb-2 ${language === 'bn' ? 'font-siliguri text-xl leading-relaxed block' : 'hidden'}`}>
            বিসমিল্লাহির রাহমানির রাহিম
          </p>
          <p className={`text-gray-500 font-medium italic text-lg opacity-40 ${language === 'bn' ? 'font-siliguri tracking-normal text-base' : ''}`}>
            {language === 'bn' ? 'পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি' : 'In the Name of Allah, the Beneficent, the Merciful'}
          </p>
        </div>
      )}

      {/* Ayah List Container */}
      <div className="max-w-4xl mx-auto space-y-10 px-4">
        {arabic.ayahs.map((ayah, index) => (
          <AyahCard 
            key={ayah.number} 
            ayah={ayah} 
            translation={translations[index]?.text} 
            transliteration={transliteration?.ayahs[index]?.text}
          />
        ))}
      </div>
    </div>
  );
}
