import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AudioPlayer } from '@/components/AudioPlayer';
import { BookmarkButton } from '@/components/BookmarkButton';

async function getSurahDetail(id: string) {
    const res = await fetch(`https://equran.id/api/v2/surat/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const payload = await getSurahDetail(id);
    const surah = payload.data;

    // Use Misyari Rasyid Al-Afasi audio
    const audioUrl = surah.audioFull["05"];

    return (
        <div className="py-8 flex flex-col gap-8 pb-32 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link
                    href="/quran"
                    className="flex items-center gap-2 text-default-500 hover:text-primary transition-colors font-medium bg-default-100 hover:bg-primary/10 px-4 py-2 rounded-full"
                >
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Kembali ke Daftar Surah</span>
                </Link>
            </div>

            {/* Surah Info Card */}
            <div className="bg-gradient-to-br from-primary to-teal-600 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <h1 className="text-4xl sm:text-6xl font-arabic leading-relaxed">{surah.nama}</h1>
                    <h2 className="text-3xl font-bold tracking-tight">{surah.namaLatin}</h2>
                    <p className="text-white/80 font-medium tracking-widest uppercase text-sm">
                        {surah.arti} • {surah.jumlahAyat} Ayat • {surah.tempatTurun}
                    </p>
                </div>
            </div>

            {/* Bismillah */}
            {surah.nomor !== 1 && surah.nomor !== 9 && (
                <div className="text-center py-6">
                    <p className="text-3xl font-arabic text-foreground !leading-loose">
                        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>
                </div>
            )}

            {/* Ayahs List */}
            <div className="flex flex-col gap-6">
                {surah.ayat.map((ayah: any) => (
                    <div id={`ayah-${ayah.nomorAyat}`} key={ayah.nomorAyat} className="p-6 rounded-2xl border border-divider bg-background hover:border-primary/30 transition-colors group group/ayah scroll-mt-24">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-10 h-10 flex items-center justify-center bg-default-100 text-default-600 font-bold rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                {ayah.nomorAyat}
                            </div>
                            <div className="flex gap-2">
                                <BookmarkButton surahNumber={surah.nomor} ayahNumber={ayah.nomorAyat} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <p className="text-right text-3xl sm:text-4xl font-arabic text-foreground !leading-loose" dir="rtl">
                                {ayah.teksArab}
                            </p>

                            <div className="space-y-2 mt-4">
                                <p className="text-sm font-medium text-primary tracking-wide">
                                    {ayah.teksLatin}
                                </p>
                                <p className="text-default-600 leading-relaxed text-sm sm:text-base">
                                    {ayah.teksIndonesia}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AudioPlayer audioUrl={audioUrl} title={surah.namaLatin} />
        </div>
    );
}
