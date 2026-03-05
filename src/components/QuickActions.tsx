"use client";

import Link from "next/link";
import { BookOpen, Compass, Calculator, MapPinned, Hand, BookHeart, BookMarked } from "lucide-react";

interface QuickActionsProps {
    lastRead: {
        surahName: string;
        surahNumber: number;
        ayahNumber: number;
    } | null;
}

export function QuickActions({ lastRead }: QuickActionsProps) {
    const quickActions = [
        {
            href: lastRead ? `/quran/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}` : "/quran",
            icon: <BookOpen size={28} />,
            color: "primary",
            title: "Lanjut Baca",
            desc: lastRead ? `${lastRead.surahName} Ayat ${lastRead.ayahNumber}` : "Mulai Membaca",
        },
        {
            href: "/kiblat",
            icon: <Compass size={28} />,
            color: "success",
            title: "Arah Kiblat",
            desc: "Kompas real-time",
        },
        {
            href: "/zakat",
            icon: <Calculator size={28} />,
            color: "warning",
            title: "Kalkulator Zakat",
            desc: "Hitung zakat Anda",
        },
        {
            href: "/masjid",
            icon: <MapPinned size={28} />,
            color: "secondary",
            title: "Masjid Terdekat",
            desc: "Cari di sekitar Anda",
        },
        {
            href: "/tasbih",
            icon: <Hand size={28} />,
            color: "default",
            title: "Tasbih Digital",
            desc: "Hitung otomatis",
        },
        {
            href: "/hadith",
            icon: <BookMarked size={28} />,
            color: "danger",
            title: "Kitab Hadits",
            desc: "38.000+ hadits shahih",
        },
        {
            href: "/doa",
            icon: <BookHeart size={28} />,
            color: "default",
            title: "Doa Harian",
            desc: "108 kumpulan doa",
        },
    ];

    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 w-full max-w-4xl mx-auto">
            {quickActions.map((action) => (
                <Link
                    key={action.href}
                    href={action.href}
                    className="block rounded-2xl bg-default-50/50 hover:bg-default-100/50 backdrop-blur-md shadow-sm border border-divider transition-all hover:scale-105 active:scale-95"
                >
                    <div className="flex flex-col items-center text-center gap-2 sm:gap-3 p-5 sm:p-8">
                        <div className={`p-3 sm:p-4 bg-${action.color}/10 rounded-full text-${action.color}`}>
                            {action.icon}
                        </div>
                        <h3 className="text-sm sm:text-xl font-bold leading-tight">{action.title}</h3>
                        <p className="text-xs sm:text-sm text-default-500 line-clamp-1">{action.desc}</p>
                    </div>
                </Link>
            ))}
        </section>
    );
}
