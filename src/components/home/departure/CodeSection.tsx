"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Printout } from "./Printout";

const reportZh = `\
# Lin's Blog \u2014 \u7AD9\u70B9\u5F00\u53D1\u62A5\u544A                                              v1.500

作者: Lin
发布日期: 2026.03
网站状态: 不定期维护，作者很懒很懒

---

## 技术架构

这个博客是从老的博客迁移了部分内容过来，UI方面进行了全盘的推倒和重来，
老博客使用的是Vue3，现在我改用了NextJs作为一个全栈的框架。
同样，个人开发难免有很多的瑕疵，尽请包容。
这个项目用了很多比较新潮的东西，比如说bun，没用eslint改用了oxlint，没用preitter改用了oxfmt
因为对于尤大的无条件信任

\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 层级                 \u2502 \u6280\u672F             \u2502 \u5907\u6CE8                              \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 \u6846\u67B6                  \u2502 Next.js 16      \u2502 App Router + React 19            \u2502
\u2502 \u6837\u5F0F                  \u2502 Tailwind CSS 4  \u2502 \u81EA\u5B9A\u4E49\u8272\u5F69\u7CFB\u7EDF amber/carbon       \u2502
\u2502 \u6570\u636E\u5E93                \u2502 PostgreSQL      \u2502 Prisma 7 ORM                     \u2502
\u2502 \u56FD\u9645\u5316                \u2502 next-intl       \u2502 \u4E2D/\u82F1\u53CC\u8BED                         \u2502
\u2502 3D/\u52A8\u753B               \u2502 Three.js        \u2502 R3F + Rapier \u7269\u7406\u5F15\u64CE            \u2502
\u2502 \u5BCC\u6587\u672C\u7F16\u8F91\u5668           \u2502 TipTap          \u2502 \u7ED9\u8D75\u5973\u58EB\u7279\u5236\u7684                    \u2502
\u2502 \u8BA4\u8BC1                  \u2502 jose + bcrypt   \u2502 JWT \u4F1A\u8BDD                         \u2502
\u2502 \u90AE\u4EF6                  \u2502 Nodemailer      \u2502 Gmail SMTP \u56DE\u590D\u901A\u77E5               \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

## 博客内容组成

作为一个个人项目，里面藏了很多的彩蛋，不知道你能不能发现，也不知道你喜不喜欢这种风格。:

a) 博客   —— 一些比较长一点儿整理下来的文字，目前正在迁移老博客的内容，支持Markdown和Html，并且带评论和目录
b) 留言板 —— 一个非及时聊天看板，可以给我发一些悄悄话，我会回复，有邮件通知
c) 碎碎念 —— 平时一些细碎的不支持整理成博客的内容，当成是一个自己的树洞
d) 照片   —— 很多记忆的定格
e) 小说   —— 一些来自生活素材的改造，所思所想，长篇或者短篇都有，当然是如果我写了的话
f) 赵女士 —— 一个神奇的板块
g) 终端   —— 里面有很多隐藏玩法，尝试探索一下吧
h) 后台   —— 我的真后台，主要是做博客的内容管理，当然也只有我能进去

## 架构设计

采用前后端一体的架构，Next.js 应用路由器采用单一代码库实现全栈开发，处理所有路由。
每个页面都通过 [locale] 动态路由进行中英文切换。
后台管理有个神秘的CMS
包含 9 个数据模型、24 个 API 接口和 44 个组件。
用了蛮多的Three.js和一些其他动画库，魔改了一些以前收藏的组件，很多都不是React的，
用React重构了一下。如果你感觉卡卡的，不是你的设备性能不好，是我的技术不好没有优化好。

## 开发时间线

2024     老博客落地
2024.12  嘴上说要马上重构博客，实际什么都没做
2025.05  老博客不堪受辱下线
2025后续 继续嘴上说要重构，实际什么都没做
2026.1-2 思考构思阶段，翻了很多以前收藏的好的UI设计，准备开始动手
2026.3   正式动手，推翻重来

## 后记

写这个站的时候我在求职，为什么时间如此紧还要做这个呢。一方面这个确实是我一直的心愿，就好像自己的孩子一样，
我希望他能够健康落地。另一方面，在制作的过程中，我承认有一些地方比较炫技，打算把简历里面的项目写的更加高级一
点儿,有点儿华而不实的感觉，但比起一开始的不华而不实，至少稍微华了一些。另外要鸣谢一位C开头的老师和一位Ge开头
的老师，没有二位鼎力相助没办法这么快完成。不过二老也有点儿让我觉得职场越来越不需要我，做的过程中赵女士给我打
了电话，问我学校里的事情忙的顺利与否。有时候真感觉自己好像一下被人推了一把，突然就要面对社会了。这几天真的好
焦虑，也不对，应该是越来越焦虑了，经常性昼夜颠倒睡不着觉。赵女士依然劝我还是回去考公吧，我望着自己之前拒绝的
决定，心里是比较后悔的，但是也没办法，既来之则安之，也许只有把自己推上绝路了才可能真的拼一把。 我好焦虑啊:(

感谢你能看到这里，我的朋友！来给我留言吧，如果你有什么想说的:)
`;

