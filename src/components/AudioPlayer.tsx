"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";

export function AudioPlayer({ audioUrl, title }: { audioUrl: string; title: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Optional: reset when audioUrl changes
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [audioUrl]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (!isVisible || !audioUrl) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500 w-[90%] max-w-md">
            <div className="bg-background/80 backdrop-blur-xl border border-divider shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Sedang Memutar</p>
                    <p className="text-sm font-bold truncate">Surah {title}</p>
                </div>

                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                />

                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
                    </button>
                    <button
                        onClick={() => {
                            if (audioRef.current) audioRef.current.pause();
                            setIsVisible(false);
                        }}
                        className="w-8 h-8 flex items-center justify-center text-default-400 hover:text-default-600 hover:bg-default-100 rounded-full transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
