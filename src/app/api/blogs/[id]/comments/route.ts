import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";
import { checkSpam } from "@/src/lib/spam-detector";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");

    const where: Record<string, unknown> = { postId: id };
    if (!session) {
      where.approved = true;
    } else if (approved !== null && approved !== "") {
      where.approved = approved === "true";
    }

    const comments = await prisma.blogComment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch {
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { author, email, content } = body;

    if (!author || !email || !content) {
      return NextResponse.json({ error: "姓名、邮箱和评论内容不能为空" }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    const spamResult = checkSpam(content, email, author);

    const comment = await prisma.blogComment.create({
      data: {
        postId: id,
        author,
        email,
        content,
        approved: false,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "评论失败" }, { status: 500 });
  }
}
