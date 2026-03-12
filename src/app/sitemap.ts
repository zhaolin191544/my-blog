import type { MetadataRoute } from "next";
import { prisma } from "@/src/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://1223.feetunder.com";
const locales = ["zh", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/blog",
    "/messages",
    "/shorts",
    "/photos",
    "/novel",
    "/mrs-zhao",
    "/terminal",
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic blog posts
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    for (const blog of blogs) {
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}/blog/${blog.slug}`,
          lastModified: blog.updatedAt,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // DB might not be available during build
  }

  // Dynamic novels
  try {
    const novels = await prisma.novel.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
    });

    for (const novel of novels) {
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}/novel/${novel.id}`,
          lastModified: novel.updatedAt,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // DB might not be available during build
  }

  return entries;
}
