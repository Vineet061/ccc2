"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Icon, type IconName } from "./Icon";
import { Odometer } from "./Odometer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isExternal } from "@/lib/site";
import styles from "./StatTile.module.css";

export type StatTone = "accent" | "accent-2";

export type Stat = {
  icon: IconName;
  /** The figure exactly as it should read when settled, e.g. "$14.5k". */
  value: string;
  label: React.ReactNode;
  tone: StatTone;
  /** Where the figure leads. Omit for a figure that is not a link. */
  href?: string;
  /** What the link does, for screen readers — the figure alone is not enough
   *  to know where it goes. */
  linkLabel?: string;
};

/** Maximum tilt in each axis, in degrees. Small enough to stay legible. */
const MAX_TILT = 15;

export function StatTile({ stat, index = 0 }: { stat: Stat; index?: number }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "active">("idle");
  const [tilting, setTilting] = useState(false);
  const reduced = usePrefersReducedMotion();

  const delay = Math.min(index, 5) * 90;
  const external = stat.href ? isExternal(stat.href) : false;

  /* Reveal the tile the first time it scrolls into view, which is also what
     starts the digit drums. */
  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setState("active");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        setState("active");
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  /* Pointer-tracked tilt. Written straight to CSS custom properties so moving
     the cursor never triggers a React render. */
  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduced || event.pointerType !== "mouse") return;
      const el = tileRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      // Pushing the top away when the cursor is high reads as the card leaning
      // towards the pointer, which is the direction people expect.
      el.style.setProperty("--tilt-x", `${-y * 2 * MAX_TILT}deg`);
      el.style.setProperty("--tilt-y", `${x * 2 * MAX_TILT}deg`);
      if (!tilting) setTilting(true);
    },
    [reduced, tilting],
  );

  const resetTilt = useCallback(() => {
    const el = tileRef.current;
    if (!el) return;
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
    setTilting(false);
  }, []);

  const tone =
    stat.tone === "accent"
      ? {
          "--tone-soft": "var(--color-accent-200)",
          "--tone-ink": "var(--color-accent-800)",
          "--tone-strong": "var(--color-accent-700)",
        }
      : {
          "--tone-soft": "var(--color-accent-2-200)",
          "--tone-ink": "var(--color-accent-2-800)",
          "--tone-strong": "var(--color-accent-2-700)",
        };

  const inner = (
    <>
      <span className={styles.sweep} aria-hidden="true" />

      {stat.href && (
        <span className={styles.cue} aria-hidden="true">
          <Icon name={external ? "external" : "arrowRight"} size={14} />
        </span>
      )}

      <div className={styles.layerBadge}>
        <span className={styles.badge}>
          <svg className={styles.ring} viewBox="0 0 46 46" aria-hidden="true">
            <circle className={styles.ringTrack} cx="23" cy="23" r="22" />
            <circle className={styles.ringValue} cx="23" cy="23" r="22" />
          </svg>
          <span className={styles.icon}>
            <Icon name={stat.icon} size={17} />
          </span>
        </span>
      </div>

      <div className={styles.layerValue}>
        {/* The drums are decoration; the settled figure is what gets
            announced, so nothing is read out mid-spin. */}
        <Odometer
          value={stat.value}
          run={state === "active"}
          delay={delay + 150}
          className={styles.value}
        />
        <span className="sr-only">{stat.value}</span>
      </div>

      <div className={`${styles.layerLabel} ${styles.label}`}>{stat.label}</div>
    </>
  );

  const shared = {
    className: styles.tile,
    "data-tilting": tilting ? "true" : undefined,
    onPointerMove,
    onPointerLeave: resetTilt,
    onBlur: resetTilt,
  } as const;

  return (
    <div
      ref={slotRef}
      className={styles.slot}
      data-tone={stat.tone}
      data-state={state}
      // Caps at 6: anything longer uses the smallest step.
      data-len={Math.min(stat.value.length, 6)}
      style={{ ...tone, "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {stat.href ? (
        <Link
          {...shared}
          ref={tileRef as React.Ref<HTMLAnchorElement>}
          href={stat.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={stat.linkLabel}
        >
          {inner}
        </Link>
      ) : (
        <div
          {...shared}
          ref={tileRef as React.Ref<HTMLDivElement>}
          tabIndex={0}
        >
          {inner}
        </div>
      )}
    </div>
  );
}
