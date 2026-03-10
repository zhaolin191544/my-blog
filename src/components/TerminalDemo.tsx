"use client";

import { Terminal, TypingAnimation, AnimatedSpan } from "@/src/components/Terminal";

export function TerminalDemo() {
  return (
    <Terminal className="w-full max-w-lg">
      <TypingAnimation duration={30}>&gt; initializing linlin-blog v1.500...</TypingAnimation>
      <AnimatedSpan delay={500} className="text-[#28c840]">
        <span>{"\u2714"} Loading modules complete.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={400} className="text-[#28c840]">
        <span>{"\u2714"} Connecting to creative engine...</span>
      </AnimatedSpan>
      <AnimatedSpan delay={400} className="text-[#28c840]">
        <span>{"\u2714"} Blog system ready.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={400} className="text-amber">
        <span>{"\u2714"} All systems operational.</span>
      </AnimatedSpan>
      <TypingAnimation delay={400} duration={30} className="text-clay">
        &gt; welcome aboard!
      </TypingAnimation>
      <TypingAnimation delay={800} duration={15} className="text-amber mt-4 block whitespace-pre">
        {`lin {                             |
    name: "lin lin",              |
    gender: "male",               |
    age: 22,                      v
}                             hover below`}
      </TypingAnimation>
    </Terminal>
  );
}
