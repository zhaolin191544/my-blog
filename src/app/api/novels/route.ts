import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";

export async function GET() {
  try {
    const novels = await prisma.novel.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { chapters: true } } },
    });

    return NextResponse.json(novels);
  } catch {
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, cover, description, published } = body;

    if (!title) {
      return NextResponse.json(
        { error: "标题不能为空" },
        { status: 400 }
      );
    }

    const novel = await prisma.novel.create({
      data: {
        title,
        cover: cover || null,
        description: description || null,
        published: published || false,
      },
    });

    return NextResponse.json(novel, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
