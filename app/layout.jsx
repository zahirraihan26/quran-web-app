import { Inter, Amiri, Noto_Naskh_Arabic, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "../components/SettingsProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Particles from "../components/Particles";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-amiri" });
const notoNaskh = Noto_Naskh_Arabic({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-noto-naskh" });
const siliguri = Hind_Siliguri({ weight: ["300", "400", "500", "600", "700"], subsets: ["bengali"], variable: "--font-siliguri" });

export const metadata = {
  title: "Al-Quran Cloud | Premium Reading Experience",
  description: "Experience the Noble Quran with premium design, multiple translations (English, Bangla), and customizable reading settings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} ${notoNaskh.variable} ${siliguri.variable} antialiased font-sans`}>
        <SettingsProvider>
          {/* Majestic Fullpage Image Background */}
          <div className="fixed inset-0 z-[-10] bg-[#030a07]">
            <img 
              src="/premium_islamic_bg.png" 
              alt="Premium Islamic Background" 
              className="w-full h-full object-cover opacity-30 md:opacity-40 animate-[float-particle_40s_infinite_ease-in-out_alternate] scale-110"
            />
            {/* Dark overlay to ensure crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030a07]/60 via-transparent to-[#030a07]/90 mix-blend-multiply"></div>
          </div>

          <Particles />
          
          <Header />
          <main className="container mx-auto px-4 py-8 relative z-10 min-h-[calc(100vh-80px)]">
            {children}
          </main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
