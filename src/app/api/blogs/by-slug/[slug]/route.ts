import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { marked } from "marked";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        comments: {
          where: { approved: true },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { comments: true } },
      },
    });

    if (!post || !post.published) {
      return NextResponse.json({ error: "未找到" }, { status: 404 });
    }

    // Convert markdown to HTML if needed
    let htmlContent = post.content;
    if (post.contentType === "MARKDOWN") {
      htmlContent = await marked.parse(post.content);
    }

    // Strip email from comments for privacy, ensure reply fields are included
    const safeComments = post.comments.map((c) => ({
      id: c.id,
      author: c.author,
      content: c.content,
      approved: c.approved,
      reply: c.reply,
      repliedAt: c.repliedAt,
      createdAt: c.createdAt,
    }));

    return NextResponse.json({
      ...post,
      content: htmlContent,
      comments: safeComments,
    });
  } catch {
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}
