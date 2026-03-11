"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";

interface Novel {
  id: string;
  title: string;
  cover: string | null;
  description: string | null;
  published: boolean;
  _count: { chapters: number };
  createdAt: string;
}

export default function NovelsPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNovels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/novels");
      const data = await res.json();
      setNovels(data);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNovels();
  }, [fetchNovels]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定删除这本小说及所有章节？")) return;
    await fetch(`/api/novels/${id}`, { method: "DELETE" });
    fetchNovels();
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">小说管理</h1>
          <p className="mt-1 text-sm text-neutral-500">共 {novels.length} 部小说</p>
        </div>
        <Link
          href="/admin/novels/new"
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          新建小说
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full py-12 text-center text-neutral-400">加载中...</p>
        ) : novels.length === 0 ? (
          <p className="col-span-full py-12 text-center text-neutral-400">暂无小说</p>
        ) : (
          novels.map((novel) => (
            <div
              key={novel.id}
              className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-md"
            >
              {novel.cover ? (
                <img src={novel.cover} alt={novel.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center bg-neutral-100">
                  <BookOpen className="h-12 w-12 text-neutral-300" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-900">{novel.title}</h3>
                    {novel.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                        {novel.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      novel.published
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {novel.published ? "已发布" : "草稿"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">{novel._count.chapters} 章</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={`/admin/novels/${novel.id}/chapters`}
                    className="flex-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-center text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    章节管理
                  </Link>
                  <Link
                    href={`/admin/novels/${novel.id}/edit`}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-amber-500"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(novel.id)}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
