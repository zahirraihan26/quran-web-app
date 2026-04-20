'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    arabicFont: 'Amiri',
    arabicFontSize: 32,
    translationFontSize: 18,
    language: 'en',
    theme: 'dark' // Defaulting to dark as requested
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quran_settings');
    if (saved) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error('Settings load error', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quran_settings', JSON.stringify(settings));
      
      // Update data-theme or class for dark mode
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings, isLoaded]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSetting }}>
      <div className={`min-h-screen ${settings.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
