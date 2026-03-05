"use client";

import { useState, useEffect, useCallback } from "react";
import { Compass, MapPin, AlertCircle, RotateCcw, Smartphone } from "lucide-react";

export default function KiblatPage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [qibla, setQibla] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [heading, setHeading] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [hasDeviceOrientation, setHasDeviceOrientation] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

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

                try {
                    const res = await fetch(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`);
                    const data = await res.json();
                    if (data.code === 200) {
                        setQibla(data.data.direction);
                    }
                } catch {
                    setError("Gagal mengambil data arah kiblat dari server.");
                }
                setLoading(false);
            },
            () => {
                setError("Akses lokasi ditolak atau gagal didapatkan.");
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        let alpha: number | null = null;

        // Check for webkitCompassHeading (iOS)
        if ((event as any).webkitCompassHeading !== undefined) {
            alpha = (event as any).webkitCompassHeading;
        } else if (event.alpha !== null) {
            // Android: alpha is relative to screen, convert to compass heading
            alpha = (360 - event.alpha) % 360;
        }

        if (alpha !== null) {
            setHeading(alpha);
            setHasDeviceOrientation(true);
        }
    }, []);

    const requestOrientationPermission = async () => {
        // iOS 13+ requires permission
        if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === "granted") {
                    setPermissionGranted(true);
                    window.addEventListener("deviceorientation", handleOrientation, true);
                }
            } catch {
                // Permission denied
            }
        } else {
            // Android / desktop - no permission needed
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation, true);
        }
    };

    useEffect(() => {
        // Auto-listen on non-iOS devices
        if (typeof (DeviceOrientationEvent as any).requestPermission !== "function") {
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation, true);
        }
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation, true);
        };
    }, [handleOrientation]);

    const compassRotation = qibla !== null ? qibla - heading : 0;

    return (
        <div className="py-6 sm:py-10 flex flex-col items-center gap-5 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-2xl mx-auto w-full">
            <div className="text-center space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Arah Kiblat</h1>
                <p className="text-default-500 text-sm sm:text-base">
                    Temukan arah kiblat akurat berdasarkan lokasi dan kompas perangkat Anda.
                </p>
            </div>

            <div className="w-full bg-default-50/50 backdrop-blur-md border border-divider shadow-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center gap-6 sm:gap-8 text-center transition-all">

                {!location && !error && (
                    <div className="flex flex-col items-center gap-4 py-6 sm:py-8">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                            <MapPin size={36} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold">Izin Lokasi Dibutuhkan</h3>
                        <p className="text-default-500 max-w-md text-sm sm:text-base">
                            Kami membutuhkan akses lokasi Anda untuk menghitung arah kiblat yang presisi.
                        </p>
                        <button
                            onClick={requestLocation}
                            disabled={loading}
                            className="mt-2 sm:mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 text-sm sm:text-base"
                        >
                            {loading ? "Mencari Lokasi..." : "Izinkan Akses Lokasi"}
                        </button>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center gap-4 py-6 sm:py-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-danger/10 text-danger flex items-center justify-center">
                            <AlertCircle size={28} />
                        </div>
                        <p className="text-danger font-medium text-sm sm:text-base">{error}</p>
                        <button
                            onClick={requestLocation}
                            className="mt-2 px-5 sm:px-6 py-2 border border-divider hover:bg-default-100 rounded-lg font-medium transition-colors text-sm sm:text-base"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}

                {location && qibla !== null && (
                    <div className="flex flex-col items-center gap-6 sm:gap-10 py-4 sm:py-6 w-full">
                        {/* Qibla degree info */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-1 w-full max-w-sm">
                            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary">Arah Kiblat</p>
                            <p className="text-3xl sm:text-4xl font-black text-foreground">{qibla.toFixed(2)}°</p>
                            <p className="text-xs text-default-500 mt-1 sm:mt-2">Dari Utara (Derajat Searah Jarum Jam)</p>
                        </div>

                        {/* Compass */}
                        <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
                            {/* Compass ring */}
                            <div
                                className="absolute inset-0 rounded-full border-[6px] sm:border-8 border-default-200 dark:border-default-100 bg-gradient-to-b from-default-50 to-default-100 shadow-2xl flex items-center justify-center transition-transform duration-300 ease-out"
                                style={{
                                    transform: hasDeviceOrientation ? `rotate(${-heading}deg)` : "rotate(0deg)",
                                }}
                            >
                                {/* Cardinal directions */}
                                <div className="absolute top-3 sm:top-4 w-full text-center text-base sm:text-lg font-black text-danger">U</div>
                                <div className="absolute bottom-3 sm:bottom-4 w-full text-center text-base sm:text-lg font-bold text-default-400">S</div>
                                <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-base sm:text-lg font-bold text-default-400">T</div>
                                <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-base sm:text-lg font-bold text-default-400">B</div>

                                {/* Tick marks */}
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-0.5 origin-bottom"
                                        style={{
                                            height: i % 9 === 0 ? "14px" : i % 3 === 0 ? "10px" : "6px",
                                            top: i % 9 === 0 ? "8px" : i % 3 === 0 ? "12px" : "16px",
                                            transform: `rotate(${i * 10}deg)`,
                                            transformOrigin: "center calc(50vh - 50%)",
                                            left: "calc(50% - 1px)",
                                            background: i % 9 === 0 ? "var(--color-foreground)" : "var(--color-default-300)",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Qibla needle (stays fixed relative to real world) */}
                            <div
                                className="absolute w-1 h-[45%] origin-bottom z-10 transition-transform duration-300 ease-out"
                                style={{
                                    transform: `rotate(${hasDeviceOrientation ? compassRotation : qibla}deg)`,
                                    bottom: "50%",
                                    left: "calc(50% - 2px)",
                                    background: "linear-gradient(to top, #17c964, #12a150)",
                                    borderRadius: "4px",
                                }}
                            >
                                {/* Ka'bah icon at top */}
                                <div className="absolute -top-4 -left-[14px] w-8 h-8 bg-success text-white rounded-full flex items-center justify-center shadow-lg shadow-success/40 text-sm font-bold">
                                    🕋
                                </div>
                            </div>

                            {/* Center dot */}
                            <div className="absolute w-5 h-5 bg-primary rounded-full z-20 shadow-md ring-4 ring-primary/20"></div>
                        </div>

                        {/* Device orientation status */}
                        {!hasDeviceOrientation && (
                            <div className="bg-warning/10 border border-warning/30 rounded-xl p-3 sm:p-4 w-full max-w-sm">
                                <div className="flex items-start gap-3">
                                    <Smartphone size={20} className="text-warning mt-0.5 shrink-0" />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-warning-600 dark:text-warning">Kompas Perangkat</p>
                                        <p className="text-xs text-default-500 mt-1">
                                            Buka di HP untuk kompas real-time. Di desktop, jarum menunjuk arah statis.
                                        </p>
                                        {!permissionGranted && typeof (DeviceOrientationEvent as any).requestPermission === "function" && (
                                            <button
                                                onClick={requestOrientationPermission}
                                                className="mt-2 text-xs px-3 py-1.5 bg-warning text-white rounded-lg font-medium"
                                            >
                                                Aktifkan Kompas
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {hasDeviceOrientation && (
                            <div className="bg-success/10 border border-success/30 rounded-xl p-3 sm:p-4 w-full max-w-sm">
                                <div className="flex items-center gap-3">
                                    <RotateCcw size={18} className="text-success shrink-0" />
                                    <p className="text-xs sm:text-sm text-default-600">
                                        Kompas aktif! Putar HP dalam pola <strong>angka 8</strong> untuk kalibrasi terbaik.
                                    </p>
                                </div>
                            </div>
                        )}

                        <p className="text-default-500 text-xs sm:text-sm max-w-sm px-2">
                            Arahkan perangkat Anda ke <strong className="text-foreground">{qibla.toFixed(2)}°</strong> dari Utara. Jarum hijau menunjuk arah Ka'bah.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
