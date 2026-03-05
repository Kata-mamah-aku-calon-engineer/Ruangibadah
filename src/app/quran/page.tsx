import Link from 'next/link';

async function getSurahs() {
    const res = await fetch('https://equran.id/api/v2/surat', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export default async function QuranPage() {
    const payload = await getSurahs();
    const surahs = payload.data;

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-5 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Al-Qur'an</h1>
                <p className="text-default-500 max-w-2xl mx-auto text-sm sm:text-base">
                    "Bacalah Al-Qur'an, karena sesungguhnya ia akan datang pada hari kiamat sebagai pemberi syafa'at bagi orang yang membacanya." (HR. Muslim)
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {surahs.map((surah: any) => (
                    <Link
                        key={surah.nomor}
                        href={`/quran/${surah.nomor}`}
                        className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-divider bg-default-50/50 hover:bg-default-100/50 hover:border-primary/30 transition-all group shadow-sm hover:shadow-md"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors relative rotate-45 text-sm sm:text-base">
                            <span className="-rotate-45">{surah.nomor}</span>
                        </div>
                        <div className="flex-1 ml-2">
                            <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">{surah.namaLatin}</h3>
                            <p className="text-xs text-default-500 uppercase tracking-widest mt-1">
                                {surah.tempatTurun} • {surah.jumlahAyat} AYAT
                            </p>
                        </div>
                        <div className="text-2xl sm:text-3xl font-arabic text-primary text-right !leading-loose">
                            {surah.nama}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
