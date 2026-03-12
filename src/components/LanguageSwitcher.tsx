"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import { Languages, Rss, Tv, Mic } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t_dialog = useTranslations("dialogs");
  const router = useRouter();
  const pathname = usePathname();
  
  const [podcastOpen, setPodcastOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const iconClass =
    "text-carbon/60 hover:text-carbon transition-all hover:scale-110 active:scale-95 flex items-center justify-center";

  const iconClass2 =
    "text-carbon/60 hover:text-carbon transition-all hover:scale-110 active:scale-95 flex items-center justify-center max-[767px]:hidden";

  return (
    <>
      <div className="absolute top-[47px] right-[170px] max-[767px]:right-[140px] z-50 flex items-center gap-5">
        {/* Podcast (Mic) Button */}
        <button onClick={() => setPodcastOpen(true)} className={iconClass2} title={t_dialog("podcast_title")}>
          <Mic size={22} strokeWidth={2} />
        </button>

        {/* Video (TV) Button */}
        <button onClick={() => setVideoOpen(true)} className={iconClass2} title={t_dialog("video_title")}>
          <Tv size={22} strokeWidth={2} />
        </button>

        {/* RSS Button (Now functional) */}
        <a 
          href="/api/rss" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={iconClass2} 
          title="RSS Feed"
        >
          <Rss size={20} strokeWidth={2.5} />
        </a>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLocale}
          className={iconClass}
          title={locale === "en" ? "Switch to Chinese" : "切换到英文"}
        >
          <Languages size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Podcast Dialog */}
      <Dialog open={podcastOpen} onOpenChange={setPodcastOpen}>
        <DialogContent className="font-serif border-enamel bg-[#fafafa] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal text-carbon flex items-center gap-3">
              {t_dialog("podcast_title")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <p className="text-smoke leading-relaxed text-sm whitespace-pre-line">
              {t_dialog("podcast_description")}
            </p>
            <p className="mt-4 text-xs text-aluminum italic">
              {t_dialog("podcast_footer")}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="font-serif border-enamel bg-[#fafafa] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal text-carbon flex items-center gap-3">
              {t_dialog("video_title")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <p className="text-smoke leading-relaxed text-sm whitespace-pre-line">
              {t_dialog("video_description")}
            </p>
            <p className="mt-4 text-xs text-aluminum italic">
              {t_dialog("video_footer")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
