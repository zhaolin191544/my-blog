"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

export default function CommentsPage() {
  const params = useParams();
  const postId = params.id as string;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${postId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleApprove = async (commentId: string, approved: boolean) => {
    await fetch(`/api/blogs/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    fetchComments();
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("确定要删除这条评论吗？")) return;
    await fetch(`/api/blogs/${postId}/comments/${commentId}`, {
      method: "DELETE",
    });
    fetchComments();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/blogs"
          className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">评论管理</h1>
          <p className="text-sm text-neutral-500">
            共 {comments.length} 条评论
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="py-12 text-center text-neutral-400">加载中...</p>
        ) : comments.length === 0 ? (
          <p className="py-12 text-center text-neutral-400">暂无评论</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`rounded-xl border bg-white p-4 ${
                comment.approved
                  ? "border-neutral-200"
                  : "border-amber-200 bg-amber-50/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900">
                      {comment.author}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {comment.email}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        comment.approved
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {comment.approved ? "已通过" : "待审核"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    {comment.content}
                  </p>
                  <p className="mt-2 text-xs text-neutral-400">
                    {format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {!comment.approved && (
                    <button
                      onClick={() => handleApprove(comment.id, true)}
                      className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500"
                      title="通过"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  {comment.approved && (
                    <button
                      onClick={() => handleApprove(comment.id, false)}
                      className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-amber-50 hover:text-amber-500"
                      title="撤回"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    title="删除"
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
