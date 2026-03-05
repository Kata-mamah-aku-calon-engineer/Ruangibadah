import { CalendarDays, MapPin } from "lucide-react";

async function getMonthlySchedule() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const res = await fetch(
        `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Jakarta&country=Indonesia&method=11`,
        { next: { revalidate: 86400 } }
    );

    if (!res.ok) throw new Error("Failed to fetch schedule");
    return res.json();
}

const PRAYER_NAMES = [
    { key: "Imsak", label: "Imsak", highlight: false },
    { key: "Fajr", label: "Subuh", highlight: true },
    { key: "Sunrise", label: "Terbit", highlight: false },
    { key: "Dhuhr", label: "Dzuhur", highlight: true },
    { key: "Asr", label: "Ashar", highlight: true },
    { key: "Maghrib", label: "Maghrib", highlight: true },
    { key: "Isha", label: "Isya", highlight: true },
];

export default async function JadwalSholatPage() {
    const payload = await getMonthlySchedule();
    const monthData = payload.data;

    const currentDay = new Date().getDate();

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center space-y-3">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Jadwal Sholat</h1>
                <div className="flex items-center justify-center gap-2 text-default-500">
                    <MapPin size={18} className="text-primary" />
                    <span>Jakarta, Indonesia</span>
                </div>
            </div>

            {/* Mobile: Card layout */}
            <div className="sm:hidden flex flex-col gap-3">
                {monthData.map((day: any, i: number) => {
                    const dayNum = parseInt(day.date.gregorian.day, 10);
                    const isToday = dayNum === currentDay;
                    return (
                        <div
                            key={i}
                            className={`rounded-2xl border p-4 space-y-3 ${isToday
                                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                    : "border-divider bg-default-50/50"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-foreground text-sm">
                                        {day.date.gregorian.day} {day.date.gregorian.month.en}
                                    </p>
                                    <p className="text-xs text-default-400">
                                        {day.date.hijri.day} {day.date.hijri.month.en}
                                    </p>
                                </div>
                                {isToday && (
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Hari Ini
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {PRAYER_NAMES.map((p) => (
                                    <div key={p.key} className="text-center">
                                        <p className="text-[10px] text-default-400 font-medium uppercase tracking-wide">{p.label}</p>
                                        <p className={`text-sm font-bold mt-0.5 ${p.highlight ? "text-foreground" : "text-default-500"}`}>
                                            {day.timings[p.key].split(" ")[0]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop: Table layout */}
            <div className="hidden sm:block bg-default-50/50 backdrop-blur-md rounded-3xl border border-divider shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm sm:text-base">
                        <thead>
                            <tr className="bg-primary/10 text-primary border-b border-divider">
                                <th className="p-4 font-bold whitespace-nowrap">Tanggal (M)</th>
                                <th className="p-4 font-bold whitespace-nowrap">Tanggal (H)</th>
                                {PRAYER_NAMES.map((p) => (
                                    <th key={p.key} className="p-4 font-semibold">{p.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-divider/50">
                            {monthData.map((day: any, i: number) => {
                                const isToday = parseInt(day.date.gregorian.day, 10) === currentDay;
                                return (
                                    <tr
                                        key={i}
                                        className={`hover:bg-default-100/50 transition-colors ${isToday ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                                    >
                                        <td className="p-4 whitespace-nowrap font-medium text-foreground">
                                            {day.date.gregorian.day} {day.date.gregorian.month.en}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-default-500">
                                            {day.date.hijri.day} {day.date.hijri.month.en}
                                        </td>
                                        {PRAYER_NAMES.map((p) => (
                                            <td key={p.key} className={`p-4 ${p.highlight ? "font-medium text-foreground" : "text-default-600"}`}>
                                                {day.timings[p.key].split(" ")[0]}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
