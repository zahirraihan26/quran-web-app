const API_BASE = 'https://api.alquran.cloud/v1';

export async function getAllSurahs() {
  const res = await fetch(`${API_BASE}/surah`);
  const data = await res.json();
  return data.data;
}

export async function getSurahById(id, language = 'en') {
  const edition = language === 'bn' ? 'bn.bengali' : 'en.sahih';
  
  // Fetch Arabic and Translation in parallel
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`${API_BASE}/surah/${id}/quran-uthmani`),
    fetch(`${API_BASE}/surah/${id}/${edition}`)
  ]);

  const arabicData = await arabicRes.json();
  const translationData = await translationRes.json();

  return {
    arabic: arabicData.data,
    translation: translationData.data
  };
}

export async function searchAyahs(query, language = 'en') {
  if (!query || query.length < 2) return [];

  const edition = language === 'bn' ? 'bn.bengali' : 'en.sahih';
  
  // Search API from alquran.cloud
  const res = await fetch(`${API_BASE}/search/${encodeURIComponent(query)}/all/${edition}`);
  const data = await res.json();
  
  if (data.code !== 200 || !data.data || !data.data.matches) return [];
  
  return data.data.matches;
}

/**
 * Quick jump to surah by name or number
 */
export function findSurah(query, surahs) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  return surahs.find(s => 
    s.number.toString() === q || 
    s.englishName.toLowerCase().includes(q) ||
    s.name.includes(q)
  );
}
