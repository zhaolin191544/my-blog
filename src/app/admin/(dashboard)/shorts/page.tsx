"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Trash2, Pencil, Plus, X, Check } from "lucide-react";
import { format } from "date-fns";

interface Short {
  id: string;
  content: string;
  location: string | null;
  createdAt: string;
}

export default function ShortsPage() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchShorts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/shorts?limit=50");
      const data = await res.json();
      setShorts(data.data);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShorts();
  }, [fetchShorts]);

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setCreating(true);
    try {
      await fetch("/api/shorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newContent,
          location: newLocation || null,
        }),
      });
      setNewContent("");
      setNewLocation("");
      fetchShorts();
    } catch {
      // failed
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    await fetch(`/api/shorts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: editContent,
        location: editLocation || null,
      }),
    });
    setEditingId(null);
    fetchShorts();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定删除？")) return;
    await fetch(`/api/shorts/${id}`, { method: "DELETE" });
    fetchShorts();
  };

  const startEdit = (short: Short) => {
    setEditingId(short.id);
    setEditContent(short.content);
    setEditLocation(short.location || "");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">短内容</h1>
        <p className="mt-1 text-sm text-neutral-500">
          随时记录想法和动态
        </p>
      </div>

      {/* Create Form */}
      <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-4">
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          placeholder="写点什么..."
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
              placeholder="位置（可选）"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!newContent.trim() || creating}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            发布
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <p className="py-12 text-center text-neutral-400">加载中...</p>
        ) : shorts.length === 0 ? (
          <p className="py-12 text-center text-neutral-400">暂无内容</p>
        ) : (
          shorts.map((short) => (
            <div
              key={short.id}
              className="rounded-xl border border-neutral-200 bg-white p-4"
            >
              {editingId === short.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm"
                      placeholder="位置"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleUpdate(short.id)}
                        className="rounded-lg p-2 text-amber-500 hover:bg-amber-50"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap text-sm text-neutral-800">
                    {short.content}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span>
                        {format(new Date(short.createdAt), "yyyy-MM-dd HH:mm")}
                      </span>
                      {short.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {short.location}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(short)}
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-amber-500"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(short.id)}
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
