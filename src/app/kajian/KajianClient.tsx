"use client";

import { useState, useMemo } from "react";
import { Calendar, User, Filter, X, ExternalLink, Search } from "lucide-react";

interface RssItem {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    thumbnail: string;
    description: string;
    categories: string[];
}

export function KajianClient({ articles }: { articles: RssItem[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const categories = useMemo(() => {
        const allCats = articles.flatMap((a) => a.categories).filter(Boolean);
        const unique = Array.from(new Set(allCats));
        return ["Semua", ...unique.slice(0, 8)];
    }, [articles]);

    const filtered = useMemo(() => {
        return articles.filter((a) => {
            const catMatch = selectedCategory === "Semua" || a.categories.includes(selectedCategory);
            const searchMatch = !searchQuery ||
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase());
            return catMatch && searchMatch;
        });
    }, [articles, selectedCategory, searchQuery]);

    const hasActiveFilter = selectedCategory !== "Semua" || searchQuery.length > 0;

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="py-6 sm:py-10 flex flex-col gap-5 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-5xl mx-auto">
            <div className="text-center space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black text-foreground">Artikel & Info Kajian</h1>
                <p className="text-default-500 max-w-2xl mx-auto text-sm sm:text-base">
                    Artikel islami terbaru dari <strong className="text-foreground">muslim.or.id</strong> & <strong className="text-foreground">rumaysho.com</strong> — diperbarui setiap jam.
                </p>
            </div>

            {/* Search + Filter */}
            <div className="bg-default-50/50 backdrop-blur-md border border-divider rounded-2xl p-3 sm:p-4 space-y-3">
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-default-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-divider bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Filter size={16} />
                        Kategori
                    </div>
                    {hasActiveFilter && (
                        <button
                            onClick={() => { setSelectedCategory("Semua"); setSearchQuery(""); }}
                            className="flex items-center gap-1 text-xs text-danger font-medium hover:underline"
                        >
                            <X size={14} />
                            Reset
                        </button>
                    )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${selectedCategory === cat
                                ? "bg-primary text-white shadow-md shadow-primary/25"
                                : "bg-default-100 text-default-600 hover:bg-default-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-default-500 text-center">
                Menampilkan <strong className="text-foreground">{filtered.length}</strong> dari {articles.length} artikel
            </p>

            {/* Articles */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {filtered.map((article, idx) => (
                        <a
                            key={idx}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col bg-background rounded-2xl border border-divider shadow-sm overflow-hidden hover:shadow-md transition-all hover:border-primary/50"
                        >
                            {article.thumbnail && (
                                <div className="h-40 sm:h-48 overflow-hidden relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                        style={{ backgroundImage: `url(${article.thumbnail})` }}
                                    />
                                    {article.categories[0] && (
                                        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-primary">
                                            {article.categories[0]}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="p-4 sm:p-5 flex flex-col flex-1">
                                <h2 className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                    {article.title}
                                </h2>
                                <p className="text-default-500 text-xs sm:text-sm mt-2 line-clamp-3 flex-1">
                                    {article.description}
                                </p>

                                <div className="mt-4 flex items-center justify-between text-xs text-default-400 font-medium gap-2 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <User size={13} className="shrink-0" />
                                        <span className="truncate max-w-[120px]">{article.author}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={13} className="shrink-0" />
                                            <span className="whitespace-nowrap">{formatDate(article.pubDate)}</span>
                                        </div>
                                        <ExternalLink size={13} className="text-primary shrink-0" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 sm:py-16">
                    <p className="text-default-400 text-sm">Tidak ada artikel yang cocok dengan filter Anda.</p>
                    <button
                        onClick={() => { setSelectedCategory("Semua"); setSearchQuery(""); }}
                        className="mt-3 text-primary text-sm font-medium hover:underline"
                    >
                        Reset Filter
                    </button>
                </div>
            )}
        </div>
    );
}
