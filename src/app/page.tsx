import Link from "next/link";
import { BookOpen, Compass, Calculator, MapPinned, Hand, BookHeart, BookMarked } from "lucide-react";
import { PrayerCountdown } from "@/components/PrayerCountdown";
import { QuickActions } from "@/components/QuickActions";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let lastRead = null;
  if (user) {
    const { data: bookmark } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (bookmark) {
      try {
        const res = await fetch(`https://equran.id/api/v2/surat/${bookmark.surah_number}`);
        const surahData = await res.json();
        if (surahData.code === 200) {
          lastRead = {
            surahName: surahData.data.namaLatin,
            surahNumber: bookmark.surah_number,
            ayahNumber: bookmark.ayah_number,
          };
        }
      } catch (e) {
        console.error("Failed to fetch surah detail for bookmark", e);
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10 py-6 sm:py-10 px-0">
      <PrayerCountdown />
      <QuickActions lastRead={lastRead} />

      <section className="w-full max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-default-100 to-default-50 border border-divider shadow-sm">
          <div className="p-6 sm:p-8 md:p-12 text-center flex flex-col gap-4 sm:gap-6">
            <p className="text-right text-2xl sm:text-3xl md:text-4xl text-foreground !leading-loose font-arabic">
              يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ
            </p>
            <p className="text-base sm:text-lg md:text-xl font-medium italic text-default-600">
              &quot;Hai orang-orang yang beriman, jadikanlah sabar dan shalat sebagai penolongmu, sesungguhnya Allah beserta orang-orang yang sabar.&quot;
            </p>
            <p className="text-xs sm:text-sm text-default-400 font-medium tracking-widest uppercase">
              — QS. Al-Baqarah: 153
            </p>
          </div>
        </div>
      </section>
    </div >
  );
}
