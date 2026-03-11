"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Zap,
  BookOpen,
  Camera,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "仪表盘" },
  { href: "/admin/blogs", icon: FileText, label: "博客文章" },
  { href: "/admin/shorts", icon: Zap, label: "短内容" },
  { href: "/admin/novels", icon: BookOpen, label: "小说" },
  { href: "/admin/photos", icon: Camera, label: "照片" },
  { href: "/admin/mrs-zhao", icon: Heart, label: "Mrs. Zhao" },
  { href: "/admin/messages", icon: MessageSquare, label: "留言板" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-neutral-200 bg-white transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
        {!collapsed && (
          <h1 className="text-lg font-bold text-neutral-900">
            <span className="text-amber-500">✦</span> Admin
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-amber-50 text-amber-600"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn("h-5 w-5 shrink-0", active ? "text-amber-500" : "text-neutral-400")}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-neutral-200 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
          title={collapsed ? "退出登录" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0 text-neutral-400" />
          {!collapsed && <span>退出登录</span>}
        </button>
      </div>
    </aside>
  );
}
