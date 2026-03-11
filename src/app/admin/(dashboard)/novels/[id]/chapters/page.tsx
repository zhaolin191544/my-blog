"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, GripVertical, ArrowUp, ArrowDown } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
}

export default function ChaptersPage() {
  const params = useParams();
  const novelId = params.id as string;
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [novelTitle, setNovelTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [chaptersRes, novelRes] = await Promise.all([
        fetch(`/api/novels/${novelId}/chapters`),
        fetch(`/api/novels/${novelId}`),
      ]);
      const chaptersData = await chaptersRes.json();
      const novelData = await novelRes.json();
      setChapters(chaptersData);
      setNovelTitle(novelData.title);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, [novelId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const moveChapter = async (index: number, direction: "up" | "down") => {
    const newChapters = [...chapters];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newChapters.length) return;

    [newChapters[index], newChapters[targetIndex]] = [newChapters[targetIndex], newChapters[index]];

    const reordered = newChapters.map((ch, i) => ({
      id: ch.id,
      sortOrder: i,
    }));

    setChapters(newChapters);

    await fetch(`/api/novels/${novelId}/chapters/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapters: reordered }),
    });
  };

  const handleDelete = async (chapterId: string) => {
    if (!window.confirm("确定删除此章节？")) return;
    await fetch(`/api/novels/${novelId}/chapters/${chapterId}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/novels"
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">章节管理</h1>
            <p className="text-sm text-neutral-500">{novelTitle}</p>
          </div>
        </div>
        <Link
          href={`/admin/novels/${novelId}/chapters/new`}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          新章节
        </Link>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p className="py-12 text-center text-neutral-400">加载中...</p>
        ) : chapters.length === 0 ? (
          <p className="py-12 text-center text-neutral-400">暂无章节</p>
        ) : (
          chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              <GripVertical className="h-4 w-4 shrink-0 text-neutral-300" />
              <span className="w-8 shrink-0 text-sm font-mono text-neutral-400">{index + 1}</span>
              <div className="flex-1">
                <span className="font-medium text-neutral-900">{chapter.title}</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  chapter.published
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {chapter.published ? "已发布" : "草稿"}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveChapter(index, "up")}
                  disabled={index === 0}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 disabled:opacity-30"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => moveChapter(index, "down")}
                  disabled={index === chapters.length - 1}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 disabled:opacity-30"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <Link
                  href={`/admin/novels/${novelId}/chapters/${chapter.id}/edit`}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-amber-500"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => handleDelete(chapter.id)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
