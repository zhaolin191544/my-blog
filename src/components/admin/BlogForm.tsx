"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUploader } from "./ImageUploader";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface BlogFormData {
  id?: string;
  title: string;
  slug: string;
  cover: string;
  excerpt: string;
  content: string;
  contentType: "MARKDOWN" | "HTML";
  published: boolean;
}

interface BlogFormProps {
  initialData?: BlogFormData;
  mode: "create" | "edit";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[\u4e00-\u9fff]/g, (char) => {
      return char.charCodeAt(0).toString(16);
    })
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BlogFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    cover: initialData?.cover || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    contentType: initialData?.contentType || "MARKDOWN",
    published: initialData?.published || false,
  });

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    try {
      const data = {
        ...form,
        published: publish !== undefined ? publish : form.published,
      };

      const url =
        mode === "create"
          ? "/api/blogs"
          : `/api/blogs/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "保存失败");
      }
    } catch {
      alert("保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900">
            {mode === "create" ? "新建文章" : "编辑文章"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            保存草稿
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
          >
            {saving ? "保存中..." : "发布"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title & Slug */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                标题
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: mode === "create" && !f.slug ? generateSlug(title) : f.slug,
                  }));
                }}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-lg focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                placeholder="文章标题"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Slug (URL 路径)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 font-mono text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                placeholder="article-slug"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                摘要
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                rows={2}
                className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                placeholder="简短描述..."
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <label className="mb-3 block text-sm font-medium text-neutral-700">
            封面图片
          </label>
          <ImageUploader
            value={form.cover}
            onChange={(url) => setForm((f) => ({ ...f, cover: url }))}
            category="blogs"
          />
        </div>

        {/* Content Type Toggle */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              正文内容
            </label>
            <div className="flex rounded-lg border border-neutral-200 p-0.5">
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({ ...f, contentType: "MARKDOWN" }))
                }
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  form.contentType === "MARKDOWN"
                    ? "bg-amber-500 text-white"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Markdown
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({ ...f, contentType: "HTML" }))
                }
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  form.contentType === "HTML"
                    ? "bg-amber-500 text-white"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                HTML
              </button>
            </div>
          </div>
          <RichTextEditor
            content={form.content}
            contentType={form.contentType}
            onChange={(content, contentType) =>
              setForm((f) => ({ ...f, content, contentType }))
            }
            placeholder="开始写作..."
          />
        </div>
      </div>
    </div>
  );
}
