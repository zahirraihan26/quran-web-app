'use client';

import React, { useState } from 'react';
import SurahCard from './SurahCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginatedSurahList({ surahs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // 3 columns * 7 rows looks good

  const totalPages = Math.ceil(surahs.length / itemsPerPage);
  
  const currentSurahs = surahs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    // Optional: Scroll to top of the list smoothly
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {currentSurahs.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8 border-t border-white/5">
          <button
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-emerald-500" />
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
                    currentPage === pageNumber
                      ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'border border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight className="w-5 h-5 text-emerald-500" />
          </button>
        </div>
      )}
    </div>
  );
}
