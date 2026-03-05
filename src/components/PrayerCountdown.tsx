"use client";

import { useState, useEffect } from "react";

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const INDO_PRAYERS: Record<string, string> = {
    Fajr: "Subuh",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya"
};

export function PrayerCountdown() {
    const [timings, setTimings] = useState<Record<string, string> | null>(null);
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
    const [difference, setDifference] = useState<{ hours: number; minutes: number } | null>(null);
    const [dateInfo, setDateInfo] = useState({ hijri: "", masehi: "" });
    const [currentTime, setCurrentTime] = useState("");

    // Update real-time clock
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        async function fetchTimings() {
            try {
                const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=11");
                const json = await res.json();
                if (json.code === 200) {
                    setTimings(json.data.timings);
                    setDateInfo({
                        hijri: `${json.data.date.hijri.day} ${json.data.date.hijri.month.en} ${json.data.date.hijri.year} H`,
                        masehi: json.data.date.readable
                    });
                }
            } catch (err) {
                console.error("Failed to fetch prayer timings", err);
            }
        }
        fetchTimings();
    }, []);

    useEffect(() => {
        if (!timings) return;

        function calculateNextPrayer() {
            if (!timings) return;

            const now = new Date();
            let nextAvailable = null;
            let diffMs = Infinity;

            for (const p of PRAYERS) {
                const [hours, minutes] = timings[p].split(":");
                const prayerTime = new Date();
                prayerTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

                const currentDiff = prayerTime.getTime() - now.getTime();
                if (currentDiff > 0 && currentDiff < diffMs) {
                    diffMs = currentDiff;
                    nextAvailable = { name: p, time: timings[p] };
                }
            }

            // If all prayers today passed, next is Fajr tomorrow
            if (!nextAvailable) {
                const [hours, minutes] = timings["Fajr"].split(":");
                const tomorrowFajr = new Date();
                tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
                tomorrowFajr.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

                diffMs = tomorrowFajr.getTime() - now.getTime();
                nextAvailable = { name: "Fajr", time: timings["Fajr"] };
            }

            setNextPrayer(nextAvailable);

            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            setDifference({ hours: diffHrs, minutes: diffMins });
        }

        calculateNextPrayer();
        const interval = setInterval(calculateNextPrayer, 60000); // update every minute
        return () => clearInterval(interval);
    }, [timings]);

    return (
        <section className="flex flex-col items-center justify-center text-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
                Assalamu'alaikum, <span className="text-primary">Fulan!</span>
            </h1>
            <div className="flex flex-col items-center gap-1">
                <p className="text-2xl sm:text-3xl font-bold font-mono tracking-widest text-primary mt-2">
                    {currentTime}
                </p>
                <p className="text-sm sm:text-base text-default-500 max-w-2xl capitalize">
                    {dateInfo.hijri ? `${dateInfo.hijri} • ${dateInfo.masehi}` : "Memuat tanggal..."}
                </p>
            </div>

            <div className="mt-8 relative bg-gradient-to-r from-primary to-teal-500 p-8 rounded-3xl w-full max-w-4xl text-white shadow-xl shadow-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                        <p className="text-white/80 font-medium tracking-wider uppercase text-sm">
                            {nextPrayer ? `Menuju ${INDO_PRAYERS[nextPrayer.name]}` : "Memuat jadwal..."}
                        </p>
                        <h2 className="text-5xl font-bold mt-1">{nextPrayer ? nextPrayer.time : "--:--"}</h2>
                        <p className="mt-2 text-white/90">
                            {difference
                                ? `Tinggal ${difference.hours > 0 ? `${difference.hours} jam ` : ''}${difference.minutes} menit lagi`
                                : "Menghitung mundur..."}
                        </p>
                    </div>
                    <div className="text-right flex items-center justify-center">
                        <div className="h-32 w-32 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <div className="text-3xl font-bold capitalize">
                                {nextPrayer ? INDO_PRAYERS[nextPrayer.name] : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
