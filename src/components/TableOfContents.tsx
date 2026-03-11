"use client";

import { useEffect, useState, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  html: string;
  title?: string;
}

export function TableOfContents({ html, title = "目录" }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Parse headings from HTML and inject IDs into article DOM
  useEffect(() => {
    // Wait for article content to be rendered
    const timer = setTimeout(() => {
      const articleEl = document.querySelector(".prose-zhao");
      if (!articleEl) return;

      const headingEls = articleEl.querySelectorAll("h1, h2, h3");
      const items: TocItem[] = [];

      headingEls.forEach((el, index) => {
        const id = `heading-${index}`;
        el.id = id;
        items.push({
          id,
          text: el.textContent || "",
          level: parseInt(el.tagName[1]),
        });
      });

      setHeadings(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [html]);

  // IntersectionObserver for active heading highlighting
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting heading
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[70vh] overflow-y-auto">
      <p className="font-serif text-xs uppercase tracking-widest text-cement mb-4">
        {title}
      </p>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-left text-sm font-serif leading-snug transition-colors duration-200 hover:text-carbon ${
                activeId === heading.id
                  ? "text-amber font-medium"
                  : "text-ash"
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
