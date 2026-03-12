"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

interface Novel {
  id: string;
  title: string;
  cover: string | null;
  description: string | null;
  published: boolean;
  createdAt: string;
  _count: { chapters: number };
}

export default function NovelListPage() {
  const t = useTranslations("novel");
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNovels() {
      try {
        const res = await fetch("/api/novels");
        const data = await res.json();
        // Filter published novels on client side
        setNovels((data || []).filter((n: Novel) => n.published));
      } catch (err) {
        console.error("Failed to fetch novels:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNovels();
  }, []);

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-250">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/"
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8 max-[767px]:hidden"
          >
            {t("back")}
          </Link>
          <h1 className="italic font-serif text-4xl max-[767px]:text-3xl font-normal tracking-tight text-carbon">
            {t("title")}
          </h1>
          <p className="mt-2 text-ash text-sm font-serif italic">{t("subtitle")}</p>
        </header>

        <main className="px-8 max-[767px]:px-5 py-6 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : novels.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-0 border-t border-enamel">
              {novels.map((novel) => (
                <Link
                  key={novel.id}
                  href={`/novel/${novel.id}`}
                  className="group flex gap-5 py-6 border-b border-enamel/60 hover:border-ash/30 transition-colors"
                >
                  {/* Cover */}
                  {novel.cover && (
                    <div className="w-20 h-28 max-[767px]:w-16 max-[767px]:h-22 rounded-md overflow-hidden shrink-0 bg-enamel">
                      <img
                        src={novel.cover}
                        alt={novel.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h2 className="font-serif text-lg max-[767px]:text-base text-carbon group-hover:text-amber transition-colors leading-snug">
                      {novel.title}
                    </h2>
                    {novel.description && (
                      <p className="mt-1.5 text-sm text-ash font-serif line-clamp-2 leading-relaxed">
                        {novel.description}
                      </p>
                    )}
                    <div className="mt-2 text-xs text-cement font-serif">
                      {novel._count.chapters} {t("chapters_count")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
