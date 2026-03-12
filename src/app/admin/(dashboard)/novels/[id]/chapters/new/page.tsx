"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { RichTextEditor } from "@/src/components/admin/RichTextEditor";

export default function NewChapterPage() {
  const router = useRouter();
  const params = useParams();
  const novelId = params.id as string;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    published: false,
  });

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("标题和内容不能为空");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/novels/${novelId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push(`/admin/novels/${novelId}/chapters`);
      }
    } catch {
      alert("创建失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/novels/${novelId}/chapters`}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900">新建章节</h1>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
            />
            直接发布
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">章节标题</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
            placeholder="第一章：..."
          />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <label className="mb-3 block text-sm font-medium text-neutral-700">章节内容</label>
          <RichTextEditor
            content={form.content}
            contentType="HTML"
            onChange={(content) => setForm((f) => ({ ...f, content }))}
            placeholder="开始写作..."
          />
        </div>
      </div>
    </div>
  );
}
