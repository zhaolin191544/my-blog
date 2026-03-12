"use client";

import { useTranslations } from "next-intl";

export function WelcomeContent() {
  const t = useTranslations("welcome");

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-[48px] max-[1115px]:text-[36px] max-[767px]:text-[28px] text-soot leading-tight text-ash/60 italic font-serif">
        HOLA My Friends
        <span className="animate-wave ml-3 text-[52px] max-[767px]:text-[32px] inline-block">
          👋
        </span>
      </h2>
      <div className="text-dark text-[18px] max-[767px]:text-[16px] leading-[1.8] max-w-[560px] flex flex-col gap-4 font-serif">
        <p>&emsp;&emsp;{t("p1")}</p>
        <p>&emsp;&emsp;{t("p2")}</p>
        <p>&emsp;&emsp;{t("p3")}</p>
        <p>&emsp;&emsp;{t("p4")}</p>
      </div>
    </div>
  );
}
