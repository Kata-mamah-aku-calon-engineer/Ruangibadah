import { KajianClient } from "./KajianClient";

interface RssItem {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    thumbnail: string;
    description: string;
    categories: string[];
}

async function fetchKajianArticles(): Promise<RssItem[]> {
    const feeds = [
        "https://muslim.or.id/feed",
        "https://rumaysho.com/feed",
        "https://konsultasisyariah.com/feed",
        "https://islamqa.info/id/rss",
    ];

    const allArticles: RssItem[] = [];

    for (const feedUrl of feeds) {
        try {
            const res = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`,
                { next: { revalidate: 3600 } } // Cache 1 hour
            );
            const data = await res.json();
            if (data.status === "ok" && data.items) {
                allArticles.push(...data.items.map((item: any) => ({
                    title: item.title || "",
                    link: item.link || "",
                    pubDate: item.pubDate || "",
                    author: item.author || "Anonim",
                    thumbnail: item.thumbnail || item.enclosure?.link || "",
                    description: (item.description || "").replace(/<[^>]*>/g, "").substring(0, 220),
                    categories: item.categories || [],
                })));
            }
        } catch {
            // Skip failed feeds
        }
    }

    // Sort by date (newest first)
    allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return allArticles;
}

export default async function KajianPage() {
    const articles = await fetchKajianArticles();

    return <KajianClient articles={articles} />;
}
