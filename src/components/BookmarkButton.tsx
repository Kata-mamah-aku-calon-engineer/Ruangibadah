"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function BookmarkButton({ surahNumber, ayahNumber }: { surahNumber: number, ayahNumber: number }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleBookmark = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            alert("Silakan login terlebih dahulu untuk menyimpan posisi bacaan terakhir.");
            setLoading(false);
            return;
        }

        // Delete existing bookmark for this user so we only keep the "last read" (Terakhir Baca)
        await supabase.from("bookmarks").delete().eq("user_id", session.user.id);

        const { error } = await supabase.from("bookmarks").insert({
            user_id: session.user.id,
            surah_number: surahNumber,
            ayah_number: ayahNumber,
        });

        if (!error) {
            setIsBookmarked(true);
            // alert("Berhasil disimpan sebagai bacaan terakhir!");
        } else {
            console.error(error);
            alert("Gagal menambahkan bookmark.");
        }

        setLoading(false);
    };

    return (
        <button
            onClick={toggleBookmark}
            disabled={loading}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 ${isBookmarked
                    ? "text-primary bg-primary/20"
                    : "text-default-400 hover:text-primary hover:bg-primary/10"
                }`}
            title="Tandai Terakhir Baca"
        >
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
    );
}
