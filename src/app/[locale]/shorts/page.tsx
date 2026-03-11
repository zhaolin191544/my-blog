"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { format } from "date-fns";
import { MagicCard } from "@/src/components/magicui/magic-card";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

interface Short {
  id: string;
  content: string;
  location: string | null;
  createdAt: string;
}

export default function ShortsPage() {
  const t = useTranslations("shorts");
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShorts() {
      try {
        const res = await fetch("/api/shorts?limit=50");
        const data = await res.json();
        setShorts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch shorts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchShorts();
  }, []);

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-250">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/"
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8"
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

        <main className="px-8 max-[767px]:px-5 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : shorts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("empty")}</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {shorts.map((short) => (
                <div key={short.id} className="break-inside-avoid mb-6">
                  <MagicCard
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full"
                    gradientColor="rgba(245, 158, 11, 0.1)"
                    gradientOpacity={1}
                  >
                    <div className="flex flex-col h-full justify-between gap-4 relative z-10">
                      <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-serif whitespace-pre-wrap">
                        {short.content}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 text-xs text-neutral-400 dark:text-neutral-500 font-serif border-t border-neutral-100 dark:border-neutral-800">
                        <span>{format(new Date(short.createdAt), "MMM d, yyyy")}</span>
                        {short.location && (
                          <span className="italic flex items-center gap-1 before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-neutral-300">
                            {short.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </MagicCard>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
