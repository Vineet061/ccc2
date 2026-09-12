"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks, site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /* Close on route change — the drawer must not survive a navigation. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* While the drawer is open: lock the page behind it, close on Escape, and
     keep Tab inside the panel. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={styles.brand}>
            <span className={styles.mark} aria-hidden="true">
              CCC
            </span>
            <span>{site.name}</span>
          </Link>

          {/* Every item is styled identically — no persistent active tint or
              underline, only a hover colour. */}
          <div className={styles.links}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className={styles.mobileControls}>
            <button
              ref={burgerRef}
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls={drawerId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <>
          <button
            type="button"
            className={styles.scrim}
            aria-label="Close menu"
            tabIndex={-1}
            onClick={close}
          />
          <div
            id={drawerId}
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className={styles.drawerTop}>
              <span className={styles.drawerLabel}>Menu</span>
              <button
                type="button"
                className={styles.drawerClose}
                onClick={close}
                aria-label="Close menu"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className={styles.drawerLinks}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={close}>
                  {link.label}
                  <Icon name="arrowRight" size={16} />
                </Link>
              ))}
            </div>

            <div className={styles.drawerFoot}>
              <div className={styles.drawerThemeRow}>
                <span className={styles.drawerLabel}>Theme</span>
                <ThemeToggle />
              </div>
              <span className={styles.drawerLabel}>Contact</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
