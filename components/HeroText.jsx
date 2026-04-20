'use client';
import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useSettings } from './SettingsProvider';

export default function HeroText() {
  const { language } = useSettings();
  const isBn = language === 'bn';

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in px-4 relative z-10">
      <h1 className={`text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter hero-title drop-shadow-2xl ${isBn ? 'font-siliguri leading-[1.1] pb-4' : ''}`}>
        {isBn ? (
          <>পবিত্র <span className="serif italic text-gold-gradient relative inline-block">কুরআন<div className="absolute inset-0 bg-gold blur-[60px] opacity-20 -z-10 mix-blend-screen animate-pulse-glow"></div></span></>
        ) : (
          <>The <span className="serif italic text-gold-gradient relative inline-block">Holy<div className="absolute inset-0 bg-gold blur-[60px] opacity-20 -z-10 mix-blend-screen animate-pulse-glow"></div></span> Quran</>
        )}
      </h1>
      
      <p className={`text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm px-4 ${isBn ? 'font-siliguri tracking-normal' : ''}`}>
        {isBn ? (
          <>পড়ুন, উপলব্ধি করুন এবং দারুণ আরবি টাইপোগ্রাফি ও খাঁটি অনুবাদসহ সকল <span className="text-emerald-400 font-bold px-1 text-3xl">১১৪</span> টি সূরা অন্বেষণ করুন।</>
        ) : (
          <>Read, reflect and explore all <span className="text-emerald-400 font-bold px-1 text-2xl">114</span> Surahs with elegant <br className="hidden md:block"/>Arabic typography and authentic translations.</>
        )}
      </p>

      <div className="pt-8 w-full max-w-2xl mx-auto relative z-20">
         <Link href="/search">
            <div className="relative group cursor-pointer w-full mx-auto block scale-95 hover:scale-100 transition-transform duration-500">
              <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-600 via-[#c4a469] to-emerald-600 rounded-[2rem] blur-[8px] opacity-40 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative flex items-center bg-[#030a07] bg-opacity-[0.85] backdrop-blur-2xl border border-white/5 p-2.5 pl-8 pr-2.5 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
                
                <Search className="relative w-6 h-6 text-emerald-500 mr-5 group-hover:scale-110 transition-transform duration-300 z-10" />
                <span className={`relative flex-1 text-left text-gray-400 text-lg font-medium group-hover:text-gray-200 transition-colors z-10 ${isBn ? 'font-siliguri text-xl' : ''}`}>
                  {isBn ? '"আল-বাকারাহ" দিয়ে আপনার পাঠ শুরু করুন...' : 'Start your journey, try "Al-Baqarah"...'}
                </span>
                <div className="relative bg-emerald-600/10 text-emerald-400 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 z-10">
                  {isBn ? 'খুঁজুন' : 'Explore'}
                </div>
              </div>
            </div>
         </Link>
      </div>
    </div>
  );
}
