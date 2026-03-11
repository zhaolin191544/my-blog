"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUploader } from "@/src/components/admin/ImageUploader";

export default function NewNovelPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    cover: "",
    description: "",
    published: false,
  });

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim()) {
      alert("标题不能为空");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/novels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          published: publish ?? form.published,
        }),
      });
      if (res.ok) {
        const novel = await res.json();
        router.push(`/admin/novels/${novel.id}/chapters`);
      } else {
        const err = await res.json();
        alert(err.error || "创建失败");
      }
    } catch {
      alert("创建失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/novels"
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900">新建小说</h1>
        </div>
        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "保存中..." : "创建"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">标题</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-lg focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                placeholder="小说标题"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">简介</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-amber-400 focus:outline-none"
                placeholder="小说简介..."
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <label className="mb-3 block text-sm font-medium text-neutral-700">封面图片</label>
          <ImageUploader
            value={form.cover}
            onChange={(url) => setForm((f) => ({ ...f, cover: url }))}
            category="novels"
          />
        </div>
      </div>
    </div>
  );
}
