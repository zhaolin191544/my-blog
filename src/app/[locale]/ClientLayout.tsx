"use client";

import { usePathname } from "next/navigation";
import { GlobalMenu } from "@/src/components/GlobalMenu";
import { AnimatedLogo } from "@/src/components/AnimatedLogo";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTerminal = pathname?.endsWith("/terminal");

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

