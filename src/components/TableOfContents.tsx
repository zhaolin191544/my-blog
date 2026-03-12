"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Parse headings from an HTML string and inject id attributes.
 * Returns { html: processedHtml, headings: TocItem[] }
 */
export function parseAndInjectHeadingIds(html: string): {
  html: string;
  headings: TocItem[];
} {
  const headings: TocItem[] = [];
  let index = 0;

  // Match <h1>, <h2>, <h3> tags — with or without existing attributes
  const processed = html.replace(
    /<(h[123])(\s[^>]*)?>([^]*?)<\/\1>/gi,
    (match, tag: string, attrs: string | undefined, content: string) => {
      const id = `heading-${index++}`;
      const level = parseInt(tag[1]);
      // Strip inner HTML tags to get plain text
      const text = content.replace(/<[^>]*>/g, "").trim();
      if (text) {
        headings.push({ id, text, level });
      }
      // Rebuild the tag with the id injected
      const cleanAttrs = (attrs || "").replace(/\s*id\s*=\s*["'][^"']*["']/gi, "");
      return `<${tag}${cleanAttrs} id="${id}">${content}</${tag}>`;
    }
  );

  return { html: processed, headings };
}

interface TableOfContentsProps {
  headings: TocItem[];
  title?: string;
}

export function TableOfContents({ headings, title = "目录" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // IntersectionObserver for active heading highlighting
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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

    // Small delay to ensure DOM is ready after dangerouslySetInnerHTML
    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
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
