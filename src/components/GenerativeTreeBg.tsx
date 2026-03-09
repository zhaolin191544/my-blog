"use client";

import { useCallback, useEffect, useRef } from "react";

const r90 = Math.PI / 2;
const r180 = Math.PI;
const r15 = Math.PI / 12;
const { random } = Math;

function polar2cart(x: number, y: number, r: number, theta: number): [number, number] {
  return [x + r * Math.cos(theta), y + r * Math.sin(theta)];
}

interface GenerativeTreeBgProps {
  init?: number;
  len?: number;
  strokeStyle?: string;
  lineWidth?: number;
  stepsPerFrame?: number;
  interval?: number;
  className?: string;
}

export default function GenerativeTreeBg({
  init = 7,
  len = 10,
  strokeStyle = "#00000040",
  lineWidth = 1,
  stepsPerFrame = 5,
  interval = 7,
  className = "",
}: GenerativeTreeBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 400, height: 400 });

  const start = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const { width, height } = sizeRef.current;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    let queue: Function[] = [];
    let iterations = 0;
    let lastTime = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;

    const step = (x: number, y: number, rad: number) => {
      const length = random() * len;
      const [nx, ny] = polar2cart(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + random() * r15;
      const rad2 = rad - random() * r15;

      if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

      const iter = iterations;
      if (iter <= init || random() > 0.5) queue.push(() => step(nx, ny, rad1));
      if (iter <= init || random() > 0.5) queue.push(() => step(nx, ny, rad2));
    };

    const frame = (time: number) => {
      if (!queue.length) return;

      if (time - lastTime >= interval) {
        lastTime = time;
        iterations += 1;

        const batch = queue.splice(0, stepsPerFrame);
        batch.forEach((fn) => fn());
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    // Always: left side (growing right) + right side (growing left)
    queue = [() => step(0, random() * height, 0), () => step(width, random() * height, r180)];

    // Randomly add top (growing down)
    if (random() > 0.5) {
      queue.push(() => step(random() * width, 0, r90));
    }

    // Randomly add bottom (growing up)
    if (random() > 0.5) {
      queue.push(() => step(random() * width, height, -r90));
    }

    rafRef.current = requestAnimationFrame(frame);
  }, [init, len, strokeStyle, lineWidth, stepsPerFrame, interval]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      sizeRef.current = { width: w, height: h };
      start();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start]);

  return (
    <canvas
      ref={canvasRef}
      onClick={start}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
