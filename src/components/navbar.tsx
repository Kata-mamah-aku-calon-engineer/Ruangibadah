"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    BookOpen, Menu, X, Sun, Moon, BookText, Clock, Compass,
    Hand, BookHeart, Calculator, MapPinned, Newspaper, BookMarked,
    ChevronDown, User
} from "lucide-react";
import { AuthButtons } from "@/components/AuthButtons";
import { LanguageSelector } from "@/utils/i18n";

const PRIMARY_LINKS = [
    { href: "/quran", label: "Al-Qur'an", icon: <BookOpen size={16} /> },
    { href: "/hadith", label: "Hadits", icon: <BookMarked size={16} /> },
    { href: "/jadwal-sholat", label: "Jadwal", icon: <Clock size={16} /> },
    { href: "/kiblat", label: "Kiblat", icon: <Compass size={16} /> },
];

const MORE_LINKS = [
    { href: "/tasbih", label: "Tasbih", icon: <Hand size={18} /> },
    { href: "/doa", label: "Doa", icon: <BookHeart size={18} /> },
    { href: "/zakat", label: "Zakat", icon: <Calculator size={18} /> },
    { href: "/masjid", label: "Masjid", icon: <MapPinned size={18} /> },
    { href: "/kajian", label: "Kajian", icon: <Newspaper size={18} /> },
    { href: "/profil", label: "Profil", icon: <User size={18} /> },
];

const ALL_LINKS = [
    { href: "/", label: "Beranda", icon: <BookOpen size={18} /> },
    { href: "/quran", label: "Al-Qur'an", icon: <BookText size={18} /> },
    { href: "/hadith", label: "Hadits", icon: <BookMarked size={18} /> },
    { href: "/jadwal-sholat", label: "Jadwal", icon: <Clock size={18} /> },
    { href: "/kiblat", label: "Kiblat", icon: <Compass size={18} /> },
    ...MORE_LINKS,
];

function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="w-9 h-9" />; // placeholder to prevent layout shift
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-default-100 transition-colors text-default-500 hover:text-foreground"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    return (
        <nav className="w-full sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-divider">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <p className="font-bold text-lg sm:text-xl text-primary flex items-center gap-2">
                        <BookOpen size={22} />
                        <span className="hidden sm:inline">RuangIbadah</span>
                        <span className="sm:hidden">RI</span>
                    </p>
                </Link>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center gap-1 font-medium text-sm text-default-600">
                    {PRIMARY_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-1.5"
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}

                    {/* More dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="px-3 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-1"
                        >
                            Lainnya
                            <ChevronDown size={14} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
                        </button>

                        {showMore && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)} />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-divider rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {MORE_LINKS.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setShowMore(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-default-600 hover:text-primary hover:bg-primary/5 transition-all"
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Language selector */}
                    <div className="hidden sm:block">
                        <LanguageSelector />
                    </div>

                    {/* Dark/Light toggle */}
                    <ThemeToggle />

                    <AuthButtons />

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-default-100 transition-colors text-foreground"
                        aria-label="Menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile nav - Icon Grid */}
            {isOpen && (
                <div className="lg:hidden border-t border-divider bg-background/95 backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-3 gap-1 p-3">
                        {ALL_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-default-600 hover:text-primary hover:bg-primary/5 transition-all active:bg-primary/10"
                            >
                                {link.icon}
                                <span className="text-xs font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
