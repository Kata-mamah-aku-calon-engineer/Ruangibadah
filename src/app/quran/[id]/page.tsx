import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { AudioPlayer } from '@/components/AudioPlayer';
import { BookmarkButton } from '@/components/BookmarkButton';
import { SwipeNavigator } from '@/components/SwipeNavigator';

async function getSurahDetail(id: string) {
    const res = await fetch(`https://equran.id/api/v2/surat/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const surahId = parseInt(id);
    const payload = await getSurahDetail(id);
    const surah = payload.data;

    const audioUrl = surah.audioFull["05"];

    const prevSurah = surahId > 1 ? surahId - 1 : null;
    const nextSurah = surahId < 114 ? surahId + 1 : null;

    return (
        <div className="py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 pb-32 animate-in fade-in duration-700">
            {/* Top Navigation */}
            <div className="flex items-center justify-between gap-2">
                <Link
                    href="/quran"
                    className="flex items-center gap-1.5 text-default-500 hover:text-primary transition-colors font-medium bg-default-100 hover:bg-primary/10 px-3 sm:px-4 py-2 rounded-full text-sm"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Daftar Surah</span>
                </Link>

                <div className="flex items-center gap-2">
                    {prevSurah && (
                        <Link
                            href={`/quran/${prevSurah}`}
                            className="flex items-center gap-1 text-default-500 hover:text-primary bg-default-100 hover:bg-primary/10 px-3 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <ChevronLeft size={16} />
                            <span className="hidden sm:inline">Sebelumnya</span>
                        </Link>
                    )}
                    {nextSurah && (
                        <Link
                            href={`/quran/${nextSurah}`}
                            className="flex items-center gap-1 text-default-500 hover:text-primary bg-default-100 hover:bg-primary/10 px-3 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <span className="hidden sm:inline">Selanjutnya</span>
                            <ChevronRight size={16} />
                        </Link>
                    )}
                </div>
            </div>

            {/* Surah Info Card */}
            <div className="bg-gradient-to-br from-primary to-teal-600 text-white rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                    <h1 className="text-4xl sm:text-6xl font-arabic leading-relaxed">{surah.nama}</h1>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{surah.namaLatin}</h2>
                    <p className="text-white/80 font-medium tracking-widest uppercase text-xs sm:text-sm">
                        {surah.arti} • {surah.jumlahAyat} Ayat • {surah.tempatTurun}
                    </p>
                </div>
            </div>

            {/* Bismillah */}
            {surah.nomor !== 1 && surah.nomor !== 9 && (
                <div className="text-center py-4 sm:py-6">
                    <p className="text-2xl sm:text-3xl font-arabic text-foreground !leading-loose">
                        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>
                </div>
            )}

            {/* Ayahs List */}
            <div className="flex flex-col gap-4 sm:gap-6">
                {surah.ayat.map((ayah: any) => (
                    <div id={`ayah-${ayah.nomorAyat}`} key={ayah.nomorAyat} className="p-4 sm:p-6 rounded-2xl border border-divider bg-background hover:border-primary/30 transition-colors group scroll-mt-24">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-default-100 text-default-600 font-bold rounded-full group-hover:bg-primary group-hover:text-white transition-colors text-sm">
                                {ayah.nomorAyat}
                            </div>
                            <BookmarkButton surahNumber={surah.nomor} ayahNumber={ayah.nomorAyat} />
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-6">
                            <p className="text-right text-2xl sm:text-4xl font-arabic text-foreground !leading-loose" dir="rtl">
                                {ayah.teksArab}
                            </p>

                            <div className="space-y-2 mt-2 sm:mt-4">
                                <p className="text-xs sm:text-sm font-medium text-primary tracking-wide">
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

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-divider">
                {prevSurah ? (
                    <Link
                        href={`/quran/${prevSurah}`}
                        className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-default-100 hover:bg-primary/10 hover:text-primary rounded-xl font-semibold transition-colors text-sm"
                    >
                        <ChevronLeft size={18} />
                        Surah Sebelumnya
                    </Link>
                ) : <div />}
                {nextSurah ? (
                    <Link
                        href={`/quran/${nextSurah}`}
                        className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold transition-colors shadow-lg shadow-primary/20 text-sm"
                    >
                        Surah Selanjutnya
                        <ChevronRight size={18} />
                    </Link>
                ) : <div />}
            </div>

            {/* Swipe Navigator (mobile touch) */}
            <SwipeNavigator currentId={surahId} />

            <AudioPlayer audioUrl={audioUrl} title={surah.namaLatin} />
        </div>
    );
}
