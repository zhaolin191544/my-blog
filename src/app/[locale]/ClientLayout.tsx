"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { GlobalMenu } from "@/src/components/GlobalMenu";
import { AnimatedLogo } from "@/src/components/AnimatedLogo";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isTerminal = pathname?.endsWith("/terminal");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      {!isTerminal && (
        <>
          <AnimatedLogo />
          <GlobalMenu />
        </>
      )}
      {children}
    </>
  );
}
