"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/src/components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-enamel/30 animate-pulse rounded-lg" />,
});

interface LanyardWrapperProps {
  position?: [number, number, number];
  fov?: number;
}

export function LanyardWrapper({ position, fov }: LanyardWrapperProps) {
  return <Lanyard position={position} fov={fov} />;
}
