"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { AuthButtons } from "@/components/AuthButtons";

export function Navbar() {
    return (
        <nav className="w-full sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-xl text-primary flex items-center gap-2">
                        <BookOpen size={24} />
                        RuangIbadah
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-6 font-medium text-default-600">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Beranda
                    </Link>
                    <Link href="/quran" className="hover:text-primary transition-colors">
                        Al-Qur'an
                    </Link>
                    <Link href="/jadwal-sholat" className="hover:text-primary transition-colors">
                        Jadwal
                    </Link>
                    <Link href="/kiblat" className="hover:text-primary transition-colors">
                        Kiblat
                    </Link>
                    <Link href="/kajian" className="hover:text-primary transition-colors">
                        Artikel/Kajian
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <AuthButtons />
                </div>
            </div>
        </nav>
    );
}
