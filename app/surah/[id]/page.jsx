import { getAllSurahs } from '../../../lib/quran';
import SurahDetailClient from './SurahDetailClient';

const API_BASE = 'https://api.alquran.cloud/v1';



export default async function SurahPage({ params }) {
  const { id } = await params;
  
  // Fetch Arabic, English, Bangla, and Transliteration on the server for SSG
  const [arabicRes, enRes, bnRes, transRes] = await Promise.all([
    fetch(`${API_BASE}/surah/${id}/quran-uthmani`).then(r => r.json()),
    fetch(`${API_BASE}/surah/${id}/en.sahih`).then(r => r.json()),
    fetch(`${API_BASE}/surah/${id}/bn.bengali`).then(r => r.json()),
    fetch(`${API_BASE}/surah/${id}/en.transliteration`).then(r => r.json())
  ]);

  const data = {
    arabic: arabicRes.data,
    en: enRes.data,
    bn: bnRes.data,
    transliteration: transRes.data
  };

  return <SurahDetailClient data={data} id={id} />;
}
