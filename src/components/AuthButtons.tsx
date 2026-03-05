"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { LogOut, User as UserIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

export function AuthButtons() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    if (loading) {
        return <div className="w-20 h-8 animate-pulse bg-default-200 rounded-md"></div>;
    }

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {user.user_metadata?.avatar_url ? (
                        <Image
                            src={user.user_metadata.avatar_url}
                            alt="Avatar"
                            width={32}
                            height={32}
                            className="rounded-full border border-divider"
                            unoptimized
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                            {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || <UserIcon size={16} />}
                        </div>
                    )}
                    <span className="text-sm font-semibold hidden sm:inline text-foreground">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    title="Keluar"
                    className="text-default-500 hover:text-danger p-2 rounded-full hover:bg-danger/10 transition-colors"
                >
                    <LogOut size={18} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors font-semibold text-sm shadow-md shadow-primary/20"
        >
            Login
        </button>
    );
}
