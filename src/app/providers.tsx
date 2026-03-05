"use client";

import { RouterProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { I18nProvider } from "@/utils/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <RouterProvider navigate={router.push}>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                <I18nProvider>
                    {children}
                </I18nProvider>
            </NextThemesProvider>
        </RouterProvider>
    );
}
