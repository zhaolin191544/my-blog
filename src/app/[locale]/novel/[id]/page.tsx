"use client";

import { useEffect, useState, useMemo } from "react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { useParams } from "next/navigation";

interface NovelChapter {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
  published: boolean;
}

interface Novel {
  id: string;
  title: string;
  cover: string | null;
  description: string | null;
  published: boolean;
  chapters: NovelChapter[];
}

export default function NovelDetailPage() {
  const t = useTranslations("novel");
  const params = useParams();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchNovel() {
      try {
        const res = await fetch(`/api/novels/${params.id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        // Only show published novels
        if (!data.published) {
          setNotFound(true);
          return;
        }
        setNovel(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchNovel();
  }, [params.id]);

  // Filter published chapters
  const publishedChapters = useMemo(() => {
    if (!novel) return [];
    return novel.chapters.filter((ch) => ch.published).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [novel]);

  const isShortStory = publishedChapters.length === 1;

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-200">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/novel"
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8 max-[767px]:hidden"
          >
            {t("back_to_list")}
          </Link>
        </header>

        <main className="px-8 max-[767px]:px-5 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : notFound || !novel ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("not_found")}</p>
              <Link
                href="/novel"
                className="text-sm text-ash hover:text-carbon transition-colors font-serif"
              >
                {t("back_to_list")}
              </Link>
            </div>
          ) : isShortStory ? (
            /* Short story — render chapter content directly */
            <article>
              <h1 className="font-serif text-3xl max-[767px]:text-2xl font-normal tracking-tight text-carbon leading-tight">
                {novel.title}
              </h1>

              {novel.description && (
                <p className="mt-3 text-ash text-sm font-serif italic leading-relaxed">
                  {novel.description}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4 mb-10">
                <span className="text-xs text-cement font-serif px-2 py-0.5 border border-enamel rounded-full">
                  {t("short_story_tag")}
                </span>
              </div>

              <div className="w-12 h-px bg-enamel mb-10" />

              <div
                className="prose-zhao font-serif text-base leading-[1.85] text-dark max-w-none"
                dangerouslySetInnerHTML={{ __html: publishedChapters[0].content }}
              />
            </article>
          ) : (
            /* Multi-chapter novel — show info + chapter list */
            <div>
              {/* Novel header */}
              <div className="flex gap-6 max-[767px]:flex-col mb-10">
                {novel.cover && (
                  <div className="w-36 h-48 max-[767px]:w-28 max-[767px]:h-38 rounded-lg overflow-hidden shrink-0 bg-enamel">
                    <img
                      src={novel.cover}
                      alt={novel.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <h1 className="font-serif text-3xl max-[767px]:text-2xl font-normal tracking-tight text-carbon leading-tight">
                    {novel.title}
                  </h1>
                  {novel.description && (
                    <p className="mt-3 text-ash text-sm font-serif italic leading-relaxed">
                      {novel.description}
                    </p>
                  )}
                  <div className="mt-3 text-xs text-cement font-serif">
                    {publishedChapters.length} {t("chapters_count")}
                  </div>
                </div>
              </div>

              {/* Chapter list */}
              <div className="space-y-0 border-t border-enamel">
                {publishedChapters.map((chapter, idx) => (
                  <Link
                    key={chapter.id}
                    href={`/novel/${novel.id}/${chapter.id}`}
                    className="group flex items-baseline justify-between gap-4 py-4 border-b border-enamel/60 hover:border-ash/30 transition-colors"
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="text-xs text-cement font-serif shrink-0 w-6 text-right">
                        {idx + 1}
                      </span>
                      <h3 className="font-serif text-base max-[767px]:text-sm text-carbon group-hover:text-amber transition-colors leading-snug truncate">
                        {chapter.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
