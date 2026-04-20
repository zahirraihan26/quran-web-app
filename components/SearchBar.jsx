'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading, placeholder }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto group">
      <div className="relative flex items-center p-2 rounded-2xl bg-white/5 border border-white/10 group-focus-within:border-emerald-500/30 transition-all duration-300">
        <div className="p-4 text-gray-500 group-focus-within:text-emerald-500 transition-colors">
          <Search className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 2) onSearch(e.target.value);
            if (e.target.value === '') onSearch('');
          }}
          placeholder={placeholder || "Search ayahs, surah name or chapter..."}
          className="flex-1 bg-transparent border-none focus:ring-0 text-base font-medium placeholder:text-gray-600 py-3 px-2 text-gray-200"
        />
        {query && (
          <button 
            type="button" 
            onClick={handleClear}
            className="p-3 hover:bg-white/5 rounded-full transition-colors mr-1"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    </form>
  );
}
