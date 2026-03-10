"use client";

export function WelcomeContent() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[48px] max-[1115px]:text-[36px] max-[767px]:text-[28px] text-soot leading-tight">
        HOLA My Friends
        <span className="animate-wave ml-3 text-[52px] max-[767px]:text-[32px]">
          {"\uD83D\uDC4B"}
        </span>
      </h2>
      <div className="text-dark text-[16.5px] leading-[1.7] max-w-[520px]">
        <p>
          Welcome to my corner of the internet. I&apos;m LinLin, a developer and
          creative thinker exploring the boundaries of technology, design, and
          everything in between.
        </p>
        <p className="mt-4 text-clay">
          This blog is where I share my thoughts on building things for the web,
          learning new technologies, and the occasional adventure in space
          (mostly fictional).
        </p>
      </div>
      <div className="flex gap-3 mt-2">
        <span className="inline-block px-3 py-1 text-[11px] bg-foam text-soot">
          DEVELOPER
        </span>
        <span className="inline-block px-3 py-1 text-[11px] bg-aluminum text-soot">
          DESIGNER
        </span>
        <span className="inline-block px-3 py-1 text-[11px] bg-amber/30 text-soot">
          EXPLORER
        </span>
      </div>
    </div>
  );
}
