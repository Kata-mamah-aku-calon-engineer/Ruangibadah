"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Mosque {
    id: number;
    name: string;
    lat: number;
    lon: number;
    address?: string;
}

interface MasjidMapProps {
    center: { lat: number; lng: number };
    mosques: Mosque[];
}

export default function MasjidMap({ center, mosques }: MasjidMapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        if (!mapRef.current) {
            mapRef.current = L.map(containerRef.current).setView(
                [center.lat, center.lng],
                14
            );

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(mapRef.current);

            // User location marker
            const userIcon = L.divIcon({
                html: '<div style="width:16px;height:16px;background:#006FEE;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,111,238,0.5);"></div>',
                className: "",
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            });

            L.marker([center.lat, center.lng], { icon: userIcon })
                .addTo(mapRef.current)
                .bindPopup("<strong>Lokasi Anda</strong>");

            markersRef.current = L.layerGroup().addTo(mapRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [center]);

    useEffect(() => {
        if (!mapRef.current || !markersRef.current) return;

        markersRef.current.clearLayers();

        const mosqueIcon = L.divIcon({
            html: '<div style="font-size:24px;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3));">🕌</div>',
            className: "",
            iconSize: [28, 28],
            iconAnchor: [14, 14],
        });

        mosques.forEach((m) => {
            if (m.lat && m.lon) {
                L.marker([m.lat, m.lon], { icon: mosqueIcon })
                    .addTo(markersRef.current!)
                    .bindPopup(
                        `<div style="font-family:system-ui;"><strong style="font-size:14px;">${m.name}</strong>${m.address ? `<br/><span style="color:#888;font-size:12px;">${m.address}</span>` : ""}<br/><a href="https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}" target="_blank" style="color:#006FEE;font-size:12px;text-decoration:none;font-weight:600;">Petunjuk Arah →</a></div>`
                    );
            }
        });
    }, [mosques]);

    return (
        <div
            ref={containerRef}
            className="w-full h-[350px] sm:h-[450px] md:h-[550px]"
            style={{ zIndex: 0 }}
        />
    );
}
