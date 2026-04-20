import { getAllSurahs } from '../lib/quran';
import PaginatedSurahList from '../components/PaginatedSurahList';
import HeroText from '../components/HeroText';
import ChapterHeader from '../components/ChapterHeader';

export const revalidate = 86400; // Static site generation, revalidate once a day

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 overflow-hidden text-center z-10 min-h-[60vh] flex flex-col justify-center border-b border-white/5">
        
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] z-[-2] rounded-full w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
        
        <HeroText />
      </section>

      {/* Surah Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <ChapterHeader count={surahs.length} />

        <PaginatedSurahList surahs={surahs} />
      </section>
    </div>
  );
}
