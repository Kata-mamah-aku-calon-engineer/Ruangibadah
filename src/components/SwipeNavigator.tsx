"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function SwipeNavigator({ currentId }: { currentId: number }) {
    const router = useRouter();
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX.current = e.changedTouches[0].screenX;
            const diff = touchStartX.current - touchEndX.current;

            // Minimum 80px swipe
            if (Math.abs(diff) < 80) return;

            if (diff > 0 && currentId < 114) {
                // Swipe left → next surah
                router.push(`/quran/${currentId + 1}`);
            } else if (diff < 0 && currentId > 1) {
                // Swipe right → prev surah
                router.push(`/quran/${currentId - 1}`);
            }
        };

        document.addEventListener("touchstart", handleTouchStart, { passive: true });
        document.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentId, router]);

    return null; // Invisible — only handles swipe gestures
}
