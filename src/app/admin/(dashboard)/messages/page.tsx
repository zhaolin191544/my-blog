"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, MailOpen, Trash2, ShieldAlert, ShieldCheck, Inbox, MessageSquareReply } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  isSpam: boolean;
  read: boolean;
  reply?: string | null;
  repliedAt?: string | null;
  createdAt: string;
}

type TabType = "all" | "unread" | "spam";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab === "unread") params.set("read", "false");
      if (activeTab === "spam") params.set("spam", "true");
      if (activeTab === "all") params.set("spam", "false");

      const res = await fetch(`/api/messages?${params}`);
      const data = await res.json();
      setMessages(data);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkRead = async (id: string, read: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    fetchMessages();
  };

  const handleMarkSpam = async (id: string, isSpam: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isSpam }),
    });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定删除此留言？")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    fetchMessages();
  };

  const handleReply = async (id: string) => {
    if (!replyContent.trim()) return;
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: replyContent, read: true }),
    });
    alert("回复已保存！");
    fetchMessages();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: "all", label: "全部" },
    { key: "unread", label: "未读", count: unreadCount },
    { key: "spam", label: "垃圾" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">留言板</h1>
        <p className="mt-1 text-sm text-neutral-500">管理访客留言</p>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg border border-neutral-200 bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-amber-50 text-amber-700"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="space-y-2">
        {loading ? (
          <p className="py-12 text-center text-neutral-400">加载中...</p>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-neutral-400">
            <Inbox className="mb-2 h-12 w-12" />
            <p>暂无留言</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border bg-white transition-colors ${
                msg.read ? "border-neutral-200" : "border-amber-200 bg-amber-50/20"
              } ${msg.isSpam ? "border-red-200 bg-red-50/20" : ""}`}
            >
              <div
                className="flex cursor-pointer items-center gap-3 px-4 py-3"
                onClick={() => {
                  const isExpanding = expandedId !== msg.id;
                  setExpandedId(isExpanding ? msg.id : null);
                  if (isExpanding) {
                    setReplyContent(msg.reply || "");
                    if (!msg.read) handleMarkRead(msg.id, true);
                  }
                }}
              >
                <div className="shrink-0">
                  {msg.read ? (
                    <MailOpen className="h-5 w-5 text-neutral-300" />
                  ) : (
                    <Mail className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900">{msg.name}</span>
                    <span className="text-xs text-neutral-400">{msg.email}</span>
                    {msg.isSpam && (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">
                        垃圾
                      </span>
                    )}
                    {msg.reply && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                        已回复
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-neutral-500">{msg.content}</p>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">
                  {format(new Date(msg.createdAt), "MM-dd HH:mm")}
                </span>
              </div>

              {expandedId === msg.id && (
                <div className="border-t border-neutral-100 px-4 py-3">
                  <p className="whitespace-pre-wrap text-sm text-neutral-700">{msg.content}</p>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <label className="block text-xs font-medium text-neutral-500 mb-2">站长回复</label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="写下你的回复..."
                      className="w-full min-h-[80px] rounded-lg border border-neutral-200 p-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 resize-y"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleReply(msg.id)}
                        disabled={!replyContent.trim()}
                        className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm text-white hover:bg-amber-600 disabled:opacity-50"
                      >
                        <MessageSquareReply className="h-4 w-4" />
                        保存回复
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-3">
                    {msg.read ? (
                      <button
                        onClick={() => handleMarkRead(msg.id, false)}
                        className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50"
                      >
                        <Mail className="h-3 w-3" />
                        标为未读
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkRead(msg.id, true)}
                        className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50"
                      >
                        <MailOpen className="h-3 w-3" />
                        标为已读
                      </button>
                    )}
                    {msg.isSpam ? (
                      <button
                        onClick={() => handleMarkSpam(msg.id, false)}
                        className="flex items-center gap-1 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50"
                      >
                        <ShieldCheck className="h-3 w-3" />
                        非垃圾
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkSpam(msg.id, true)}
                        className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      >
                        <ShieldAlert className="h-3 w-3" />
                        标为垃圾
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      删除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
