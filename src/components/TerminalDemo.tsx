"use client";

import { Terminal, TypingAnimation, AnimatedSpan } from "@/src/components/Terminal";
import { Link } from "@/src/i18n/routing";

export function TerminalDemo() {
  return (
    <Link
      href="/terminal"
      className="group relative w-full max-w-lg block transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Hover Overlay with Button */}
      <div className="absolute inset-0 z-10 bg-white/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-xl pointer-events-none">
        <div className="bg-[#1c1c1c] text-white px-6 py-3 rounded-full font-medium shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 border border-white/10">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Open Terminal
        </div>
      </div>

      <Terminal
        sequence={false}
        className="w-full max-w-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow relative"
      >
        <TypingAnimation delay={3000} duration={30}>
          &gt; initializing linlin-blog v1.500...
        </TypingAnimation>
        <AnimatedSpan delay={5000} className="text-[#28c840]">
          <span>{"\u2714"} Loading modules complete.</span>
        </AnimatedSpan>
        <AnimatedSpan delay={5300} className="text-[#28c840]">
          <span>{"\u2714"} Connecting to creative engine...</span>
        </AnimatedSpan>
        <AnimatedSpan delay={5400} className="text-[#28c840]">
          <span>{"\u2714"} Blog system ready.</span>
        </AnimatedSpan>
        <AnimatedSpan delay={5600} className="text-amber">
          <span>{"\u2714"} All systems operational.</span>
        </AnimatedSpan>
        <TypingAnimation delay={5300} duration={30} className="text-clay">
          &gt; click to open terminal!
        </TypingAnimation>
        <TypingAnimation
          delay={4500}
          duration={15}
          className="text-amber mt-4 block whitespace-pre"
        >
          {`lin {                             |
    name: "lin lin",              |
    gender: "male",               |
    age: 22,                      v
}                             hover below`}
        </TypingAnimation>
      </Terminal>
    </Link>
  );
}
