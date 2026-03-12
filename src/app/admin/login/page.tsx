"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "登录失败");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] font-serif selection:bg-foam selection:text-carbon">
      <div className="w-full max-w-md px-6">
        <div className="rounded-2xl border border-enamel bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-carbon">管理后台</h1>
            <p className="mt-2 text-sm text-smoke font-sans">请输入账号密码以登录</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 font-sans">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-soot">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aluminum" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-enamel bg-[#fafafa] py-2.5 pl-10 pr-4 text-carbon placeholder-aluminum transition-colors focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-soot">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aluminum" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-enamel bg-[#fafafa] py-2.5 pl-10 pr-10 text-carbon placeholder-aluminum transition-colors focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-aluminum hover:text-smoke transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-500 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-amber py-2.5 font-medium text-white transition-all hover:bg-pumpkin disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
