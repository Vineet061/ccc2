import Link from "next/link";

import { footerPages, site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <span className={styles.mark} aria-hidden="true">
              CCC
            </span>
            <span className={styles.wordmark}>{site.name}</span>
          </div>
          <p className={`${styles.blurb} text-muted`}>{site.tagline}</p>
        </div>

        <nav className={styles.col} aria-label="Footer pages">
          <span className={styles.colLabel}>Pages</span>
          {footerPages.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.col}>
          <span className={styles.colLabel}>Contact</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>

        <div className={styles.col}>
          <span className={styles.colLabel}>Availability</span>
          <span className={styles.availability}>
            <span className={styles.dot} aria-hidden="true" />
            Open to new projects
          </span>
        </div>
      </div>

      <div className={styles.legal}>
        <span className="text-muted">© {new Date().getFullYear()} CCC</span>
      </div>
    </footer>
  );
}
