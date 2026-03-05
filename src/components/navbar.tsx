"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { AuthButtons } from "@/components/AuthButtons";

const NAV_LINKS = [
    { href: "/", label: "Beranda" },
    { href: "/quran", label: "Al-Qur'an" },
    { href: "/hadith", label: "Hadits" },
    { href: "/jadwal-sholat", label: "Jadwal" },
    { href: "/kiblat", label: "Kiblat" },
    { href: "/tasbih", label: "Tasbih" },
    { href: "/doa", label: "Doa" },
    { href: "/zakat", label: "Zakat" },
    { href: "/masjid", label: "Masjid" },
    { href: "/kajian", label: "Kajian" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-divider">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <p className="font-bold text-lg sm:text-xl text-primary flex items-center gap-2">
                        <BookOpen size={22} />
                        RuangIbadah
                    </p>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1 font-medium text-sm text-default-600">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <AuthButtons />
                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-default-100 transition-colors text-foreground"
                        aria-label="Menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile nav dropdown */}
            {isOpen && (
                <div className="md:hidden border-t border-divider bg-background/95 backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col px-4 py-3 gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 rounded-xl text-sm font-medium text-default-600 hover:text-primary hover:bg-primary/5 transition-all active:bg-primary/10"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
