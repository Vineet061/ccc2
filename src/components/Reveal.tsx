"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a div; pass "section", "li" etc. where
   *  the surrounding markup calls for it. */
  as?: ElementType;
  /** Stagger, in steps. Each step adds 70ms, capped at 4 steps like the
   *  original design. */
  delayStep?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Fades and lifts its children into view once. The content is authored
 * visible — the hidden state only applies under `.js-reveal`, which the
 * ThemeProvider adds after mount — so with JS off nothing disappears.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delayStep = 0,
  className,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support: show it immediately rather than leaving it hidden.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    observer.observe(el);

    // Safety net: anything still hidden after a beat is shown regardless of
    // the observer, so content can never be left invisible.
    const failsafe = window.setTimeout(() => {
      el.classList.add("is-visible");
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      style={{
        ...style,
        transitionDelay: `${Math.min(delayStep, 4) * 70}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
