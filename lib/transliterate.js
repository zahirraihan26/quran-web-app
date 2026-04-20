// A simple heuristic rule-based English to Bengali transliterator for Quranic text
export function transliterateToBn(text) {
  if (!text) return "";

  let res = text.toLowerCase();

  // Known exact replacements (very common phrases)
  const exact = {
    "bismillaahir rahmaanir raheem": "বিসমিল্লাহির রাহমানির রাহিম",
    "bismillahir rahmanir rahim": "বিসমিল্লাহির রাহমানির রাহিম",
    "alhamdu lillaahi rabbil 'aalameen": "আলহামদু লিল্লাহি রাব্বিল আলামিন",
    "ar-rahmaanir-raheem": "আর-রাহমানির-রাহিম",
    "maaliki yawmid-deen": "মালিকি ইয়াওমিদ-দীন",
    "iyyaaka na'budu wa lyyaaka nasta'een": "ইয়্যাকা না'বুদু ওয়া ইয়্যাকা নাসতা'ঈন",
    "ihdinas-siraatal mustaqeem": "ইহদিনাস-সিরাতাল মুসতাকীম",
    "siraatal-lazeena an'amta 'alaihim": "সিরাতাল-লাযীনা আন'আমতা আলাইহিম",
    "ghayril-maghdoobi 'alaihim wa lad-daalleen": "গাইরিল-মাগদূবি 'আলাইহিম ওয়া লাদ-দাল্লীন",
    "qul huwal laahu ahad": "কুল হুওয়াল্লাহু আহাদ",
    "allaahus samad": "আল্লাহুস সামাদ",
    "lam yalid wa lam yoolad": "লাম ইয়ালিদ ওয়া লাম ইউলাদ",
    "wa lam yakullahoo kufuwan ahad": "ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ",
    "qul a'oozu birabbil falaq": "কুল আ'উজু বিরাব্বিল ফালাক",
    "qul a'oozu birabbin naas": "কুল আ'উজু বিরাব্বিন নাস"
  };

  if (exact[res]) return exact[res];

  // Try to replace known full words or prefixes
  res = res.replace(/\ballaah/g, "আল্লাহ");
  res = res.replace(/\ballah\b/g, "আল্লাহ");
  res = res.replace(/\blillaahi\b/g, "লিল্লাহি");

  // Character level mapping (approximate phonetics)
  // Double consonants
  res = res.replace(/sh/g, "শ");
  res = res.replace(/ch/g, "চ");
  res = res.replace(/kh/g, "খ");
  res = res.replace(/gh/g, "ঘ"); // sometimes গ
  res = res.replace(/ph/g, "ফ");
  res = res.replace(/th/g, "থ");
  res = res.replace(/dh/g, "ধ");
  res = res.replace(/zh/g, "য");

  // Vowels
  res = res.replace(/aa/g, "া"); // Usually mapping aa to a-kar
  res = res.replace(/ee/g, "ী");
  res = res.replace(/oo/g, "ূ");
  res = res.replace(/ou/g, "ও");
  res = res.replace(/au/g, "আউ");
  res = res.replace(/ai/g, "আই");
  res = res.replace(/ei/g, "এই");
  
  // Special arabic transliterations
  res = res.replace(/'a/g, "আ");
  res = res.replace(/'i/g, "ই");
  res = res.replace(/'u/g, "উ");
  res = res.replace(/'/g, "অ"); // Ayn

  // Consonants
  res = res.replace(/b/g, "ব");
  res = res.replace(/c/g, "ক"); // or চ
  res = res.replace(/d/g, "দ");
  res = res.replace(/f/g, "ফ");
  res = res.replace(/g/g, "গ");
  res = res.replace(/h/g, "হ");
  res = res.replace(/j/g, "জ");
  res = res.replace(/k/g, "ক");
  res = res.replace(/l/g, "ল");
  res = res.replace(/m/g, "ম");
  res = res.replace(/n/g, "ন");
  res = res.replace(/p/g, "প");
  res = res.replace(/q/g, "ক");
  res = res.replace(/r/g, "র");
  res = res.replace(/s/g, "স");
  res = res.replace(/t/g, "ত");
  res = res.replace(/v/g, "ভ");
  res = res.replace(/w/g, "ওয়");
  res = res.replace(/x/g, "ক্স");
  res = res.replace(/y/g, "য়");
  res = res.replace(/z/g, "য");
  
  // Replace standalone vowels
  res = res.replace(/\bা/g, "আ");
  res = res.replace(/\be/g, "এ");
  res = res.replace(/\bi/g, "ই");
  res = res.replace(/\bo/g, "ও");
  res = res.replace(/\bu/g, "উ");

  // Remaining single vowels to kar
  res = res.replace(/a/g, "া");
  res = res.replace(/e/g, "ে");
  res = res.replace(/i/g, "ি");
  res = res.replace(/o/g, "ো");
  res = res.replace(/u/g, "ু");

  // Fix beginning of word 'া' to 'আ'
  res = res.replace(/(\s|^)া/g, "$1আ");
  res = res.replace(/(\s|^)ি/g, "$1ই");
  res = res.replace(/(\s|^)ু/g, "$1উ");
  res = res.replace(/(\s|^)ে/g, "$1এ");
  res = res.replace(/(\s|^)ো/g, "$1ও");

  return res;
}
