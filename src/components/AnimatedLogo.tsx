"use client";

import { usePathname } from "next/navigation";

export function AnimatedLogo() {
  const pathname = usePathname();
  // Check if it's the home page (root or localized root like /en, /zh)

  const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";
  return (
    <div
      className={`absolute top-7.5 left-8.5 max-[767px]:left-1.5 z-50 pointer-events-none ${!isHome ? "max-[767px]:hidden" : ""}`}
    >
      <svg
        viewBox="0 0 160 100"
        className="w-25 h-15 max-[767px]:w-20 max-[767px]:h-12 text-carbon/80 stroke-current drop-shadow-sm"
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <style>
          {`
            .logo-path {
              stroke-dasharray: 600;
              stroke-dashoffset: 600;
              /* Total duration 12s: 2.5s draw + 5s hold + 2.5s undraw + 2s pause */
              animation: draw-cycle 12s ease-in-out infinite;
            }
            .logo-dot {
              opacity: 0;
              animation: dot-cycle 12s ease-in-out infinite;
            }
            @keyframes draw-cycle {
              0% { stroke-dashoffset: 600; }
              20.8% { stroke-dashoffset: 0; }      /* 2.5s / 12s */
              62.5% { stroke-dashoffset: 0; }      /* (2.5 + 5)s / 12s */
              83.3% { stroke-dashoffset: 600; }    /* (2.5 + 5 + 2.5)s / 12s */
              100% { stroke-dashoffset: 600; }
            }
            @keyframes dot-cycle {
              0%, 15% { opacity: 0; }
              16.6%, 62.5% { opacity: 1; }         /* appears around 2s */
              70%, 100% { opacity: 0; }
            }
          `}
        </style>
        {/* 'l', 'i', 'n' body path */}
        <path
          className="logo-path"
          d="M 20,70 
             C 40,40 50,10 40,10 
             C 30,10 25,45 30,70 
             C 35,85 50,85 55,70 
             C 60,60 65,50 65,50 
             C 65,50 65,70 70,70 
             C 75,70 80,60 80,60 
             C 80,60 80,45 85,45 
             C 90,45 90,55 90,70 
             C 90,70 95,45 105,45 
             C 115,45 115,55 115,70 
             C 115,80 125,80 130,70"
        />
        {/* dot for 'i' */}
        <circle cx="65" cy="35" r="3.5" className="logo-dot" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
