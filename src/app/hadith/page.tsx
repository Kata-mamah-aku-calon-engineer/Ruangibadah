"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const KITAB = [
    { id: "bukhari", name: "Shahih Bukhari", total: 6638 },
    { id: "muslim", name: "Shahih Muslim", total: 4930 },
    { id: "abu-daud", name: "Sunan Abu Daud", total: 4419 },
    { id: "tirmidzi", name: "Jami' Tirmidzi", total: 3625 },
    { id: "nasai", name: "Sunan An-Nasai", total: 5364 },
    { id: "ibnu-majah", name: "Sunan Ibnu Majah", total: 4285 },
    { id: "ahmad", name: "Musnad Ahmad", total: 4305 },
    { id: "malik", name: "Muwatta Malik", total: 1587 },
    { id: "darimi", name: "Sunan Ad-Darimi", total: 2949 },
];

interface Hadith {
    number: number;
    arab: string;
    id: string;
}

const BATCH_SIZE = 10;

export default function HadithPage() {
    const [selectedKitab, setSelectedKitab] = useState(KITAB[0]);
    const [hadiths, setHadiths] = useState<Hadith[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchNumber, setSearchNumber] = useState("");

    const totalPages = Math.ceil(selectedKitab.total / BATCH_SIZE);

    const fetchHadiths = async (kitabId: string, page: number) => {
        setLoading(true);
        setError(null);
        const start = (page - 1) * BATCH_SIZE + 1;
        const end = Math.min(page * BATCH_SIZE, selectedKitab.total);

        try {
            const res = await fetch(`https://api.hadith.gading.dev/books/${kitabId}?range=${start}-${end}`);
            const data = await res.json();
            if (data.code === 200) {
                setHadiths(data.data.hadiths);
            } else {
                setError("Gagal memuat hadits.");
            }
        } catch {
            setError("Koneksi gagal. Coba lagi nanti.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchHadiths(selectedKitab.id, currentPage);
    }, [selectedKitab, currentPage]);

    const handleKitabChange = (kitab: typeof KITAB[0]) => {
        setSelectedKitab(kitab);
        setCurrentPage(1);
        setSearchNumber("");
    };

    const handleSearchNumber = () => {
        const num = parseInt(searchNumber);
        if (!isNaN(num) && num >= 1 && num <= selectedKitab.total) {
            const page = Math.ceil(num / BATCH_SIZE);
            setCurrentPage(page);
        }
    };

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-5 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full max-w-4xl mx-auto">
            <div className="text-center space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Kitab Hadits</h1>
                <p className="text-default-500 text-sm sm:text-base max-w-lg mx-auto">
                    Koleksi <strong className="text-foreground">38.000+</strong> hadits shahih dari 9 kitab utama. Semua terverifikasi dan bersumber dari perawi terpercaya.
                </p>
            </div>

            {/* Kitab Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
                {KITAB.map((k) => (
                    <button
                        key={k.id}
                        onClick={() => handleKitabChange(k)}
                        className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${selectedKitab.id === k.id
                            ? "bg-primary text-white shadow-md shadow-primary/25"
                            : "bg-default-100 text-default-600 hover:bg-default-200"
                            }`}
                    >
                        {k.name}
                    </button>
                ))}
            </div>

            {/* Info Bar */}
            <div className="bg-default-50/50 backdrop-blur-md border border-divider rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                    <BookOpen size={16} className="text-primary" />
                    <span className="font-bold text-foreground">{selectedKitab.name}</span>
                    <span className="text-default-400">•</span>
                    <span className="text-default-500">{selectedKitab.total.toLocaleString("id-ID")} Hadits</span>
                </div>

                {/* Search by number */}
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min={1}
                        max={selectedKitab.total}
                        placeholder="No. Hadits"
                        value={searchNumber}
                        onChange={(e) => setSearchNumber(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchNumber()}
                        className="w-28 px-3 py-2 rounded-lg border border-divider bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleSearchNumber}
                        className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Search size={16} />
                    </button>
                </div>
            </div>

            {/* Hadiths List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-sm text-default-500">Memuat hadits...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-danger font-medium">{error}</p>
                    <button
                        onClick={() => fetchHadiths(selectedKitab.id, currentPage)}
                        className="mt-3 text-primary text-sm font-medium hover:underline"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {hadiths.map((h) => (
                        <div
                            key={h.number}
                            className="bg-default-50/50 backdrop-blur-md border border-divider p-5 sm:p-6 shadow-sm rounded-2xl hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4 border-b border-divider pb-3">
                                <h3 className="text-sm font-bold text-foreground">
                                    {selectedKitab.name}
                                </h3>
                                <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-bold">
                                    No. {h.number}
                                </span>
                            </div>

                            <p className="text-right text-xl sm:text-2xl !leading-[2.2] font-arabic text-foreground mb-5">
                                {h.arab}
                            </p>

                            <div className="border-t border-divider pt-4">
                                <p className="text-sm sm:text-base text-default-600 leading-relaxed">
                                    {h.id}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2.5 rounded-xl bg-default-100 hover:bg-default-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-1 text-sm font-medium">
                    <span className="text-foreground">Hal {currentPage.toLocaleString("id-ID")}</span>
                    <span className="text-default-400">dari</span>
                    <span className="text-foreground">{totalPages.toLocaleString("id-ID")}</span>
                </div>

                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2.5 rounded-xl bg-default-100 hover:bg-default-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
