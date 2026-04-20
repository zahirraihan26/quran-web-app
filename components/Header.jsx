'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, Search, Book, Menu, X, Globe } from 'lucide-react';
import SettingsSidebar from './SettingsSidebar';
import { useSettings } from './SettingsProvider';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, updateSetting } = useSettings();

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass border-b border-emerald-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative p-3 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-2xl group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/20">
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Book className="w-5 h-5 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-100 drop-shadow-sm">
              Noor <span className="text-gold-gradient font-medium italic serif">Quran</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold hover:text-emerald-600 transition-colors uppercase tracking-widest">Surahs</Link>
            <Link href="/search" className="text-sm font-bold hover:text-emerald-600 transition-colors uppercase tracking-widest flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button 
              onClick={() => updateSetting('language', language === 'en' ? 'bn' : 'en')}
              className="px-4 py-2 rounded-xl border border-emerald-500/20 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300 flex items-center gap-2 text-emerald-50"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              {language === 'en' ? 'English' : 'বাংলা'}
            </button>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] group"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-emerald-500 group-hover:rotate-90 transition-transform duration-500" />
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 md:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/10 animate-fade-in">
            <nav className="flex flex-col p-6 gap-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Surah List</Link>
              <Link href="/search" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Search Ayahs</Link>
            </nav>
          </div>
        )}
      </header>

      <SettingsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
