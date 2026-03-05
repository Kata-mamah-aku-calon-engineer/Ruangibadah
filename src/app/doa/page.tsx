"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import doaData from "@/data/doa.json";

interface Doa {
    id: string;
    doa: string;
    ayat: string;
    latin: string;
    artinya: string;
    judul: string;
    source: string;
}

const allDoa: Doa[] = doaData as Doa[];

export default function DoaPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const PER_PAGE = 20;

    const filteredDoa = allDoa.filter((d) =>
        (d.judul || d.doa || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.artinya || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.latin || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDoa.length / PER_PAGE);
    const paginatedDoa = filteredDoa.slice(0, page * PER_PAGE);

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full px-4 max-w-4xl mx-auto">
            <div className="text-center space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Doa Harian</h1>
                <p className="text-default-500 text-sm sm:text-base max-w-lg mx-auto">
                    Kumpulan <strong className="text-foreground">{allDoa.length}</strong> doa dari Al-Qur&apos;an dan Hadits untuk membimbing setiap langkah kita.
                </p>
            </div>

            <div className="relative max-w-xl mx-auto w-full">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-default-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Cari doa (contoh: makan, tidur, wudhu, hujan, safar)..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                    className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-divider bg-default-50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm outline-none text-sm sm:text-base"
                />
            </div>

            <p className="text-sm text-default-500 text-center">
                Menampilkan <strong className="text-foreground">{paginatedDoa.length}</strong> dari {filteredDoa.length} doa
            </p>

            <div className="grid grid-cols-1 gap-4">
                {paginatedDoa.length > 0 ? (
                    paginatedDoa.map((doa, idx) => (
                        <div
                            key={idx}
                            className="bg-default-50/50 backdrop-blur-md border border-divider p-5 sm:p-6 text-foreground shadow-sm rounded-2xl hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4 border-b border-divider pb-3 gap-2">
                                <h2 className="text-base sm:text-lg font-bold leading-snug">
                                    {doa.judul || doa.artinya?.substring(0, 50) || `Doa #${idx + 1}`}
                                </h2>
                                {doa.source && (
                                    <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 uppercase tracking-wider">
                                        {doa.source}
                                    </span>
                                )}
                            </div>

                            <p className="text-right text-2xl sm:text-3xl !leading-loose font-arabic text-foreground mb-4">
                                {doa.doa || doa.ayat}
                            </p>

                            <div className="space-y-2">
                                {doa.latin && (
                                    <p className="text-sm sm:text-base text-primary/80 font-medium italic">
                                        {doa.latin}
                                    </p>
                                )}
                                <p className="text-sm sm:text-base text-default-600">
                                    &quot;{doa.artinya}&quot;
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-default-500">Doa tidak ditemukan. Coba kata kunci lain.</p>
                    </div>
                )}
            </div>

            {page * PER_PAGE < filteredDoa.length && (
                <div className="text-center">
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        Tampilkan Lebih Banyak ({filteredDoa.length - page * PER_PAGE} sisanya)
                    </button>
                </div>
            )}
        </div>
    );
}
