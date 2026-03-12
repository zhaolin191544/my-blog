"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("loading_page");

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fafafa] p-6 text-center">
      <div className="relative flex max-w-md flex-col items-center gap-8">
        {/* Animated Loader */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-enamel"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-amber border-t-transparent"></div>
          {/* Inner pulse dot */}
          <div className="h-3 w-3 animate-pulse rounded-full bg-amber"></div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="animate-pulse font-serif text-2xl tracking-wide text-carbon">
            {t("title")}
          </h2>

          <p className="border-t border-enamel pt-5 font-serif text-sm leading-relaxed text-smoke opacity-80">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
