import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");

    const where: Record<string, unknown> = {};
    if (region) {
      where.region = region;
    }

    const photos = await prisma.photo.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const regions = await prisma.photo.findMany({
      select: { region: true },
      distinct: ["region"],
      orderBy: { region: "asc" },
    });

    return NextResponse.json({
      photos,
      regions: regions.map((r) => r.region),
    });
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
    const { url, caption, location, region } = body;

    if (!url || !region) {
      return NextResponse.json(
        { error: "图片URL和地区不能为空" },
        { status: 400 }
      );
    }

    const photo = await prisma.photo.create({
      data: {
        url,
        caption: caption || null,
        location: location || null,
        region,
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
