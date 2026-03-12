"use client";

import { useEffect, useState, useMemo } from "react";
import { Link } from "@/src/i18n/routing";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { TableOfContents, parseAndInjectHeadingIds } from "@/src/components/blog/TableOfContents";
import type { TocItem } from "@/src/components/blog/TableOfContents";
import { BlogComments } from "@/src/components/blog/BlogComments";
import { useParams } from "next/navigation";

interface BlogComment {
  id: string;
  author: string;
  content: string;
  approved: boolean;
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  excerpt: string | null;
  content: string;
  contentType: string;
  published: boolean;
  createdAt: string;
  comments: BlogComment[];
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return Math.max(1, Math.ceil(text.length / 400));
}

export default function BlogArticlePage() {
  const t = useTranslations("blog");
  const tocTitle = useTranslations("blog")("toc_title");
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Pre-process HTML: inject heading IDs and extract TOC items
  const { processedHtml, tocHeadings } = useMemo(() => {
    if (!post) return { processedHtml: "", tocHeadings: [] as TocItem[] };
    const result = parseAndInjectHeadingIds(post.content);
    return { processedHtml: result.html, tocHeadings: result.headings };
  }, [post]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blogs/by-slug/${params.slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setPost(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) fetchPost();
  }, [params.slug]);

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-300">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6">
          <Link
            href="/blog"
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
          ) : notFound || !post ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("not_found")}</p>
              <Link
                href="/blog"
                className="text-sm text-ash hover:text-carbon transition-colors font-serif"
              >
                {t("back_to_list")}
              </Link>
            </div>
          ) : (
            <div className="flex gap-12 min-[1024px]:gap-16 relative">
              {/* Article Content */}
              <article className="flex-1 min-w-0 max-w-200">
                {/* Cover Image */}
                {post.cover && (
                  <div className="mb-8 rounded-lg overflow-hidden">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                <h1 className="font-serif text-3xl max-[767px]:text-2xl font-normal tracking-tight text-carbon leading-tight">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-3 mt-4 mb-10 text-cement text-xs font-serif">
                  <time>
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </time>
                  <span className="text-enamel">·</span>
                  <span>
                    {estimateReadTime(post.content)} {t("min_read")}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-enamel mb-10" />

                {/* Content */}
                <div
                  className="prose-zhao font-serif text-base leading-[1.85] text-dark max-w-none"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />

                {/* Comments */}
                <BlogComments
                  postId={post.id}
                  initialComments={post.comments}
                />
              </article>

              {/* TOC Sidebar - Desktop Only */}
              <aside className="hidden min-[1024px]:block w-56 shrink-0">
                <TableOfContents headings={tocHeadings} title={tocTitle} />
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
