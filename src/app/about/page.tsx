import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-gray-200">
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Header 区域 */}
        <header className="mb-12 relative">
          {/* 返回按钮 */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            黑洞里
          </Link>

          {/* 封面图 */}
          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-sm">
            {/* 注意：请替换为你自己的图片路径 */}
            <Image
              src="/images/cover.jpg"
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 头像与个人信息 (使用负margin实现重叠效果) */}
          <div className="relative -mt-10 ml-4 flex items-end gap-4 z-10">
            <a href="mailto:your-email@example.com" className="group">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                  <Image
                    src="/images/avatar.png"
                    alt="Spike"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* 模仿原网页的交互：Hover显示名字 */}
                  <span className="font-bold text-lg bg-black text-white px-2 py-1 rounded">
                    Spike.
                  </span>
                </div>
              </div>
            </a>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main>
          <article className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8">
            {/* 左侧：日期 (Time) */}
            <aside className="text-gray-400 font-serif md:text-right pt-1">
              <time
                dateTime="2025-10-18"
                className="flex flex-row md:flex-col gap-2 md:gap-0 text-2xl md:text-3xl font-bold leading-none"
              >
                <span>19</span>
                <span className="text-sm md:text-lg font-normal uppercase tracking-wider">
                  Oct
                </span>
                <span className="text-sm md:text-base font-light text-gray-300">
                  2025
                </span>
              </time>
            </aside>

            {/* 右侧：正文 (Section) */}
            <section className="space-y-6 text-base leading-relaxed text-gray-700">
              <p>
                目前居住在深圳，最近热衷于写博客，
                <Link
                  href="#"
                  className="underline decoration-gray-300 hover:decoration-black hover:text-black underline-offset-4 transition-all"
                >
                  折腾博客
                </Link>
                ，以及
                <Link
                  href="#"
                  className="underline decoration-gray-300 hover:decoration-black hover:text-black underline-offset-4 transition-all"
                >
                  折腾 Emacs
                </Link>
                和学习 LLM 的使用。
              </p>

              <p>
                随着年纪渐长，工作占据了大多的时间，锻炼也少，身体每况愈下，今年的目标就是好好睡觉，多锻炼。现在主要就是跑步，一边跑一边听播客，我比较喜欢听这几个：
              </p>

              <ul className="list-disc pl-5 space-y-1 marker:text-gray-300">
                {[
                  "内核恐慌",
                  "虚实之间 True Imagination",
                  "Nice Try",
                  "独树不成林",
                  "罗永浩的十字路口",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-blue-600 hover:underline transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <p>
                喜欢咖啡，会用摩卡壶做拿铁或者手冲。喜欢喝茶，例如三得利的乌龙茶。喜欢喝啤酒，但是最近体检结果不好，要尽量不喝。
              </p>

              <p>
                很喜欢{" "}
                <Link href="#" className="link-style">
                  听歌
                </Link>
                ，最近喜欢听整张的{" "}
                <Link href="#" className="link-style">
                  专辑
                </Link>
                ，有喜欢的乐队来到深圳也会去听听 live。
              </p>

              <p>
                喜欢上网冲浪看各种文章，然后整理到博客的{" "}
                <Link href="#" className="link-style">
                  Zine
                </Link>{" "}
                中。
              </p>

              <p>偶尔也会玩玩游戏，现在主要在玩空洞骑士。</p>

              <p className="border-l-4 border-gray-200 pl-4 italic text-gray-500">
                前端开发工程师，擅长 Web 开发，待业中。
              </p>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
