"use client";

import { useEffect, useState, useCallback } from "react";
import { Printout } from "./Printout";
import { TypeTest } from "./TypeTest";

const GITHUB_RELEASES_URL =
  "https://github.com/rektdeckard/departure-mono/releases/latest";

export function Header() {
  return (
    <header className="relative pt-[137px] max-[1115px]:pt-[132px] max-[767px]:pt-[88px] bg-enamel">
      <div className="max-w-[1440px] px-11 mx-auto md:px-4">
        <div className="flex items-start justify-between flex-wrap max-[1115px]:flex-col max-[1115px]:gap-[38px] max-[1115px]:leading-[1.4] max-[767px]:gap-[33px]">
          <div className="inline-flex items-start gap-[11px] leading-none">
            <GlitchTitle />
          </div>
          <menu className="flex flex-col items-start gap-1.5 mt-2 mr-[22px] text-dark p-0 list-none max-[1115px]:m-0 max-[1115px]:gap-[11px]">
            <a
              href="/assets/DepartureMono-1.500.zip"
              className="no-underline text-[16.5px] leading-[21px] transition-[background-color] duration-75 ease-[cubic-bezier(0.36,2.09,0.07,-1.52)] hover:bg-foam hover:text-current"
            >
              {"\u2193"} DOWNLOAD
            </a>
            <a
              href={GITHUB_RELEASES_URL}
              className="no-underline text-[16.5px] leading-[21px] transition-[background-color] duration-75 ease-[cubic-bezier(0.36,2.09,0.07,-1.52)] hover:bg-foam hover:text-current"
            >
              &gt; GITHUB
            </a>
            <a
              href="https://buymeacoffee.com/helenazhang"
              className="no-underline text-[16.5px] leading-[21px] transition-[background-color] duration-75 ease-[cubic-bezier(0.36,2.09,0.07,-1.52)] hover:bg-foam hover:text-current"
            >
              {"\u2665"} 中文字符
            </a>
          </menu>
        </div>
        <div className="relative grid grid-cols-[155px_1fr] gap-[187px] mt-[185px] mb-[492px] ml-[114px] max-[1115px]:mt-[110px] max-[1115px]:mb-[335px] max-[1115px]:gap-[105px] max-[767px]:block max-[767px]:mt-[88px] max-[767px]:mb-[773px]">
          <img className="absolute top-[152px] left-[-768px]" src="/assets/planet.svg" alt="" />
          <p className="w-[204px] max-[767px]:absolute max-[767px]:top-[1063px] max-[767px]:left-[113px] text-[11px] whitespace-pre text-clay">
            {"\u2591"}{"  "}DEPARTURE MONO IS A
            <br />
            {"\u2591"}{"  "}MONOSPACED PIXEL FONT WITH
            <br />
            {"\u2591"}{"  "}A LO-FI TECHNICAL VIBE
          </p>
          <Printout className="text-[16.5px] z-[1]" color="white" height={594} viewBox="0 55 1010 594">
            <pre className="relative top-[-92px] pt-[88px] px-[66px] leading-[24.75px] max-[767px]:left-[-123px]">
              {`\
To:                                     From:
DR. E. KERNING                          PROFESSOR H. J. FARNSWORTH
MERCURY RESEARCH LABS                   FARNSWORTH INSTITUTE
3572 WILSHIRE BLVD #9732                88 ESSEX ST
LOS ANGELES, CA 90010                   NEW NEW YORK, NY 10002



Dear Dr. Kerning,这边是中文字体测试

I trust this message finds you in good spirits. I am pleased to brief
you on `}
              <span className="bg-foam">
                this critical scientific venture
              </span>
              {` at the far reaches of our
solar system. Your groundbreaking research and expertise in
exoplanetary ecosystems uniquely qualifies you for this endeavor.

`}
              <span className="bg-foam">
                Your primary objective will be to investigate an anomaly
                detected in
              </span>
              <br />
              <span className="bg-foam">the Kuiper belt.</span>
              {` Initial readings suggest the presence of amino acids
near newly discovered KBOs. Your team will deploy specialized
equipment to collect data and analyze the phenomenon.

Please ensure all preparations are completed according to the attached
mission protocols. We would appreciate your prompt assessment of the
included candidate profiles. Departure is set from Earth's orbit on
the 15th of next month.

I have full confidence in your ability to navigate the challenges of
this mission with scientific rigor and ethical consideration. Your
discoveries may unlock new chapters in our understanding of
extraterrestrial life.

Best regards,
Professor Hubert J. Farnsworth
Founder, Farnsworth Institute
            `}
            </pre>
          </Printout>
          <img
            className="absolute z-[1] left-[836px] max-[1115px]:left-[612px] max-[767px]:top-[551px] max-[767px]:left-[156px] max-[767px]:z-[2]"
            src="/assets/newspaper-clipping.svg"
            alt=""
          />
          <img className="absolute z-[1] top-[-14px] left-[1045px] max-[1115px]:left-[821px] max-[767px]:hidden" src="/assets/paperclip.svg" alt="" />
          <img className="absolute top-[258px] left-[-250px] transition-transform duration-[600ms] ease-[cubic-bezier(1,0.05,0.48,0.99)] z-[1] hover:rotate-[3deg] hover:translate-x-[100px] hover:translate-y-[-12px] max-[1115px]:left-[-194px] max-[767px]:top-[374px] max-[767px]:left-[-76px] max-[767px]:pointer-events-none" src="/assets/badge.svg" alt="" />
          <img className="absolute top-[804px] left-[308px] max-[1115px]:top-[713px] max-[1115px]:left-[416px] max-[767px]:top-[1203px] max-[767px]:left-0" src="/assets/highlighter-outline.svg" alt="" />
        </div>
        <pre className="relative left-[-290px] text-[44px] leading-[1.27] mb-[132px] max-[1115px]:mb-[88px] max-[767px]:left-[-100px] max-[767px]:text-[22px] max-[767px]:mb-[84px]">
          {`\u2502 Flight  \u2502 Destination \u2191           \u2502 Departing  \u2502 Gate  \u2502 Status       \u2502`}
          <br />
          {`\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524`}
          <br />
          {`\u2502 LH789   \u2502 EUR Europa 1            \u2502 13:45      \u2502 Z23   \u2502 Delayed      \u2502`}
          <br />
          <span className="animate-[blink_1s_infinite_steps(1)]">
            {`\u2502 XX123   \u2502 KBA Kuiper Alpha        \u2502 08:00      \u2502 22    \u2502 On Time      \u2502`}
          </span>
          <br />
          {`\u2502 AF321   \u2502 MAR Mars Landing        \u2502 09:15      \u2502 12    \u2502 On Time      \u2502`}
          <br />
          {`\u2502 UA567   \u2502 NTK New Tokyo           \u2502 11:20      \u2502 C8    \u2502 Departed     \u2502`}
          <br />
          {`\u2502 QF678   \u2502 ZMB Zvezda Moonbase     \u2502 20:00      \u2502 17    \u2502 On Time      \u2502`}
        </pre>
        <div className="relative h-[956px] max-[1115px]:h-[883px] max-[767px]:h-[894px] max-[767px]:pointer-events-none">
          <p className="relative left-[231px] w-[177px] max-[767px]:left-[57px] text-[11px] whitespace-pre text-clay">
            {"\u2591"}{"  "}IT&apos;S GREAT FOR WORKING
            <br />
            {"\u2591"}{"  "}WITH TABULAR DATA
          </p>
          <div className="group h-[736px] mt-[70px]">
            <img
              className="absolute left-[342px] top-[133px] max-[1115px]:top-[106px] max-[1115px]:left-[87px] max-[767px]:top-[117px] max-[767px]:left-[57px] transition-transform duration-1000 ease-[cubic-bezier(1,0.05,0.48,0.99)] group-hover:translate-x-[20px] group-hover:translate-y-[-24px] group-hover:rotate-[2deg]"
              src="/assets/boarding-pass.svg"
              alt=""
            />
            <img
              className="absolute top-[217px] left-[84px] max-[1115px]:top-[204px] max-[1115px]:left-[-159px] max-[767px]:top-[215px] max-[767px]:left-[-286px] transition-transform duration-1000 ease-[cubic-bezier(1,0.05,0.48,0.99)] group-hover:rotate-[-3deg] group-hover:translate-x-[-96px] group-hover:translate-y-[12px]"
              src="/assets/receipt.svg"
              alt=""
            />
            <img
              className="absolute top-[396px] left-[904px] rotate-[270deg] max-[1115px]:top-[376px] max-[1115px]:left-[586px] max-[767px]:top-[421px] max-[767px]:left-[292px] transition-transform duration-1000 ease-[cubic-bezier(1,0.05,0.48,0.99)] group-hover:translate-x-[60px] group-hover:translate-y-[20px] group-hover:rotate-[275deg]"
              src="/assets/bag-tag.svg"
              alt=""
            />
          </div>
        </div>
        <TypeTest />
      </div>
    </header>
  );
}

