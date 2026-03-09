import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <>
      <style>{`
        @keyframes bounce-x {
          from { transform: translateX(5px); }
          to   { transform: translateX(0); }
        }

        .now-page a {
          color: #2e2e2e;
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-thickness: 1px;
          text-underline-offset: 5px;
        }

        .now-page header a {
          text-decoration: none;
        }

        @media (pointer: fine) and (hover: hover) {
          .now-page a:hover {
            text-decoration: none;
            background: #0077aa;
            color: #fff;
          }
          .now-page header a.profile-link:hover {
            background: transparent;
            color: inherit;
          }
        }

        .now-page p {
          margin-block: 0.65em;
        }

        .now-page article section > p:first-child {
          margin-block-start: 0;
        }
      `}</style>
      <section
        className="now-page mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-250
              bg-transparent dark:bg-[#232323]
              font-serif text-[#2e2e2e] dark:text-[aliceblue]
              leading-normal wrap-break-word
              transition-colors duration-300
              "
        style={{ fontSize: "clamp(16px, 2vw + 10px, 24px)" }}
      >
        <header className="relative">
          <span className="absolute left-[1em] top-[1em] z-10">
            <Link href="/" className="text-[aliceblue]!">
              ⇦ Home
            </Link>
          </span>
          <Image
            src="/about/cover.jpg"
            alt="cover"
            width={1920}
            height={1080}
            className="w-full object-cover max-h-[44vh]"
            priority
          />

          <a href="mailto:zhaolin191544@gmail.com" className="profile-link group">
            <div
              className="absolute bottom-0 right-[1em] z-1
              flex translate-y-[2em] items-center gap-[0.5em]"
            >
              <span
                className="absolute right-full me-[1em] bottom-[2em]
              hidden w-max text-[1.2em] text-[#b8b8b8]
              group-hover:inline-block"
                style={{
                  animation: "bounce-x 0.8s ease-in infinite alternate-reverse",
                }}
              >
                想和我聊聊天？☞
              </span>
              <span className="text-[aliceblue] text-[2em] translate-y-[-0.4em]">Lin</span>

              <Image
                src="/about/avatar.jpg"
                alt="lin"
                width={100}
                height={100}
                className="h-[5em] w-[5em] rounded-[0.5em]"
              />

              <div className="absolute right-0 top-full text-[1em] text-[#787878] dark:text-[#b8b8b8] flex flex-col items-end w-max mt-1">
                <span>横玉声中吹满地,</span>
                <span>好枝长恨无人寄.</span>
              </div>
            </div>
          </a>
        </header>

        <main className="mt-[5em]">
          <article className="grid grid-cols-[max-content_auto] gap-[0.5em] px-[1em]">
            <time dateTime="2026-3-7">
              7
              <br />
              Mar
              <br />
              2026
            </time>

            <section>
              <p>目前在深圳读本科，渴望逃离这里。</p>
              <p>ISFP 佛系、冷清、孤独 但也同时很期待朋友。</p>
              <p>
                爱好广泛，顶级美食家。喜欢踢足球，听音乐，读be小说，玩游戏，跑步，听播客，寻觅各种各样的美食。超级大p人，渴望自由，做一些看起来没有意义的事情。以下是一些我很喜欢的东西或者是你可以找到我的地方：
              </p>

              <ul className="my-[0.65em] list-disc pl-[2em]">
                <li>
                  <a
                    href="https://open.spotify.com/artist/1QAJqy2dA3ihHBFIHRphZj?si=_Oqf26BFQtCdHTxgewVJTQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cigarettes After Sex
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.spotify.com/artist/7lbSsjYACZHn1MSDXPxNF2?si=_UL17THvSqKZIBCxiXVcEQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    宇多田光
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa?si=kIk8rOQRSHKL5kiVJ0OOUg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lana Del Rey
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.spotify.com/show/4Anol9oYw2uC01O2EWwois?si=84ee17daad7642a1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    蛇蛇幹話
                  </a>
                  <em> （喜欢的一档播客节目 坐飞机必听）</em>
                </li>
                <li>
                  <del>知乎用户Carl</del>
                  <em> (已被“网暴”至注销)</em>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/profiles/76561199396616962/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    0x103
                  </a>
                </li>
                <li>
                  <a
                    href="https://space.bilibili.com/3493117720267715?spm_id_from=333.1007.0.0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    哈喽呢呢呢
                  </a>
                </li>
              </ul>

              <p>我还喜欢看美剧或者是亚洲这边的一些迷你剧，以下是我比较喜欢的一些：</p>
              <ul className="my-[0.65em] list-disc pl-[2em]">
                <li>
                  Shameless <em>(对我的性格再次塑造有一定的影响)</em>
                </li>
                <li>First Love</li>
                <li>Queen&apos;s Gambit</li>
                <li>Better Call Saul</li>
              </ul>
              <p>喜欢喝奶茶、咖啡、茶。过去有段时间对于烟的依赖很大，现在好多了。</p>
              <p>前端练习生，学习Web开发，待业中。</p>
            </section>

            <time dateTime="2022-6-30">
              30
              <br />
              Jun
              <br />
              2022
            </time>
            <section>
              <p>江苏省南通市，长大的地方。</p>
              <p>爱我的支持我的家人，很好的朋友，青涩的爱情，随着慢慢长大，一些成为了过去式...</p>
            </section>
          </article>
        </main>
      </section>
    </>
  );
}
