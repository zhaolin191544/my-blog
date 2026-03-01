"use client";

import { useCallback, useEffect, useRef } from "react";

const r180 = Math.PI;
const r90 = Math.PI / 2;
const { random } = Math;

function polar2cart(
  x: number,
  y: number,
  r: number,
  theta: number,
): [number, number] {
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
  init = 2, // 减少初始强制分叉，让根部更清爽
  len = 4, // 缩短每次生长的步长，让线条更平滑
  strokeStyle = "#3CB37160", // 默认改成半透明的绿色 (MediumSeaGreen)
  lineWidth = 1.5, // 藤蔓稍微粗一点点
  stepsPerFrame = 4, // 稍微放慢单帧生长数量，显得更自然
  interval = 15,
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
    let lastTime = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = strokeStyle; // 用于画叶子

    // 增加了一个 depth 参数来记录当前藤蔓的“代数”
    const step = (x: number, y: number, rad: number, depth: number) => {
      // 每次生长的长度有轻微随机波动
      const length = random() * len + 2;
      const [nx, ny] = polar2cart(x, y, length, rad);

      // 画主干线条
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      // 🌿 随机画小叶子 (5% 的概率会在当前点画一个圆点当叶子)
      if (random() < 0.05) {
        ctx.beginPath();
        ctx.arc(nx, ny, random() * 2 + 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 超出屏幕外一定距离则停止生长
      if (nx < -50 || nx > width + 50 || ny < -50 || ny > height + 50) return;

      // 1. 主干的延续：角度变化非常小，表现出藤蔓“蜿蜒”但不会剧烈折断的特性
      const nextRad = rad + (random() - 0.5) * (Math.PI / 6);
      queue.push(() => step(nx, ny, nextRad, depth + 1));

      // 2. 侧枝的分化：藤蔓分叉概率很低 (3%)，或者在初始阶段强制分叉
      if (depth <= init || random() < 0.03) {
        // 侧枝通常会以较大的角度偏离主干
        const branchRad =
          rad +
          (random() > 0.5 ? 1 : -1) * (Math.PI / 3) +
          (random() - 0.5) * 0.5;
        queue.push(() => step(nx, ny, branchRad, depth + 1));
      }
    };

    const frame = (time: number) => {
      if (!queue.length) return;

      if (time - lastTime >= interval) {
        lastTime = time;

        const batch = queue.splice(0, stepsPerFrame);
        batch.forEach((fn) => fn());
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    // 起点逻辑保持不变
    queue =
      random() < 0.5
        ? [
            () => step(0, random() * height, 0, 0),
            () => step(width, random() * height, r180, 0),
          ]
        : [
            () => step(random() * width, 0, r90, 0),
            () => step(random() * width, height, -r90, 0),
          ];

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