const reportEn = `\
# Lin's Blog \u2014 Site Development Report                                      v1.500

AUTHOR: Lin
DATE: 2026.03
STATUS: Maintained irregularly, the author is very very lazy

---

## TECH STACK

This blog migrated some content from the old blog, and the UI was completely torn down and rebuilt.
The old blog used Vue3, and now I switched to Next.js as a full-stack framework.
Also, as a personal project, it inevitably has many flaws, please bear with me.
This project uses a lot of trendy things, such as bun, switched to oxlint instead of eslint,
switched to oxfmt instead of prettier, all because of the unconditional trust in Evan You.

\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Layer                \u2502 Tech            \u2502 Notes                             \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Framework            \u2502 Next.js 16      \u2502 App Router + React 19             \u2502
\u2502 Styling              \u2502 Tailwind CSS 4  \u2502 Custom palette: amber/carbon      \u2502
\u2502 Database             \u2502 PostgreSQL      \u2502 Prisma 7 ORM                      \u2502
\u2502 i18n                 \u2502 next-intl       \u2502 Chinese / English                 \u2502
\u2502 3D / Animation       \u2502 Three.js        \u2502 R3F + Rapier physics              \u2502
\u2502 Rich Text Editor     \u2502 TipTap          \u2502 Custom-built for Mrs. Zhao        \u2502
\u2502 Auth                 \u2502 jose + bcrypt   \u2502 JWT sessions                      \u2502
\u2502 Email                \u2502 Nodemailer      \u2502 Gmail SMTP reply notifications    \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

## BLOG CONTENT STRUCTURE

As a personal project, there are many easter eggs hidden inside. I don't know if you can find them,
and I don't know if you like this style:

a) Blog       \u2014 Some longer, organized texts. Currently migrating content from the old blog.
                Supports Markdown and Html, with comments and TOC.
b) Guestbook  \u2014 An asynchronous chat board. You can send me whispers, I will reply, and there
                are email notifications.
c) Shorts     \u2014 Fragmented thoughts that aren't suited for a full blog post, treated as my
                personal tree hole.
d) Photos     \u2014 Freeze-frames of many memories.
e) Novel      \u2014 Adaptations from life materials, thoughts and reflections, both long and short
                stories, if I ever write them of course.
f) Mrs. Zhao  \u2014 A magical section.
g) Terminal   \u2014 There are many hidden features inside, try to explore it.
h) Admin      \u2014 My real backend, mainly for blog content management, and of course only I can access it.

## ARCHITECTURE DESIGN

Adopts a unified frontend and backend architecture, Next.js App Router implements full-stack
development with a single codebase, handling all routing. Every page goes through [locale]
dynamic routes for Chinese/English switching. The admin panel has a mysterious CMS.
Contains 9 data models, 24 API endpoints, and 44 components.
Used a lot of Three.js and some other animation libraries, heavily modified some previously
collected components, many of which were not React-based, and refactored them with React.
If you feel it's laggy, it's not your device's poor performance, it's my poor skills and lack
of optimization.

## DEVELOPMENT TIMELINE

2024     Old blog launched
2024.12  Talked about refactoring the blog immediately, actually did nothing
2025.05  Old blog went offline from humiliation
2025+    Continued to talk about refactoring, actually did nothing
2026.1-2 Thinking and conceptualizing phase, flipped through many previously collected good
         UI designs, ready to start
2026.3   Officially started, tore down and rebuilt

## AFTERWORD

I was job hunting when I wrote this site. Why do this when time is so tight? On one hand,
this has always been my wish, just like my own child, I hope it can land healthily. On the
other hand, during the production process, I admit that I showed off my skills in some places,
intending to make the projects on my resume look more advanced, a bit flashy but lacking
substance. But compared to the initial lack of both, at least it's a bit more flashy now.
I also want to thank a teacher starting with C and a teacher starting with Ge. Without their
great help, I couldn't have finished it so quickly. However, the two teachers also made me feel
that the workplace needs me less and less. During the process, Mrs. Zhao called me and asked
if things at school were going smoothly. Sometimes I really feel like I've been pushed from behind,
suddenly having to face society. I've been really anxious these days, no, I should say I'm
getting more and more anxious, frequently reversing day and night and unable to sleep.
Mrs. Zhao still advised me to go back and take the civil service exam. Looking at the decision
I refused before, I regret it a bit in my heart, but there's nothing I can do. Since I'm here,
I might as well settle down. Maybe only by pushing myself to a dead end can I really fight for it.
I'm so anxious :(

Thank you for reading this far, my friend! Come leave me a message if you have anything to say :)
`;

