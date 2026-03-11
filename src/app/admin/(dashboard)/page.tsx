import { prisma } from "@/src/lib/prisma";
import { FileText, Zap, BookOpen, Camera, MessageSquare, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [
    blogCount,
    publishedBlogCount,
    commentCount,
    pendingCommentCount,
    shortCount,
    novelCount,
    photoCount,
    messageCount,
    unreadMessageCount,
    mrsZhaoCount,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogComment.count(),
    prisma.blogComment.count({ where: { approved: false } }),
    prisma.short.count(),
    prisma.novel.count(),
    prisma.photo.count(),
    prisma.message.count({ where: { isSpam: false } }),
    prisma.message.count({ where: { read: false, isSpam: false } }),
    prisma.mrsZhaoArticle.count(),
  ]);

  return {
    blogCount,
    publishedBlogCount,
    commentCount,
    pendingCommentCount,
    shortCount,
    novelCount,
    photoCount,
    messageCount,
    unreadMessageCount,
    mrsZhaoCount,
  };
}

const statCards = [
  {
    key: "blog",
    label: "博客文章",
    icon: FileText,
    href: "/admin/blogs",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    key: "comment",
    label: "评论",
    icon: MessageCircle,
    href: "/admin/blogs",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    key: "short",
    label: "短内容",
    icon: Zap,
    href: "/admin/shorts",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    key: "novel",
    label: "小说",
    icon: BookOpen,
    href: "/admin/novels",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    key: "photo",
    label: "照片",
    icon: Camera,
    href: "/admin/photos",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    key: "message",
    label: "留言",
    icon: MessageSquare,
    href: "/admin/messages",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    key: "mrsZhao",
    label: "Mrs. Zhao",
    icon: Heart,
    href: "/admin/mrs-zhao",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

export default async function DashboardPage() {
  const stats = await getStats();

  const getCount = (key: string) => {
    switch (key) {
      case "blog":
        return stats.blogCount;
      case "comment":
        return stats.commentCount;
      case "short":
        return stats.shortCount;
      case "novel":
        return stats.novelCount;
      case "photo":
        return stats.photoCount;
      case "message":
        return stats.messageCount;
      case "mrsZhao":
        return stats.mrsZhaoCount;
      default:
        return 0;
    }
  };

  const getSubtext = (key: string) => {
    switch (key) {
      case "blog":
        return `${stats.publishedBlogCount} 已发布`;
      case "comment":
        return `${stats.pendingCommentCount} 待审核`;
      case "message":
        return `${stats.unreadMessageCount} 未读`;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">仪表盘</h1>
        <p className="mt-1 text-sm text-neutral-500">欢迎回来，这是你的博客概览</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          const count = getCount(card.key);
          const subtext = getSubtext(card.key);

          return (
            <Link
              key={card.key}
              href={card.href}
              className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900">{count}</p>
                  {subtext && <p className="mt-1 text-xs text-neutral-400">{subtext}</p>}
                </div>
                <div
                  className={`rounded-xl ${card.bg} p-3 transition-transform group-hover:scale-110`}
                >
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">快捷操作</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          >
            + 新建博客
          </Link>
          <Link
            href="/admin/shorts"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            + 发布短内容
          </Link>
          <Link
            href="/admin/novels/new"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            + 新建小说
          </Link>
          <Link
            href="/admin/photos"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            + 上传照片
          </Link>
          <Link
            href="/admin/mrs-zhao"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            + Mrs. Zhao 文章
          </Link>
        </div>
      </div>
    </div>
  );
}
