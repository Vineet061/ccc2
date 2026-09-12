"use client";

import { Icon, type IconName } from "./Icon";
import { useTheme, type Theme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

const options: { value: Theme; label: string; icon: IconName; title: string }[] =
  [
    { value: "warm", label: "Warm", icon: "sun", title: "Warm theme" },
    { value: "dark", label: "Dark", icon: "moon", title: "Dark theme" },
  ];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, ready } = useTheme();

  return (
    <div
      className={`${styles.seg} ${compact ? styles.compact : ""}`}
      role="group"
      aria-label="Color theme"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={styles.opt}
          title={opt.title}
          // Before hydration reads the stored value, neither option claims to
          // be active — that keeps the server and client markup identical.
          aria-pressed={ready ? theme === opt.value : false}
          aria-label={opt.title}
          onClick={() => setTheme(opt.value)}
        >
          <Icon name={opt.icon} size={15} />
          <span className={styles.label}>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
