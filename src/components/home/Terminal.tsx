"use client";

import { cn } from "@/src/lib/utils";
import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

// Sequence context for coordinating child animations
const SequenceContext = createContext<{
  registerChild: (delay: number) => number;
  startOnView: boolean;
  inView: boolean;
}>({
  registerChild: () => 0,
  startOnView: true,
  inView: false,
});

interface TerminalProps {
  children: ReactNode;
  className?: string;
  sequence?: boolean;
  startOnView?: boolean;
}

export function Terminal({
  children,
  className,
  sequence = true,
  startOnView = true,
}: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const cumulativeDelay = useRef(0);

  const registerChild = (delay: number) => {
    if (!sequence) return delay;
    const currentDelay = cumulativeDelay.current;
    cumulativeDelay.current += delay;
    return currentDelay;
  };

  return (
    <SequenceContext.Provider value={{ registerChild, startOnView, inView }}>
      <div
        ref={ref}
        className={cn("rounded-xl border border-aluminum bg-white max-w-lg w-full", className)}
      >
        <div className="flex items-center gap-2 border-b border-aluminum p-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-soot font-inherit grid gap-1">{children}</code>
        </pre>
      </div>
    </SequenceContext.Provider>
  );
}

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: keyof typeof motion;
}

export function TypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const { registerChild, startOnView, inView } = useContext(SequenceContext);

  const effectiveDelay = registerChild(delay + children.length * duration);

  useEffect(() => {
    if (startOnView && !inView) return;

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, effectiveDelay);

    return () => clearTimeout(startTimeout);
  }, [effectiveDelay, startOnView, inView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [started, children, duration]);

  return (
    <span className={cn("", className)}>
      {displayedText}
      {started && displayedText.length < children.length && (
        <span className="animate-[blink_1s_infinite_steps(1)]">|</span>
      )}
    </span>
  );
}

interface AnimatedSpanProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSpan({ children, delay = 0, className, ...props }: AnimatedSpanProps) {
  const { registerChild, startOnView, inView } = useContext(SequenceContext);
  const effectiveDelay = registerChild(delay);

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={!startOnView || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: effectiveDelay / 1000 }}
      className={cn("", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
