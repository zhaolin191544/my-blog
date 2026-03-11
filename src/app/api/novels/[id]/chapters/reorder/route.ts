import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { chapters } = body as {
      chapters: { id: string; sortOrder: number }[];
    };

    await Promise.all(
      chapters.map((ch) =>
        prisma.novelChapter.update({
          where: { id: ch.id },
          data: { sortOrder: ch.sortOrder },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "排序失败" }, { status: 500 });
  }
}
