'use client';

import React from 'react';
import { X, Type, Languages, TextSelect, Sliders, Globe, Moon, Sun } from 'lucide-react';
import { useSettings } from './SettingsProvider';

export default function SettingsSidebar({ isOpen, onClose }) {
  const { 
    arabicFont, arabicFontSize, translationFontSize, language, theme, 
    updateSetting 
  } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className="relative w-full max-w-sm h-full bg-[#06110d] border-l border-white/5 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2 text-gray-200">
            <Sliders className="w-5 h-5 text-emerald-500" />
            Display <span className="text-emerald-500">Settings</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl transition-all"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Appearance Mode */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sun className="w-4 h-4" /> Appearance Theme
            </h3>
            <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-2xl">
              {['light', 'dark'].map(m => (
                <button
                  key={m}
                  onClick={() => updateSetting('theme', m)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold capitalize transition-all ${theme === m ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-white/5 text-gray-500'}`}
                >
                  {m === 'dark' ? <Moon className="w-4 h-4 mx-auto" /> : <Sun className="w-4 h-4 mx-auto" />}
                </button>
              ))}
            </div>
          </section>

          {/* Language Selection */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <Globe className="w-4 h-4" /> Translation Language
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'en', label: 'English' },
                { id: 'bn', label: 'বাংলা' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => updateSetting('language', lang.id)}
                  className={`py-4 rounded-2xl border-2 font-bold transition-all ${language === lang.id ? 'border-emerald-600 bg-emerald-600/10 text-emerald-500' : 'border-white/5 text-gray-500 opacity-60 hover:opacity-100'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </section>

          {/* Arabic Font */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <Languages className="w-4 h-4" /> Arabic Typography
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {['Amiri', 'Noto Naskh Arabic'].map(font => (
                <button
                  key={font}
                  onClick={() => updateSetting('arabicFont', font)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${arabicFont === font ? 'border-emerald-600 bg-emerald-600/5' : 'border-white/5 text-gray-500 opacity-60'}`}
                >
                  <div className="text-xs font-bold mb-2">{font}</div>
                  <div className={`text-2xl ${font === 'Amiri' ? 'font-amiri' : 'font-noto-naskh'}`} dir="rtl">
                    بِسْمِ اللَّهِ
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Font Sizes */}
          <section className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Arabic Size</h3>
                <span className="text-xs font-bold font-mono text-emerald-500">{arabicFontSize}px</span>
              </div>
              <input 
                type="range" min="20" max="48" value={arabicFontSize} 
                onChange={(e) => updateSetting('arabicFontSize', parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Translation Size</h3>
                <span className="text-xs font-bold font-mono text-emerald-500">{translationFontSize}px</span>
              </div>
              <input 
                type="range" min="14" max="28" value={translationFontSize} 
                onChange={(e) => updateSetting('translationFontSize', parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </section>
        </div>

        <div className="p-8 border-t border-white/5 bg-white/5">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-600/10 active:scale-95 transition-all text-sm"
          >
            Apply Changes
          </button>
        </div>
      </aside>
    </div>
  );
}
