import { Feed } from "feed";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const siteUrl = "https://linlin.website"; // TODO: Update with your actual domain

    const feed = new Feed({
      title: "linlin's Blog",
      description: "A blend of thoughts, code, and life. (And some nonsense)",
      id: siteUrl,
      link: siteUrl,
      language: "zh-CN",
      image: `${siteUrl}/favicon.ico`,
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, linlin`,
      generator: "Next.js & Feed",
      author: {
        name: "linlin",
        email: "your.email@example.com", // Optional
        link: siteUrl,
      },
    });

    // Fetch published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 20, // Limit to latest 20 posts for the feed
    });

    posts.forEach((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.excerpt || "",
        content: post.excerpt || "", // A brief summary, or use post.content for full article
        author: [
          {
            name: "linlin",
            link: siteUrl,
          },
        ],
        date: post.createdAt,
      });
    });

    return new NextResponse(feed.rss2(), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
