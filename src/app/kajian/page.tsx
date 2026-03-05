import Link from "next/link";
import { BookText, Calendar, User } from "lucide-react";

// Mock data since no endpoint is provided yet. Later will be fetched from Supabase.
const ARTICLES = [
    {
        id: 1,
        title: "Memahami Keutamaan Shalat Subuh Berjamaah",
        excerpt: "Shalat subuh berjamaah memiliki keutamaan yang luar biasa, setara dengan shalat semalam suntuk. Mari jaga shalat subuh kita.",
        author: "Ustadz Fulan",
        date: "3 Maret 2026",
        category: "Fiqh",
        imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Adab Berdoa Agar Cepat Terkabul",
        excerpt: "Berdoa ada adab dan tata caranya sesuai sunnah Rasulullah SAW. Pastikan kita memperhatikan waktu-waktu mustajab.",
        author: "Tim RuangIbadah",
        date: "1 Maret 2026",
        category: "Adab & Akhlaq",
        imageUrl: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Bagaimana Bersikap Sabar Menghadapi Ujian?",
        excerpt: "Dunia adalah tempatnya ujian. Orang beriman menjadikan sabar dan shalat sebagai penolong utama dalam hidup.",
        author: "Abu Fulan",
        date: "25 Februari 2026",
        category: "Taqwa",
        imageUrl: "https://images.unsplash.com/photo-1627931327170-176868af2d28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Kajian Offline: Tafsir Surat Yasin di Bekasi Raya",
        excerpt: "Tafsir ringkas namun padat mengenai surat Yasin yang akan diselenggarakan akhir pekan ini. Terbuka untuk umum.",
        author: "Panitia Masjid",
        date: "20 Februari 2026",
        category: "Info Kajian",
        imageUrl: "https://images.unsplash.com/photo-1519818171120-0414966601ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export default function KajianPage() {
    return (
        <div className="py-10 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-foreground">Artikel & Info Kajian</h1>
                <p className="text-default-500 max-w-2xl mx-auto">
                    Tingkatkan ilmu agama melalui artikel pilihan dan info kajian majelis taklim di sekitar Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ARTICLES.map((article) => (
                    <Link
                        href={`#`}
                        key={article.id}
                        className="group flex flex-col sm:flex-row bg-background rounded-3xl border border-divider shadow-sm overflow-hidden hover:shadow-md transition-all hover:border-primary/50"
                    >
                        <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                style={{ backgroundImage: `url(${article.imageUrl})` }}
                            />
                            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary">
                                {article.category}
                            </div>
                        </div>

                        <div className="p-6 sm:w-3/5 flex flex-col">
                            <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                                {article.title}
                            </h2>
                            <p className="text-default-500 text-sm mt-3 line-clamp-2">
                                {article.excerpt}
                            </p>

                            <div className="mt-auto pt-6 flex items-center justify-between text-xs text-default-400 font-medium">
                                <div className="flex items-center gap-1.5 flex-1 line-clamp-1">
                                    <User size={14} className="min-w-max" />
                                    <span className="truncate">{article.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5 min-w-max">
                                    <Calendar size={14} />
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
