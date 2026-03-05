import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Mail, User, BookOpen } from "lucide-react";
import Image from "next/image";
import { LogoutButton } from "@/components/LogoutButton";

export default async function ProfilPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/");
    }

    // Get last bookmark
    let lastRead = null;
    const { data: bookmark } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (bookmark) {
        try {
            const res = await fetch(`https://equran.id/api/v2/surat/${bookmark.surah_number}`);
            const surahData = await res.json();
            if (surahData.code === 200) {
                lastRead = {
                    surahName: surahData.data.namaLatin,
                    surahNumber: bookmark.surah_number,
                    ayahNumber: bookmark.ayah_number,
                };
            }
        } catch {
            // ignore
        }
    }

    const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna";
    const avatarUrl = user.user_metadata?.avatar_url;
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-2xl mx-auto w-full px-4">
            <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Profil Saya</h1>
            </div>

            {/* Profile Card */}
            <div className="bg-gradient-to-br from-primary to-teal-600 text-white rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt="Avatar"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white/30"
                            unoptimized
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-3xl font-black">
                            {initial}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold">{displayName}</h2>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Mail size={14} />
                        {user.email}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
                {/* Last Read */}
                <div className="bg-default-50/50 backdrop-blur-md border border-divider rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <BookOpen size={20} />
                        </div>
                        <h3 className="font-bold text-foreground">Terakhir Dibaca</h3>
                    </div>
                    {lastRead ? (
                        <div>
                            <p className="text-lg font-semibold text-foreground">{lastRead.surahName}</p>
                            <p className="text-sm text-default-500">Ayat {lastRead.ayahNumber}</p>
                            <a
                                href={`/quran/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
                                className="inline-block mt-3 text-sm text-primary font-semibold hover:underline"
                            >
                                Lanjut Baca →
                            </a>
                        </div>
                    ) : (
                        <p className="text-sm text-default-500">Belum ada bookmark. Mulai membaca Al-Qur&apos;an.</p>
                    )}
                </div>

                {/* Account Info */}
                <div className="bg-default-50/50 backdrop-blur-md border border-divider rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <h3 className="font-bold text-foreground">Informasi Akun</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-default-500">Provider</span>
                            <span className="font-medium text-foreground capitalize">{user.app_metadata?.provider || "email"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-default-500">Bergabung</span>
                            <span className="font-medium text-foreground">
                                {new Date(user.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout */}
            <LogoutButton />
        </div>
    );
}
