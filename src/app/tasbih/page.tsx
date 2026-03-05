"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function TasbihPage() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);

    const handleTap = () => {
        if (navigator.vibrate) {
            if (count + 1 === target) {
                // Long vibrate when target reached
                navigator.vibrate(500);
            } else {
                // Short vibrate for normal tap
                navigator.vibrate(50);
            }
        }
        setCount((prev) => prev + 1);
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent tap event
        setCount(0);
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    };

    return (
        <div className="py-6 sm:py-10 flex flex-col items-center justify-center min-h-[70vh] gap-6 sm:gap-8 animate-in fade-in zoom-in-95 duration-1000 px-4">
            <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Tasbih Digital</h1>
                <p className="text-default-500 text-sm sm:text-base">Target sentuhan: {target}x</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
                {[33, 99, 1000].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTarget(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${target === t
                            ? "bg-primary text-white shadow-md shadow-primary/25"
                            : "bg-default-100 text-default-600 hover:bg-default-200"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div
                onClick={handleTap}
                className="relative mt-8 group cursor-pointer active:scale-95 transition-transform duration-200 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary to-teal-500 shadow-2xl shadow-primary/30 flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20"></div>

                <div className="relative z-10 flex flex-col items-center justify-center p-6 w-full h-full rounded-full border-8 border-white/10 backdrop-blur-md">
                    <span className="text-7xl sm:text-8xl font-black text-white drop-shadow-lg tabular-nums">
                        {count}
                    </span>
                    <span className="text-white/80 font-medium uppercase tracking-wider mt-2 text-sm">
                        Tekan Layar
                    </span>
                </div>
            </div>

            <button
                onClick={handleReset}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-default-100 hover:bg-default-200 text-default-700 rounded-full font-semibold transition-colors"
            >
                <RefreshCw size={18} />
                Reset Hitungan
            </button>
        </div>
    );
}
