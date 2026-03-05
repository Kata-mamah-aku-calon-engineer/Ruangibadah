"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, AlertCircle, Loader2, Navigation } from "lucide-react";
import dynamic from "next/dynamic";

// Types for mosque data
interface Mosque {
    id: number;
    name: string;
    lat: number;
    lon: number;
    address?: string;
}

// Dynamically import the map component (no SSR for Leaflet)
const MasjidMap = dynamic(() => import("@/components/MasjidMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl bg-default-100 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
        </div>
    ),
});

const RADIUS_OPTIONS = [1, 3, 5, 10];

export default function MasjidPage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [mosques, setMosques] = useState<Mosque[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [radius, setRadius] = useState(3);
    const [fetchingMosques, setFetchingMosques] = useState(false);

    const requestLocation = () => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError("Geolocation tidak didukung oleh browser Anda.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLoading(false);
            },
            () => {
                setError("Akses lokasi ditolak. Izinkan akses lokasi di pengaturan browser.");
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    useEffect(() => {
        if (!location) return;

        const fetchMosques = async () => {
            setFetchingMosques(true);
            const radiusMeters = radius * 1000;
            const query = `
                [out:json][timeout:15];
                (
                    node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${location.lat},${location.lng});
                    way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${location.lat},${location.lng});
                );
                out center body;
            `;

            const endpoints = [
                "https://overpass-api.de/api/interpreter",
                "https://overpass.kumi.systems/api/interpreter",
                "https://lz4.overpass-api.de/api/interpreter"
            ];

            let success = false;
            for (const endpoint of endpoints) {
                try {
                    const res = await fetch(endpoint, {
                        method: "POST",
                        body: `data=${encodeURIComponent(query)}`,
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    });

                    if (!res.ok) continue;

                    const data = await res.json();

                    const results: Mosque[] = data.elements
                        .filter((el: any) => el.tags?.name)
                        .map((el: any) => ({
                            id: el.id,
                            name: el.tags.name,
                            lat: el.lat || el.center?.lat,
                            lon: el.lon || el.center?.lon,
                            address: el.tags["addr:street"] || el.tags["addr:full"] || undefined,
                        }));

                    setMosques(results);
                    success = true;
                    break;
                } catch {
                    // Try next endpoint
                }
            }

            if (!success) {
                setError("Gagal mengambil data masjid karena server sedang sibuk. Coba lagi nanti.");
            }
            setFetchingMosques(false);
        };

        fetchMosques();
    }, [location, radius]);

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-5 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full">
            <div className="text-center space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Masjid Terdekat</h1>
                <p className="text-default-500 text-sm sm:text-base max-w-lg mx-auto">
                    Temukan masjid di sekitar Anda menggunakan peta interaktif.
                </p>
            </div>

            {!location && !error && (
                <div className="bg-default-50/50 backdrop-blur-md border border-divider shadow-sm rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-4 text-center max-w-md mx-auto w-full">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Navigation size={36} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">Aktifkan Lokasi</h3>
                    <p className="text-default-500 text-sm">
                        Izinkan akses lokasi untuk menemukan masjid terdekat.
                    </p>
                    <button
                        onClick={requestLocation}
                        disabled={loading}
                        className="mt-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 text-sm sm:text-base"
                    >
                        {loading ? "Mencari Lokasi..." : "Izinkan Akses Lokasi"}
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-default-50/50 backdrop-blur-md border border-danger/30 shadow-sm rounded-2xl p-6 flex flex-col items-center gap-4 text-center max-w-md mx-auto w-full">
                    <AlertCircle size={32} className="text-danger" />
                    <p className="text-danger font-medium text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); requestLocation(); }}
                        className="px-5 py-2 border border-divider hover:bg-default-100 rounded-lg font-medium transition-colors text-sm"
                    >
                        Coba Lagi
                    </button>
                </div>
            )}

            {location && (
                <>
                    {/* Radius selector */}
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-default-500 mr-1">Radius:</span>
                        {RADIUS_OPTIONS.map((r) => (
                            <button
                                key={r}
                                onClick={() => setRadius(r)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${radius === r
                                    ? "bg-primary text-white shadow-md shadow-primary/25"
                                    : "bg-default-100 text-default-600 hover:bg-default-200"
                                    }`}
                            >
                                {r} km
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <div className="text-center">
                        {fetchingMosques ? (
                            <div className="flex items-center justify-center gap-2 text-sm text-default-500">
                                <Loader2 className="animate-spin" size={16} />
                                Mencari masjid...
                            </div>
                        ) : (
                            <p className="text-sm text-default-500">
                                Ditemukan <strong className="text-foreground">{mosques.length}</strong> masjid dalam radius {radius} km
                            </p>
                        )}
                    </div>

                    {/* Map */}
                    <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-divider shadow-sm">
                        <MasjidMap center={location} mosques={mosques} />
                    </div>

                    {/* Mosque list */}
                    {mosques.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-foreground">Daftar Masjid</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {mosques.map((m) => (
                                    <div
                                        key={m.id}
                                        className="bg-default-50/50 border border-divider rounded-xl p-3 sm:p-4 flex items-start gap-3 hover:border-primary/30 transition-colors"
                                    >
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-success/10 text-success flex items-center justify-center shrink-0 text-lg">
                                            🕌
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm sm:text-base text-foreground truncate">{m.name}</p>
                                            {m.address && (
                                                <p className="text-xs text-default-400 mt-0.5 truncate">{m.address}</p>
                                            )}
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1.5 hover:underline"
                                            >
                                                <MapPin size={12} />
                                                Petunjuk Arah
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
