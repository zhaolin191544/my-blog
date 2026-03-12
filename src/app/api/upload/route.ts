import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/src/lib/auth";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "blogs";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "不支持的文件类型" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "文件大小不能超过 5MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "png";
    const filename = `${category}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("uploads")
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json({ error: "上传失败" }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("uploads").getPublicUrl(filename);
    const url = publicUrlData.publicUrl;

    return NextResponse.json({ url, filename });
  } catch {
    return NextResponse.json({ error: "上传失败" }, { status: 500 });
  }
}
