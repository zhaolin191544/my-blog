import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";
import { checkSpam } from "@/src/lib/spam-detector";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const read = searchParams.get("read");
    const spam = searchParams.get("spam");

    const where: Record<string, unknown> = {};
    if (read !== null && read !== "") {
      where.read = read === "true";
    }
    if (spam !== null && spam !== "") {
      where.isSpam = spam === "true";
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
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
