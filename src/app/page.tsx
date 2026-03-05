import Link from "next/link";
import { BookOpen, Compass, Calculator } from "lucide-react";
import { PrayerCountdown } from "@/components/PrayerCountdown";
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
    <div className="flex flex-col gap-10 py-10">
      <PrayerCountdown />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        <Link
          href={lastRead ? `/quran/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}` : "/quran"}
          className="block rounded-2xl bg-default-50/50 hover:bg-default-100/50 backdrop-blur-md shadow-sm border border-divider transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center text-center gap-3 p-8">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold">Lanjut Baca</h3>
            <p className="text-sm text-default-500">
              {lastRead ? `${lastRead.surahName} Ayat ${lastRead.ayahNumber}` : "Mulai Membaca"}
            </p>
          </div>
        </Link>

        <Link href="/kiblat" className="block rounded-2xl bg-default-50/50 hover:bg-default-100/50 backdrop-blur-md shadow-sm border border-divider transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center gap-3 p-8">
            <div className="p-4 bg-success/10 rounded-full text-success">
              <Compass size={32} />
            </div>
            <h3 className="text-xl font-bold">Arah Kiblat</h3>
            <p className="text-sm text-default-500">Temukan kiblat akurat</p>
          </div>
        </Link>

        <Link href="/kajian" className="block rounded-2xl bg-default-50/50 hover:bg-default-100/50 backdrop-blur-md shadow-sm border border-divider transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center gap-3 p-8">
            <div className="p-4 bg-warning/10 rounded-full text-warning">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold">Kajian Islam</h3>
            <p className="text-sm text-default-500">Artikel & Jadwal Majelis</p>
          </div>
        </Link>
      </section>

      <section className="w-full max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-default-100 to-default-50 border border-divider shadow-sm">
          <div className="p-8 md:p-12 text-center flex flex-col gap-6">
            <p className="text-right text-3xl md:text-4xl text-foreground !leading-loose font-arabic">
              يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ
            </p>
            <p className="text-lg md:text-xl font-medium italic text-default-600">
              "Hai orang-orang yang beriman, jadikanlah sabar dan shalat sebagai penolongmu, sesungguhnya Allah beserta orang-orang yang sabar."
            </p>
            <p className="text-sm text-default-400 font-medium tracking-widest uppercase">
              — QS. Al-Baqarah: 153
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
