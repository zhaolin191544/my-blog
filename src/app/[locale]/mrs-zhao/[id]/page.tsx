"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { useParams } from "next/navigation";

interface MrsZhaoArticle {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  createdAt: string;
}

export default function MrsZhaoArticlePage() {
  const t = useTranslations("mrsZhao");
  const params = useParams();
  const [article, setArticle] = useState<MrsZhaoArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/mrs-zhao/${params.id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setArticle(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchArticle();
  }, [params.id]);

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-200">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/mrs-zhao"
            className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8  max-[767px]:hidden"
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
          ) : notFound || !article ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("not_found")}</p>
              <Link
                href="/mrs-zhao"
                className="text-sm text-ash hover:text-carbon transition-colors font-serif"
              >
                {t("back_to_list")}
              </Link>
            </div>
          ) : (
            <article>
              {/* Title */}
              <h1 className="font-serif text-3xl max-[767px]:text-2xl font-normal tracking-tight text-carbon leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-3 mt-4 mb-10 text-cement text-xs font-serif">
                <time>{format(new Date(article.publishAt), "MMMM d, yyyy")}</time>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-enamel mb-10" />

              {/* Content */}
              <div
                className="prose-zhao font-serif text-base leading-[1.85] text-dark max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>
          )}
        </main>
      </div>
    </div>
  );
}
