"use client";

import { useState, useEffect } from "react";
import { Compass, MapPin, AlertCircle } from "lucide-react";

export default function KiblatPage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [qibla, setQibla] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [heading, setHeading] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const requestLocation = () => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError("Geolocation tidak didukung oleh browser Anda.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ lat: latitude, lng: longitude });

                // Fetch Qibla direction
                try {
                    const res = await fetch(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`);
                    const data = await res.json();
                    if (data.code === 200) {
                        setQibla(data.data.direction);
                    }
                } catch (err) {
                    setError("Gagal mengambil data arah kiblat dari server.");
                }
                setLoading(false);
            },
            (err) => {
                setError("Akses lokasi ditolak atau gagal didapatkan.");
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="py-10 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-2xl mx-auto w-full">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-foreground">Arah Kiblat</h1>
                <p className="text-default-500">
                    Temukan arah kiblat (Ka'bah) akurat berdasarkan lokasi Anda saat ini.
                </p>
            </div>

            <div className="w-full bg-default-50/50 backdrop-blur-md border border-divider shadow-sm rounded-3xl p-8 flex flex-col items-center gap-8 text-center transition-all">

                {!location && !error && (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                            <MapPin size={40} />
                        </div>
                        <h3 className="text-xl font-bold">Izin Lokasi Dibutuhkan</h3>
                        <p className="text-default-500 max-w-md">
                            Kami membutuhkan akses lokasi Anda untuk menghitung arah kiblat yang presisi.
                        </p>
                        <button
                            onClick={requestLocation}
                            disabled={loading}
                            className="mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? "Mencari Lokasi..." : "Izinkan Akses Lokasi"}
                        </button>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="w-20 h-20 rounded-full bg-danger/10 text-danger flex items-center justify-center">
                            <AlertCircle size={32} />
                        </div>
                        <p className="text-danger font-medium">{error}</p>
                        <button
                            onClick={requestLocation}
                            className="mt-2 px-6 py-2 border border-divider hover:bg-default-100 rounded-lg font-medium transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}

                {location && qibla !== null && (
                    <div className="flex flex-col items-center gap-10 py-6 w-full">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center gap-1 w-full max-w-sm">
                            <p className="text-sm font-semibold tracking-wider uppercase text-primary">Arah Kiblat</p>
                            <p className="text-4xl font-black text-foreground">{qibla.toFixed(2)}°</p>
                            <p className="text-xs text-default-500 mt-2">Dari Utara (Derajat Searah Jarum Jam)</p>
                        </div>

                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                            {/* Compass Background (North is up) */}
                            <div className="absolute inset-0 rounded-full border-8 border-divider bg-background shadow-inner flex items-center justify-center">
                                <div className="absolute top-2 w-full text-center text-lg font-bold text-danger">U</div>
                                <div className="absolute bottom-2 w-full text-center text-lg font-bold text-default-400">S</div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-default-400">T</div>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-default-400">B</div>

                                {/* Qibla Indicator Line/Arrow */}
                                <div
                                    className="absolute w-1 h-1/2 bg-success origin-bottom top-0 transition-transform duration-1000 ease-out z-10"
                                    style={{ transform: `rotate(${qibla}deg)` }}
                                >
                                    <div className="absolute -top-3 -left-3 w-7 h-7 bg-success text-white rounded-full flex items-center justify-center shadow-lg">
                                        <Compass size={16} />
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="w-4 h-4 bg-primary rounded-full z-20 shadow-md ring-4 ring-primary/20"></div>
                            </div>
                        </div>

                        <p className="text-default-500 text-sm max-w-sm">
                            Untuk hasil terbaik di HP, gunakan kompas bawaan Anda dan arahkan perangkat Anda ke <strong className="text-foreground">{qibla.toFixed(2)} derajat</strong>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
