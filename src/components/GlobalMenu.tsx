"use client";

import { useTranslations } from "next-intl";
import { StaggeredMenu } from "./StaggeredMenu/StaggeredMenu";

export function GlobalMenu() {
  const t = useTranslations("navigation");

  return (
    <StaggeredMenu
      items={[
        { label: t("home"), href: "/" },
        { label: t("about"), href: "/about" },
        { label: t("blog"), href: "/blog" },
        { label: t("shorts"), href: "/shorts" },
        { label: t("novel"), href: "/novel" },
        { label: t("mrs_zhao"), href: "/mrs-zhao" },
        { label: t("messages"), href: "/messages" },
        { label: t("photo"), href: "/photos" },
        { label: t("terminal"), href: "/terminal" },
        { label: t("admin"), href: "/admin" },
      ]}
      socialItems={[
        { label: "Telegram", href: "https://t.me/szuLin" },
        { label: "Mail", href: "mailto:zhaolin191544@gmail.com" },
      ]}
      position="right"
      accentColor="#ffa133"
      colors={["#bccabb", "#ffa133"]}
    />
  );
}
