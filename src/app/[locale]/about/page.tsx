import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

export default function About() {
  const t = useTranslations("about");

  return (
    <>
      <LanguageSwitcher />
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
            <Link href="/" className="text-[aliceblue]! max-[767px]:hidden">
              {t("home_link")}
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
                {t("chat_prompt")}
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
                <span>{t("poem_line1")}</span>
                <span>{t("poem_line2")}</span>
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
              <p>{t("intro_p1")}</p>
              <p>{t("intro_p2")}</p>
              <p>{t("intro_p3")}</p>

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
                  <em>{t("podcast_note")}</em>
                </li>
                <li>
                  <del>知乎用户Carl</del>
                  <em>{t("zhihu_note")}</em>
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

              <p>{t("tv_shows_intro")}</p>
              <ul className="my-[0.65em] list-disc pl-[2em]">
                <li>
                  Shameless <em>{t("shameless_note")}</em>
                </li>
                <li>First Love</li>
                <li>Queen&apos;s Gambit</li>
                <li>Better Call Saul</li>
              </ul>
              <p>{t("drinks_note")}</p>
              <p>{t("career_note")}</p>
            </section>

            <time dateTime="2022-6-30">
              30
              <br />
              Jun
              <br />
              2022
            </time>
            <section>
              <p>{t("hometown_p1")}</p>
              <p>{t("hometown_p2")}</p>
            </section>
          </article>
        </main>
      </section>
    </>
  );
}