export function CodeSection() {
  const t = useTranslations("codeSection");
  const locale = useLocale();
  const report = locale === "zh" ? reportZh : reportEn;

  return (
    <div className="relative w-full pt-12 overflow-visible">

      <div className="w-full flex flex-col lg:flex-row items-stretch relative z-30">

        {/* Left side: bounded to match the max-w-360 layout */}
        <div className="w-full lg:w-[50%] flex justify-end pl-11 pr-11 lg:pr-0 max-[767px]:px-4">
          <div className="w-full max-w-[680px] lg:pr-10">
             <img src="/assets/lily.png" alt="Decoration" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Right side: takes the rest of the screen */}
        <div className="w-full lg:w-[50%] flex flex-col pt-12 lg:pt-0">

          <div className="w-full max-w-[680px] pl-11 pr-11 lg:pl-10 lg:pr-11 max-[767px]:px-4 mb-12 lg:mb-16">
            <p className="text-mud text-[16px] xl:text-[20px] whitespace-pre font-bold tracking-widest leading-loose">
              {"\u2591"}
              {"  "}{t("tagline1")}
              <br />
              {"\u2591"}
              {"  "}{t("tagline2")}
              <br />
              {"\u2591"}
              {"  "}{t("tagline3")}
            </p>
          </div>

          <div className="w-full max-w-[680px] pl-11 pr-11 lg:pl-10 lg:pr-11 max-[767px]:px-4 mb-12 lg:mb-16 flex justify-start">
            <img
              className="w-75 xl:w-100 pointer-events-none opacity-100 hover:scale-105 transition-transform"
              src="/assets/sql.svg"
              alt="SQL"
            />
          </div>

          {/* 3. Printout: extends to the right edge and bottom! */}
          <div className="w-full flex-grow flex items-end justify-end bg-transparent relative pl-11 max-[767px]:pl-4 lg:pl-10">
            <div className="w-full flex bg-white shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)]">
              <Printout
                className="w-full h-auto text-carbon block"
                color="white"
                foreignObjectProps={{ width: 942, height: 648 }}
              >
                <pre
                  className="relative pt-17.5 px-[5%] max-[767px]:px-[4%] max-[767px]:pt-15 max-[767px]:select-none max-[767px]:pointer-events-none font-mono"
                  contentEditable
                  suppressContentEditableWarning
                  spellCheck={false}
                  style={{
                    fontSize: "clamp(12px, 1.2vw, 18px)",
                    lineHeight: "1.7",
                    height: "100%",
                    overflow: "auto",
                    margin: 0
                  }}
                >
                  {report}
                </pre>
              </Printout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
