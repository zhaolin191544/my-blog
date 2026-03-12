"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

interface MrsZhaoArticle {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  createdAt: string;
}

interface YearGroup {
  year: number;
  articles: MrsZhaoArticle[];
}

function groupByYear(articles: MrsZhaoArticle[]): YearGroup[] {
  const map = new Map<number, MrsZhaoArticle[]>();
  for (const article of articles) {
    const year = new Date(article.publishAt).getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(article);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, articles]) => ({ year, articles }));
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const chars = text.length;
  return Math.max(1, Math.ceil(chars / 400));
}

export default function MrsZhaoPage() {
  const t = useTranslations("mrsZhao");
  const [articles, setArticles] = useState<MrsZhaoArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/mrs-zhao?limit=100");
        const data = await res.json();
        setArticles(data.data || []);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const yearGroups = groupByYear(articles);

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-250">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/"
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8  max-[767px]:hidden"
          >
            {t("back")}
          </Link>
          <h1 className="italic font-serif text-4xl max-[767px]:text-3xl font-normal tracking-tight text-carbon">
            {t("title")}
          </h1>
          <p className="mt-2 text-ash text-sm font-serif italic">
            {t("subtitle")}
          </p>
        </header>

        <main className="px-8 max-[767px]:px-5 py-6 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {yearGroups.map(({ year, articles: yearArticles }) => (
                <section key={year}>
                  {/* Year heading */}
                  <h2 className="font-serif text-7xl max-[767px]:text-5xl font-light text-enamel select-none mb-6">
                    {year}
                  </h2>

                  {/* Articles list */}
                  <div className="space-y-0 border-t border-enamel">
                    {yearArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/mrs-zhao/${article.id}`}
                        className="group flex items-baseline justify-between gap-4 py-4 border-b border-enamel/60 hover:border-ash/30 transition-colors"
                      >
                        <h3 className="font-serif text-base max-[767px]:text-sm text-carbon group-hover:text-amber transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 shrink-0 text-cement text-xs font-serif whitespace-nowrap">
                          <span>{format(new Date(article.publishAt), "MMM d")}</span>
                          <span className="text-enamel">·</span>
                          <span>{estimateReadTime(article.content)}{t("min_read")}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
