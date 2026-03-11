import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const chapters = await prisma.novelChapter.findMany({
      where: { novelId: id },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(chapters);
  } catch {
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, content, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "标题和内容不能为空" },
        { status: 400 }
      );
    }

    const maxOrder = await prisma.novelChapter.findFirst({
      where: { novelId: id },
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });

    const chapter = await prisma.novelChapter.create({
      data: {
        novelId: id,
        title,
        content,
        sortOrder: (maxOrder?.sortOrder ?? -1) + 1,
        published: published || false,
      },
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
