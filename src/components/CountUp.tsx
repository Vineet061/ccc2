"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Splits "$14.5k" into "$", 14.5, "k" so prefix and suffix survive the
 *  animation and only the numeral counts. */
function parse(value: string) {
  const match = value.match(/-?[\d.]+/);
  if (!match || match.index === undefined) return null;
  const [numeral] = match;
  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + numeral.length),
    target: parseFloat(numeral),
    decimals: (numeral.split(".")[1] ?? "").length,
  };
}

/**
 * Counts a statistic up from zero the first time it scrolls into view.
 * Renders the final value on the server and whenever motion is reduced, so
 * the number is always correct and readable.
 */
export function CountUp({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const parts = parse(value);
    if (!el || !parts || reduced) {
      setDisplay(value);
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const DURATION = 1100;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        let start: number | null = null;
        const step = (now: number) => {
          if (start === null) start = now;
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (progress < 1) {
            setDisplay(
              parts.prefix +
                (parts.target * eased).toFixed(parts.decimals) +
                parts.suffix,
            );
            frame = requestAnimationFrame(step);
          } else {
            setDisplay(value);
          }
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
