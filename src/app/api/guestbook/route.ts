import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkSpam } from "@/src/lib/spam-detector";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const [data, total] = await Promise.all([
      prisma.message.findMany({
        where: { isSpam: false, read: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.message.count({ where: { isSpam: false, read: true } }),
    ]);

    // Omit email for public guestbook
    const publicData = data.map((msg) => ({
      id: msg.id,
      name: msg.name,
      content: msg.content,
      reply: msg.reply,
      repliedAt: msg.repliedAt,
      createdAt: msg.createdAt,
    }));

    return NextResponse.json({ data: publicData, total, page, limit });
  } catch {
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, content } = body;

    if (!name || !email || !content) {
      return NextResponse.json({ error: "姓名、邮箱和留言内容不能为空" }, { status: 400 });
    }

    const spamResult = checkSpam(content, email, name);

    const message = await prisma.message.create({
      data: {
        name,
        email,
        content,
        isSpam: spamResult.isSpam,
      },
    });

    return NextResponse.json({ success: true, id: message.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "提交失败" }, { status: 500 });
  }
}
