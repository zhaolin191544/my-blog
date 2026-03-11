"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Trash2, Pencil, Plus, X, Check, Calendar } from "lucide-react";
import { format } from "date-fns";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/src/components/admin/RichTextEditor").then((mod) => mod.RichTextEditor), {
  ssr: false,
  loading: () => <div className="h-[300px] rounded-lg border border-neutral-200 bg-neutral-50" />,
});

interface MrsZhaoArticle {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  createdAt: string;
}

export default function MrsZhaoPage() {
  const [articles, setArticles] = useState<MrsZhaoArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Create form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPublishAt, setNewPublishAt] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editPublishAt, setEditPublishAt] = useState("");

  const editEditorKey = useRef(0);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mrs-zhao?limit=50");
      const data = await res.json();
      setArticles(data.data);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCreate = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setCreating(true);
    try {
      await fetch("/api/mrs-zhao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          publishAt: newPublishAt,
        }),
      });
      setNewTitle("");
      setNewContent("");
      setNewPublishAt(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
      setShowForm(false);
      fetchArticles();
    } catch {
      // failed
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    await fetch(`/api/mrs-zhao/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        publishAt: editPublishAt,
      }),
    });
    setEditingId(null);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定删除这篇文章？")) return;
    await fetch(`/api/mrs-zhao/${id}`, { method: "DELETE" });
    fetchArticles();
  };

  const startEdit = (article: MrsZhaoArticle) => {
    setEditingId(article.id);
    setEditTitle(article.title);
    setEditContent(article.content);
    setEditPublishAt(format(new Date(article.publishAt), "yyyy-MM-dd'T'HH:mm"));
    editEditorKey.current += 1;
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Mrs. Zhao</h1>
          <p className="mt-1 text-sm text-neutral-500">管理 Mrs. Zhao 的文章</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          >
            <Plus className="h-4 w-4" />
            新建文章
          </button>
        )}
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-800">新建文章</h2>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-3 w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
            placeholder="文章标题"
          />

          <div className="mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-neutral-400" />
            <input
              type="datetime-local"
              value={newPublishAt}
              onChange={(e) => setNewPublishAt(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="mb-4 rounded-lg border border-neutral-200 overflow-hidden">
            <RichTextEditor
              content={newContent}
              onChange={(val) => setNewContent(val)}
              contentType="HTML"
              placeholder="写点什么..."
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={!newTitle.trim() || !newContent.trim() || creating}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
            >
              发布
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <p className="py-12 text-center text-neutral-400">加载中...</p>
        ) : articles.length === 0 ? (
          <p className="py-12 text-center text-neutral-400">暂无文章</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="rounded-xl border border-neutral-200 bg-white p-5">
              {editingId === article.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium focus:border-amber-400 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                    <input
                      type="datetime-local"
                      value={editPublishAt}
                      onChange={(e) => setEditPublishAt(e.target.value)}
                      className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="rounded-lg border border-neutral-200 overflow-hidden">
                    <RichTextEditor
                      key={editEditorKey.current}
                      content={editContent}
                      onChange={(val) => setEditContent(val)}
                      contentType="HTML"
                      placeholder="编辑内容..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-100"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => handleUpdate(article.id)}
                      className="flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                    >
                      <Check className="h-4 w-4" />
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-neutral-900">{article.title}</h3>
                      <div
                        className="mt-2 line-clamp-3 text-sm text-neutral-600"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(article.publishAt), "yyyy-MM-dd HH:mm")}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(article)}
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-amber-500"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
