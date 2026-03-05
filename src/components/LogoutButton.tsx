"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-danger/10 text-danger font-semibold rounded-xl hover:bg-danger/20 transition-colors"
        >
            <LogOut size={18} />
            Keluar dari Akun
        </button>
    );
}
