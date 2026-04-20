import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-white/5 bg-[#030a07]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-100 flex items-center justify-center md:justify-start gap-2">
              Noor <span className="text-gold-gradient italic serif">Quran</span>
            </h3>
            <p className="text-xs font-medium text-emerald-500/60 mt-2 uppercase tracking-widest">
              Read • Reflect • Remember
            </p>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400 font-medium">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="/search" className="hover:text-emerald-400 transition-colors">Search</Link>
            <a href="#" className="hover:text-emerald-400 transition-colors">About Us</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600 font-medium tracking-wider">
          <p>© {new Date().getFullYear()} Noor Quran Application. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
