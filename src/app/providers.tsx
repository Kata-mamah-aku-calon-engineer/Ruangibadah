"use client";

import { RouterProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <RouterProvider navigate={router.push}>
            <NextThemesProvider attribute="class" forcedTheme="dark">
                {children}
            </NextThemesProvider>
        </RouterProvider>
    );
}
