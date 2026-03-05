"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Check } from "lucide-react";

export function PushNotification() {
    const [permission, setPermission] = useState<NotificationPermission>("default");
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if ("Notification" in window) {
            setPermission(Notification.permission);
            setEnabled(Notification.permission === "granted" && localStorage.getItem("prayer-notif") === "true");
        }
    }, []);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            alert("Browser tidak mendukung notifikasi.");
            return;
        }

        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === "granted") {
            setEnabled(true);
            localStorage.setItem("prayer-notif", "true");
            new Notification("RuangIbadah 🕌", {
                body: "Notifikasi waktu sholat berhasil diaktifkan!",
                icon: "/icons/icon-192.png",
            });
        }
    };

    const toggleNotification = () => {
        if (enabled) {
            setEnabled(false);
            localStorage.setItem("prayer-notif", "false");
        } else {
            if (permission === "granted") {
                setEnabled(true);
                localStorage.setItem("prayer-notif", "true");
            } else {
                requestPermission();
            }
        }
    };

    if (!("Notification" in globalThis)) return null;

    return (
        <button
            onClick={toggleNotification}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${enabled
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-default-100 text-default-600 hover:bg-default-200"
                }`}
        >
            {enabled ? (
                <>
                    <Check size={16} />
                    Notifikasi Aktif
                </>
            ) : permission === "denied" ? (
                <>
                    <BellOff size={16} />
                    Notifikasi Diblokir
                </>
            ) : (
                <>
                    <Bell size={16} />
                    Aktifkan Notifikasi Sholat
                </>
            )}
        </button>
    );
}
