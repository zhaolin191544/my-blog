"use client";

import { useState, useEffect } from "react";

export function Sensor() {
  const [val, setVal] = useState(0);

  useEffect(() => {
    function scrollPercent() {
      const scroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setVal(100 - Math.round((scroll / height) * 100));
    }

    window.addEventListener("scroll", scrollPercent);
    scrollPercent();
    return () => window.removeEventListener("scroll", scrollPercent);
  }, []);

  return (
    <span className="absolute top-[330px] left-[342px] text-amber text-[220px] max-[1115px]:left-[44px] max-[1115px]:top-[286px] max-[767px]:left-[75px] max-[767px]:top-[970px]">
      {val.toString().padStart(2, "0")}
    </span>
  );
}
