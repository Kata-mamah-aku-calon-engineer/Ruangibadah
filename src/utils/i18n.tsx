"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "id" | "en" | "ar";

interface I18nContextType {
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    id: {
        "nav.home": "Beranda",
        "nav.quran": "Al-Qur'an",
        "nav.hadith": "Hadits",
        "nav.schedule": "Jadwal Sholat",
        "nav.qibla": "Arah Kiblat",
        "nav.tasbih": "Tasbih",
        "nav.doa": "Doa Harian",
        "nav.zakat": "Zakat",
        "nav.mosque": "Masjid",
        "nav.kajian": "Kajian",
        "nav.profile": "Profil",
        "nav.more": "Lainnya",
        "home.welcome": "Selamat Datang di",
        "home.subtitle": "Platform ibadah harian untuk Muslim modern",
        "prayer.next": "Waktu sholat berikutnya",
        "prayer.fajr": "Subuh",
        "prayer.dhuhr": "Dzuhur",
        "prayer.asr": "Ashar",
        "prayer.maghrib": "Maghrib",
        "prayer.isha": "Isya",
        "common.search": "Cari...",
        "common.loading": "Memuat...",
        "common.back": "Kembali",
        "common.next": "Selanjutnya",
        "common.prev": "Sebelumnya",
        "theme.dark": "Mode Gelap",
        "theme.light": "Mode Terang",
    },
    en: {
        "nav.home": "Home",
        "nav.quran": "Al-Qur'an",
        "nav.hadith": "Hadith",
        "nav.schedule": "Prayer Times",
        "nav.qibla": "Qibla Direction",
        "nav.tasbih": "Tasbih",
        "nav.doa": "Daily Prayers",
        "nav.zakat": "Zakat",
        "nav.mosque": "Mosque",
        "nav.kajian": "Articles",
        "nav.profile": "Profile",
        "nav.more": "More",
        "home.welcome": "Welcome to",
        "home.subtitle": "Daily worship platform for modern Muslims",
        "prayer.next": "Next prayer time",
        "prayer.fajr": "Fajr",
        "prayer.dhuhr": "Dhuhr",
        "prayer.asr": "Asr",
        "prayer.maghrib": "Maghrib",
        "prayer.isha": "Isha",
        "common.search": "Search...",
        "common.loading": "Loading...",
        "common.back": "Back",
        "common.next": "Next",
        "common.prev": "Previous",
        "theme.dark": "Dark Mode",
        "theme.light": "Light Mode",
    },
    ar: {
        "nav.home": "الرئيسية",
        "nav.quran": "القرآن",
        "nav.hadith": "الحديث",
        "nav.schedule": "مواقيت الصلاة",
        "nav.qibla": "اتجاه القبلة",
        "nav.tasbih": "التسبيح",
        "nav.doa": "الأدعية",
        "nav.zakat": "الزكاة",
        "nav.mosque": "المسجد",
        "nav.kajian": "المقالات",
        "nav.profile": "الملف الشخصي",
        "nav.more": "المزيد",
        "home.welcome": "مرحباً بكم في",
        "home.subtitle": "منصة عبادة يومية للمسلمين",
        "prayer.next": "وقت الصلاة القادم",
        "prayer.fajr": "الفجر",
        "prayer.dhuhr": "الظهر",
        "prayer.asr": "العصر",
        "prayer.maghrib": "المغرب",
        "prayer.isha": "العشاء",
        "common.search": "بحث...",
        "common.loading": "جاري التحميل...",
        "common.back": "رجوع",
        "common.next": "التالي",
        "common.prev": "السابق",
        "theme.dark": "الوضع الداكن",
        "theme.light": "الوضع الفاتح",
    },
};

const I18nContext = createContext<I18nContextType>({
    lang: "id",
    setLang: () => { },
    t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("id");

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Language;
        if (saved && translations[saved]) {
            setLang(saved);
        }
    }, []);

    const handleSetLang = (l: Language) => {
        setLang(l);
        localStorage.setItem("lang", l);
    };

    const t = (key: string): string => {
        return translations[lang]?.[key] || translations.id[key] || key;
    };

    return (
        <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    return useContext(I18nContext);
}

export function LanguageSelector() {
    const { lang, setLang } = useI18n();

    const langOptions: { code: Language; label: string; flag: string }[] = [
        { code: "id", label: "ID", flag: "🇮🇩" },
        { code: "en", label: "EN", flag: "🇬🇧" },
        { code: "ar", label: "AR", flag: "🇸🇦" },
    ];

    return (
        <div className="flex items-center gap-1 bg-default-100 rounded-lg p-0.5">
            {langOptions.map((opt) => (
                <button
                    key={opt.code}
                    onClick={() => setLang(opt.code)}
                    className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${lang === opt.code
                            ? "bg-primary text-white shadow-sm"
                            : "text-default-500 hover:text-foreground"
                        }`}
                    title={opt.label}
                >
                    {opt.flag}
                </button>
            ))}
        </div>
    );
}
