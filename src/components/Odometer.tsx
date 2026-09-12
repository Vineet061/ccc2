"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./Odometer.module.css";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/** Extra whole turns each drum makes before settling. */
const SPINS = 2;

type OdometerProps = {
  /** The figure exactly as it should read when settled, e.g. "$14.5k". */
  value: string;
  /** Start the animation. Until this is true the reels sit on their final
   *  faces, so the correct figure is what renders on the server. */
  run?: boolean;
  /** Delay before the first character moves, in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Renders a figure as a row of rotating digit drums. Every digit is a real
 * 3D cylinder rather than a sliding strip, so the numerals turn towards the
 * viewer as they settle.
 *
 * The whole row is `aria-hidden`; the caller is expected to expose the settled
 * value to assistive technology separately, so nothing is announced mid-spin.
 */
export function Odometer({
  value,
  run = false,
  delay = 0,
  className,
}: OdometerProps) {
  const reduced = usePrefersReducedMotion();
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!run || reduced) return;
    // One frame on the start angle before the target is applied, otherwise the
    // browser collapses both into a single style change and nothing animates.
    const id = requestAnimationFrame(() => setSpinning(true));
    return () => cancelAnimationFrame(id);
  }, [run, reduced]);

  const characters = [...value];
  let digitIndex = 0;

  return (
    <span
      className={`${styles.value} ${spinning ? styles.spinning : ""} ${
        className ?? ""
      }`}
      aria-hidden="true"
    >
      {characters.map((char, i) => {
        const isDigit = char >= "0" && char <= "9";

        if (!isDigit) {
          return (
            <span
              key={i}
              className={styles.fixed}
              style={{ "--delay": `${delay + i * 70}ms` } as React.CSSProperties}
            >
              {char}
            </span>
          );
        }

        const target = Number(char);
        const settled = -target * 36;
        // Before the run, and once it has finished, the drum rests on the
        // target face. While running it starts a couple of turns back.
        const angle = spinning || reduced ? settled : settled + SPINS * 360;
        const step = digitIndex++;

        return (
          <span key={i} className={styles.reel}>
            <span
              className={styles.drum}
              style={
                {
                  "--angle": `${angle}deg`,
                  "--delay": `${delay + step * 110}ms`,
                } as React.CSSProperties
              }
            >
              {DIGITS.map((d) => (
                <span
                  key={d}
                  className={`${styles.face} ${
                    d === target ? styles.faceFront : ""
                  }`}
                  style={{ "--face-angle": `${d * 36}deg` } as React.CSSProperties}
                >
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
