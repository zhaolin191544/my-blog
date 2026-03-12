"use client";

import { useEffect, useState, useCallback } from "react";

const LINLINS = "LINLIN'S";
const BLOG = "BLOG~";
const COGNATES: Record<string, string> = {
  L: "1\u0141",
  I: "!\u0130",
  N: "\u019D",
  "'": "`",
  S: "5\u00A7$",
  B: "8\u0392",
  O: "0",
  G: "6",
  "~": "-\u223C",
};

function randomSample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNatural(max: number): number {
  return Math.floor(Math.random() * max);
}

function glitchWord(original: string, odds: number[]): string {
  const swaps = randomSample(odds);
  if (swaps === 0) return original;

  const glitched = [...original];
  const indices = Array.from({ length: original.length }, (_, i) => i).sort(
    () => Math.random() - 0.5,
  );
  for (let i = 0; i < swaps && i < indices.length; i++) {
    const idx = indices[i];
    const candidates = COGNATES[original[idx]] ?? original[idx];
    glitched[idx] = randomSample([...candidates]);
  }

  return glitched.join("");
}

export function GlitchTitle() {
  const MIN_DELAY = 400;
  const MAX_DELAY = 2000;
  const GLITCH_CHANCE = 0.1;
  const GLITCH_DELAY = 30;

  const [linlins, setLinlins] = useState(LINLINS);
  const [space, setSpace] = useState(" ");
  const [blog, setBlog] = useState(BLOG);

  const runLinlins = useCallback(() => {
    function d() {
      setLinlins(glitchWord(LINLINS, [0, 0, 0, 1, 1, 2, 2, 2, 3]));
      if (Math.random() < GLITCH_CHANCE) {
        const delay = randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const glitched = glitchWord(LINLINS, [2, 3, 4, 4, 5, 5, 5, 6, 6]);
        setTimeout(() => setLinlins(LINLINS), delay);
        setTimeout(() => setLinlins(glitched), delay + GLITCH_DELAY);
        setTimeout(() => setLinlins(LINLINS), delay + GLITCH_DELAY * 2);
        setTimeout(() => setLinlins(glitched), delay + GLITCH_DELAY * 3);
        setTimeout(d, delay + GLITCH_DELAY * 4);
      } else {
        setTimeout(d, randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
      }
    }
    d();
  }, []);

  const runSpace = useCallback(() => {
    function s() {
      setSpace(glitchWord(" ", [0, 1, 1]));
      setTimeout(s, randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
    }
    s();
  }, []);

  const runBlog = useCallback(() => {
    function m() {
      setBlog(glitchWord(BLOG, [0, 0, 0, 1, 1, 2, 2]));
      if (Math.random() < GLITCH_CHANCE) {
        const delay = randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const glitched = glitchWord(BLOG, [1, 1, 2, 2, 3, 3]);
        setTimeout(() => setBlog(BLOG), delay);
        setTimeout(() => setBlog(glitched), delay + GLITCH_DELAY);
        setTimeout(() => setBlog(BLOG), delay + GLITCH_DELAY * 2);
        setTimeout(() => setBlog(glitched), delay + GLITCH_DELAY * 3);
        setTimeout(m, delay + GLITCH_DELAY * 4);
      } else {
        setTimeout(m, randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
      }
    }
    m();
  }, []);

  useEffect(() => {
    runLinlins();
    runSpace();
    runBlog();
  }, []);

  return (
    <h1 className="text-[88px] text-soot max-[1115px]:text-[66px] max-[767px]:text-[44px] max-[767px]:w-[256px]">
      <span className="bg-aluminum inline-block leading-none whitespace-pre max-[1115px]:mb-1.5 max-[767px]:mb-[2.5px]">
        {linlins}
      </span>
      <span className="inline-block max-[1115px]:hidden leading-none whitespace-pre max-[1115px]:mb-1.5 max-[767px]:mb-[2.5px]">
        {space}
      </span>
      <br className="hidden max-[1115px]:inline" />
      <span className="bg-aluminum inline-block leading-none whitespace-pre max-[1115px]:mb-1.5 max-[767px]:mb-[2.5px]">
        {blog}
      </span>
      <span className="relative top-[10px] left-[11px] text-[11px] align-top">v1.500</span>
    </h1>
  );
}
