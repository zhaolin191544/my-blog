"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface BlogComment {
  id: string;
  author: string;
  content: string;
  approved: boolean;
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
}

interface BlogCommentsProps {
  postId: string;
  initialComments: BlogComment[];
}

export function BlogComments({ postId, initialComments }: BlogCommentsProps) {
  const t = useTranslations("blog");
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !content.trim()) {
      setErrorMsg(t("comment_fill_fields"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: name, email, content }),
      });

      if (!res.ok) {
        setErrorMsg(t("comment_error"));
        return;
      }

      // All comments require admin approval, don't add to list
      setName("");
      setEmail("");
      setContent("");
      setSuccessMsg(t("comment_success"));
    } catch {
      setErrorMsg(t("comment_error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-16 pt-10 border-t border-enamel">
      {/* Section Title */}
      <h2 className="font-serif text-xl text-carbon mb-8">
        {t("comment_title")}
        <span className="text-cement text-sm ml-2">({comments.length})</span>
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-ash font-serif mb-1.5">
              {t("comment_name")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("comment_name_placeholder")}
              className="w-full px-3 py-2 border border-enamel rounded-md text-sm font-serif text-carbon bg-white focus:outline-none focus:border-ash transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-ash font-serif mb-1.5">
              {t("comment_email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("comment_email_placeholder")}
              className="w-full px-3 py-2 border border-enamel rounded-md text-sm font-serif text-carbon bg-white focus:outline-none focus:border-ash transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-ash font-serif mb-1.5">
            {t("comment_content")}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("comment_placeholder")}
            rows={4}
            className="w-full px-3 py-2 border border-enamel rounded-md text-sm font-serif text-carbon bg-white focus:outline-none focus:border-ash transition-colors resize-none"
          />
        </div>
        <p className="text-xs text-cement font-serif">{t("comment_email_privacy")}</p>

        {successMsg && (
          <p className="text-sm text-green-600 font-serif">{successMsg}</p>
        )}
        {errorMsg && (
          <p className="text-sm text-red-500 font-serif">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2 text-sm font-serif text-white bg-carbon hover:bg-soot rounded-md transition-colors disabled:opacity-50"
        >
          {submitting ? t("comment_submitting") : t("comment_submit")}
        </button>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-cement text-sm font-serif italic">
          {t("comment_empty")}
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-enamel flex items-center justify-center shrink-0">
                <span className="text-xs font-serif text-ash font-medium">
                  {comment.author.charAt(0).toUpperCase()}
                </span>
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-serif text-carbon font-medium">
                    {comment.author}
                  </span>
                  <span className="text-xs text-cement font-serif">
                    {format(new Date(comment.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <p className="text-sm font-serif text-dark leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>

                {/* Admin Reply */}
                {comment.reply && (
                  <div className="mt-3 ml-0 pl-3 border-l-2 border-amber/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-serif font-medium text-amber">
                        {t("comment_admin_tag")}
                      </span>
                      {comment.repliedAt && (
                        <span className="text-xs text-cement font-serif">
                          {format(new Date(comment.repliedAt), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-serif text-dark leading-relaxed whitespace-pre-wrap">
                      {comment.reply}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
