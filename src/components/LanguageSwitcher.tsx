"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import { Languages, Rss, Tv, Mic } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const iconClass = "text-carbon/60 hover:text-carbon transition-all hover:scale-110 active:scale-95 flex items-center justify-center";

  return (
    <div className="fixed top-[47px] right-[170px] max-[767px]:right-[110px] z-50 flex items-center gap-5">
      {/* Podcast (Mic) Button (UI Only) */}
      <button className={iconClass} title="Podcast">
        <Mic size={22} strokeWidth={2} />
      </button>

      {/* Video (TV) Button (UI Only) */}
      <button className={iconClass} title="Videos">
        <Tv size={22} strokeWidth={2} />
      </button>

      {/* RSS Button (UI Only) */}
      <button className={iconClass} title="RSS Feed">
        <Rss size={20} strokeWidth={2.5} />
      </button>

      {/* Language Switcher Button */}
      <button
        onClick={toggleLocale}
        className={iconClass}
        title={locale === "en" ? "Switch to Chinese" : "切换到英文"}
      >
        <Languages size={24} strokeWidth={2} />
      </button>
    </div>
  );
}