const DEPARTURE = "DEPARTURE";
const MONO = "MONO";
const COGNATES: Record<string, string> = {
  E: "3\u03A3\u039E\u20AC\u018E",
  A: "\u039B",
  R: "2\u20B9",
  T: "7",
  U: "\u0244",
  " ": "_",
  O: "0",
  N: "\u019D",
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

function GlitchTitle() {
  const MIN_DELAY = 400;
  const MAX_DELAY = 2000;
  const GLITCH_CHANCE = 0.1;
  const GLITCH_DELAY = 30;

  const [departure, setDeparture] = useState(DEPARTURE);
  const [space, setSpace] = useState(" ");
  const [mono, setMono] = useState(MONO);

  const runDeparture = useCallback(() => {
    function d() {
      setDeparture(glitchWord(DEPARTURE, [0, 0, 0, 1, 1, 2, 2, 2, 3]));
      if (Math.random() < GLITCH_CHANCE) {
        const delay = randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const glitched = glitchWord(
          DEPARTURE,
          [2, 3, 4, 4, 5, 5, 5, 6, 6],
        );
        setTimeout(() => setDeparture(DEPARTURE), delay);
        setTimeout(() => setDeparture(glitched), delay + GLITCH_DELAY);
        setTimeout(() => setDeparture(DEPARTURE), delay + GLITCH_DELAY * 2);
        setTimeout(() => setDeparture(glitched), delay + GLITCH_DELAY * 3);
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

  const runMono = useCallback(() => {
    function m() {
      setMono(glitchWord(MONO, [0, 0, 0, 1, 1, 2, 2]));
      if (Math.random() < GLITCH_CHANCE) {
        const delay = randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const glitched = glitchWord(MONO, [1, 1, 2, 2, 3, 3]);
        setTimeout(() => setMono(MONO), delay);
        setTimeout(() => setMono(glitched), delay + GLITCH_DELAY);
        setTimeout(() => setMono(MONO), delay + GLITCH_DELAY * 2);
        setTimeout(() => setMono(glitched), delay + GLITCH_DELAY * 3);
        setTimeout(m, delay + GLITCH_DELAY * 4);
      } else {
        setTimeout(m, randomNatural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
      }
    }
    m();
  }, []);

  useEffect(() => {
    runDeparture();
    runSpace();
    runMono();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1 className="text-[88px] text-soot max-[767px]:text-[44px] max-[767px]:w-[256px]">
      <span className="bg-aluminum inline-block leading-none whitespace-pre max-[1115px]:mb-1.5 max-[767px]:mb-[2.5px]">{departure}</span>
      <span className="inline-block max-[1115px]:hidden leading-none whitespace-pre max-[1115px]:mb-1.5 max-[767px]:mb-[2.5px]">{space}</span>
      <br className="hidden max-[1115px]:inline" />
      <span className="bg-aluminum inline-block leading-none whitespace-pre max-[1115px]:mb-1.5 max-[767px]:mb-[2.5px]">{mono}</span>
      <span className="relative top-[10px] left-[11px] text-[11px] align-top">v1.500</span>
    </h1>
  );
}
