"use client";

import { useState, useEffect } from "react";
import "./StaggeredMenu.css";

interface MenuItem {
  label: string;
  href: string;
}

interface StaggeredMenuProps {
  items: MenuItem[];
  socialItems?: { label: string; href: string }[];
  position?: "left" | "right";
  accentColor?: string;
  colors?: string[];
  menuButtonColor?: string;
  openMenuButtonColor?: string;
}

export function StaggeredMenu({
  items,
  socialItems,
  position = "right",
  accentColor = "#ffa133",
  colors = ["#bccabb", "#ffa133"],
  menuButtonColor = "#333333",
  openMenuButtonColor = "#ffffff",
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".staggered-menu-panel") &&
        !target.closest(".sm-toggle-btn")
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isOpen]);

  const btnColor = isOpen ? openMenuButtonColor : menuButtonColor;

  return (
    <>
      <button
        className={`sm-toggle-btn ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        style={{
          color: btnColor,
          position: "fixed",
          top: "40px",
          [position]: "44px",
          zIndex: 52,
        }}
      >
        <span className="flex flex-col gap-[6px]">
          <span className="sm-icon-line" style={{ backgroundColor: btnColor }} />
          <span className="sm-icon-line" style={{ backgroundColor: btnColor }} />
          <span className="sm-icon-line" style={{ backgroundColor: btnColor }} />
        </span>
        <span className="text-[16.5px]">{isOpen ? "CLOSE" : "MENU"}</span>
      </button>

      {/* Staggered color layers */}
      {colors.map((color, i) => (
        <div
          key={i}
          className={`sm-panel-layer ${isOpen ? "is-open" : ""}`}
          style={{
            backgroundColor: color,
            [position]: 0,
            transitionDelay: isOpen ? `${i * 0.06}s` : `${(colors.length - i) * 0.04}s`,
          }}
        />
      ))}

      {/* Main panel */}
      <div
        className={`staggered-menu-panel ${isOpen ? "is-open" : ""}`}
        style={{
          backgroundColor: colors[colors.length - 1],
          ["--sm-accent" as string]: accentColor,
          [position]: 0,
          color: openMenuButtonColor,
          transitionDelay: isOpen ? "0.1s" : "0s",
        }}
      >
        <ul className="sm-panel-items">
          {items.map((item, i) => (
            <li
              key={item.label}
              className={`sm-panel-item ${isOpen ? "is-open" : ""}`}
              style={{
                transitionDelay: isOpen ? `${0.3 + i * 0.06}s` : "0s",
              }}
            >
              <a href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {socialItems && socialItems.length > 0 && (
          <div className={`sm-social-links ${isOpen ? "is-open" : ""}`}>
            {socialItems.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
