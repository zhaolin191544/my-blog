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
  published: boolean;
  chapters: NovelChapter[];
}

export default function ChapterReaderPage() {
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

  // Published chapters sorted by sortOrder
  const publishedChapters = useMemo(() => {
    if (!novel) return [];
    return novel.chapters.filter((ch) => ch.published).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [novel]);

  // Find current chapter and prev/next
  const currentIndex = publishedChapters.findIndex((ch) => ch.id === params.chapterId);
  const currentChapter = currentIndex >= 0 ? publishedChapters[currentIndex] : null;
  const prevChapter = currentIndex > 0 ? publishedChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < publishedChapters.length - 1
      ? publishedChapters[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-200">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href={`/novel/${params.id}`}
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8 max-[767px]:hidden"
          >
            {t("back_to_novel")}
          </Link>
        </header>

        <main className="px-8 max-[767px]:px-5 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : notFound || !novel || !currentChapter ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("not_found")}</p>
              <Link
                href="/novel"
                className="text-sm text-ash hover:text-carbon transition-colors font-serif"
              >
                {t("back_to_list")}
              </Link>
            </div>
          ) : (
            <article>
              {/* Novel title as subtitle */}
              <p className="text-xs text-cement font-serif uppercase tracking-widest mb-2">
                {novel.title}
              </p>

              {/* Chapter title */}
              <h1 className="font-serif text-3xl max-[767px]:text-2xl font-normal tracking-tight text-carbon leading-tight">
                {currentChapter.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-3 mt-4 mb-10 text-cement text-xs font-serif">
                <span>
                  {currentIndex + 1} / {publishedChapters.length}
                </span>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-enamel mb-10" />

              {/* Content */}
              <div
                className="prose-zhao font-serif text-base leading-[1.85] text-dark max-w-none"
                dangerouslySetInnerHTML={{ __html: currentChapter.content }}
              />

              {/* Prev / Next Navigation */}
              <div className="mt-16 pt-8 border-t border-enamel flex items-center justify-between gap-4">
                {prevChapter ? (
                  <Link
                    href={`/novel/${novel.id}/${prevChapter.id}`}
                    className="group flex flex-col items-start gap-1 max-w-[45%]"
                  >
                    <span className="text-xs text-cement font-serif">{t("prev_chapter")}</span>
                    <span className="text-sm font-serif text-ash group-hover:text-amber transition-colors truncate max-w-full">
                      {prevChapter.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextChapter ? (
                  <Link
                    href={`/novel/${novel.id}/${nextChapter.id}`}
                    className="group flex flex-col items-end gap-1 max-w-[45%]"
                  >
                    <span className="text-xs text-cement font-serif">{t("next_chapter")}</span>
                    <span className="text-sm font-serif text-ash group-hover:text-amber transition-colors truncate max-w-full">
                      {nextChapter.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
}
