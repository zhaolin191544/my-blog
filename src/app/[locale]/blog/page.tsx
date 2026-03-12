"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  createdAt: string;
}

interface YearGroup {
  year: number;
  articles: BlogPost[];
}

function groupByYear(articles: BlogPost[]): YearGroup[] {
  const map = new Map<number, BlogPost[]>();
  for (const article of articles) {
    const year = new Date(article.createdAt).getFullYear();
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

export default function BlogPage() {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blogs?published=true&limit=100");
        const data = await res.json();
        setPosts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const yearGroups = groupByYear(posts);

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
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {yearGroups.map(({ year, articles: yearPosts }) => (
                <section key={year}>
                  <h2 className="font-serif text-7xl max-[767px]:text-5xl font-light text-enamel select-none mb-6">
                    {year}
                  </h2>

                  <div className="space-y-0 border-t border-enamel">
                    {yearPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group flex items-baseline justify-between gap-4 py-4 border-b border-enamel/60 hover:border-ash/30 transition-colors"
                      >
                        <h3 className="font-serif text-base max-[767px]:text-sm text-carbon group-hover:text-amber transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 shrink-0 text-cement text-xs font-serif whitespace-nowrap">
                          <span>
                            {format(new Date(post.createdAt), "MMM d")}
                          </span>
                          <span className="text-enamel">·</span>
                          <span>
                            {estimateReadTime(post.content)}
                            {t("min_read")}
                          </span>
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
