import { CalendarDays, MapPin } from "lucide-react";

async function getMonthlySchedule() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-indexed for API

    const res = await fetch(
        `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Jakarta&country=Indonesia&method=11`,
        { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!res.ok) throw new Error("Failed to fetch schedule");
    return res.json();
}

export default async function JadwalSholatPage() {
    const payload = await getMonthlySchedule();
    const monthData = payload.data;

    const currentDay = new Date().getDate();

    return (
        <div className="py-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-foreground">Jadwal Sholat</h1>
                <div className="flex items-center justify-center gap-2 text-default-500">
                    <MapPin size={18} className="text-primary" />
                    <span>Jakarta, Indonesia</span>
                </div>
            </div>

            <div className="bg-default-50/50 backdrop-blur-md rounded-3xl border border-divider shadow-sm overflow-hidden text-sm sm:text-base">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary/10 text-primary border-b border-divider">
                                <th className="p-4 font-bold whitespace-nowrap">Tanggal (M)</th>
                                <th className="p-4 font-bold whitespace-nowrap">Tanggal (H)</th>
                                <th className="p-4 font-semibold">Imsak</th>
                                <th className="p-4 font-semibold">Subuh</th>
                                <th className="p-4 font-semibold">Terbit</th>
                                <th className="p-4 font-semibold">Dzuhur</th>
                                <th className="p-4 font-semibold">Ashar</th>
                                <th className="p-4 font-semibold">Maghrib</th>
                                <th className="p-4 font-semibold">Isya</th>
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
                                        <td className="p-4 text-default-600">{day.timings.Imsak.split(" ")[0]}</td>
                                        <td className="p-4 font-medium text-foreground">{day.timings.Fajr.split(" ")[0]}</td>
                                        <td className="p-4 text-default-600">{day.timings.Sunrise.split(" ")[0]}</td>
                                        <td className="p-4 font-medium text-foreground">{day.timings.Dhuhr.split(" ")[0]}</td>
                                        <td className="p-4 font-medium text-foreground">{day.timings.Asr.split(" ")[0]}</td>
                                        <td className="p-4 font-medium text-foreground">{day.timings.Maghrib.split(" ")[0]}</td>
                                        <td className="p-4 font-medium text-foreground">{day.timings.Isha.split(" ")[0]}</td>
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
