"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "warm" | "dark";

export const THEME_STORAGE_KEY = "ccc-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  /** False until the client has read the stored preference. Controls that
   *  render a checked state use this to avoid a hydration mismatch. */
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Runs before first paint (see `themeScript` below) and again here, so the
 *  attribute is authoritative whether or not React has hydrated yet. */
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("warm");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    setThemeState(attr === "dark" ? "dark" : "warm");
    setReady(true);
    // Reveal animations are opt-in: only enable them once JS is running, so a
    // no-JS visitor never gets a page of invisible sections.
    document.documentElement.classList.add("js-reveal");
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Storage can be unavailable (private mode, blocked cookies). The
         theme still applies for this page view. */
    }
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, ready }),
    [theme, setTheme, ready],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeProvider");
  return ctx;
}

/** Injected into <head> so the correct tokens are in place before the first
 *  paint — no flash of the wrong theme on load. Falls back to the OS
 *  preference when the visitor has not chosen one. */
export const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var theme = stored === 'dark' || stored === 'warm'
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'warm');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'warm');
  }
})();
`.trim();
