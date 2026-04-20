'use client';

import React, { useState, useEffect, useTransition } from 'react';
import SearchBar from '../../components/SearchBar';
import { searchAyahs, getAllSurahs, findSurah } from '../../lib/quran';
import { useSettings } from '../../components/SettingsProvider';
import { bnSurahNames } from '../../lib/bnSurahNames';
import { Book, Hash, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SearchPageClient() {
  const { language } = useSettings();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [isSearching, startTransition] = useTransition();
  const [matchedSurah, setMatchedSurah] = useState(null);

  const isBn = language === 'bn';
  const formatNum = (num) => isBn ? new Intl.NumberFormat('bn-BD').format(num) : num;
  const getSurahTitle = (surah) => isBn && bnSurahNames[surah.number] ? bnSurahNames[surah.number].name : surah.englishName;
  const getSurahTrans = (surah) => isBn && bnSurahNames[surah.number] ? bnSurahNames[surah.number].meaning : surah.englishNameTranslation;

  useEffect(() => {
    getAllSurahs().then(setSurahs);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q) {
      setResults([]);
      setMatchedSurah(null);
      return;
    }

    startTransition(async () => {
      // 1. Check for Surah Match
      const s = findSurah(q, surahs);
      setMatchedSurah(s);

      // 2. Search Ayahs via API
      const matches = await searchAyahs(q, language);
      setResults(matches);
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4 pt-10">
        <h1 className={`text-4xl md:text-6xl font-black tracking-tighter ${isBn ? 'font-siliguri tracking-normal' : ''}`}>
          {isBn ? 'গ্লোবাল' : 'Global'} <span className="text-emerald-gold">{isBn ? 'সার্চ' : 'Search'}</span>
        </h1>
        <p className={`text-gray-500 font-medium max-w-xl mx-auto ${isBn ? 'font-siliguri text-xl' : ''}`}>
          {isBn ? 'বাংলায় যেকোনো শব্দ দিয়ে আয়াত খুঁজুন অথবা নাম্বার ও নাম দিয়ে সূরা খুঁজে নিন।' : 'Search ayahs by keywords in English, or find any chapter by name and number.'}
        </p>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={isSearching} />

      <div className="space-y-10 animate-fade-in">
        {/* Surah Match Highlight */}
        {matchedSurah && (
          <div className="space-y-4">
            <h3 className={`text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] flex items-center gap-2 px-2 ${isBn ? 'font-siliguri tracking-normal text-sm' : ''}`}>
              <Hash className="w-4 h-4" /> {isBn ? 'সরাসরি সূরা ম্যাচ' : 'Exact Surah Match'}
            </h3>
            <Link 
              href={`/surah/${matchedSurah.number}`}
              className="flex items-center justify-between p-8 rounded-[3rem] glass bg-emerald-600/10 border-emerald-600/20 group hover:bg-emerald-600/20 transition-all border-white/5"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black shadow-xl shadow-emerald-600/30">
                  {formatNum(matchedSurah.number)}
                </div>
                <div>
                  <h4 className={`text-2xl font-black italic ${isBn ? 'font-siliguri text-3xl' : ''}`}>{getSurahTitle(matchedSurah)}</h4>
                  <p className={`text-sm font-bold opacity-60 uppercase tracking-widest ${isBn ? 'font-siliguri tracking-normal text-base' : ''}`}>{getSurahTrans(matchedSurah)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-amiri font-bold text-emerald-600">{matchedSurah.name}</div>
                <ArrowRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className={`text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] flex items-center gap-2 ${isBn ? 'font-siliguri tracking-normal text-sm' : ''}`}>
              <MessageSquare className="w-4 h-4" /> 
              {results.length > 0 
                ? (isBn ? `${formatNum(results.length)} টি ফলাফল পাওয়া গেছে` : `Found ${results.length} results`) 
                : (isBn ? 'সার্চ ফলাফল' : 'Search results')}
            </h3>
          </div>

          {results.length > 0 ? (
            results.map((res, idx) => (
              <Link 
                key={`${res.surah.number}-${res.numberInSurah}-${idx}`}
                href={`/surah/${res.surah.number}#ayah-${res.numberInSurah}`}
                className="block p-8 rounded-[2.5rem] glass hover:bg-emerald-600/5 transition-all border-white/5 group"
              >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-3">
                      <span className={`text-xs font-black px-3 py-1 bg-emerald-600/10 text-emerald-600 rounded-full border border-emerald-600/10 ${isBn ? 'font-siliguri text-sm' : ''}`}>
                        {getSurahTitle(res.surah)} • {isBn ? 'আয়াত' : 'Ayah'} {formatNum(res.numberInSurah)}
                      </span>
                   </div>
                   <div className="text-2xl font-amiri font-bold text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity">
                      {res.surah.name}
                   </div>
                </div>
                <p className="text-lg font-medium leading-relaxed mb-4 text-gray-800 dark:text-gray-200">
                  {res.text}
                </p>
                <div className="flex justify-end pt-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest text-emerald-600/40 group-hover:text-emerald-600 ${isBn ? 'font-siliguri tracking-normal text-xs' : ''}`}>
                     {isBn ? 'সম্পূর্ণ সূরা পড়ুন →' : 'Read Full Chapter →'}
                  </span>
                </div>
              </Link>
            ))
          ) : query.length > 2 && !isSearching ? (
             <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                <AlertCircle className="w-16 h-16 text-emerald-600" />
                <p className={`text-xl font-bold ${isBn ? 'font-siliguri text-2xl' : ''}`}>
                  {isBn ? `"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি` : `No matches found for "${query}"`}
                </p>
             </div>
          ) : query === '' && (
             <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-10">
                <Book className="w-32 h-32" />
                <p className={`text-2xl font-black italic ${isBn ? 'font-siliguri text-4xl' : ''}`}>
                  {isBn ? 'কুরআন সম্পর্কে জানতে টাইপ করুন' : 'Start typing to explore the Quran'}
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
