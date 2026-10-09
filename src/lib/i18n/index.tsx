"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/types";
import { en, type TranslationKey } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";
import { defaultLocale, enabledLocales, LOCALE_STORAGE_KEY } from "./config";

const dictionaries: Record<Locale, Partial<Record<TranslationKey, string>>> = { en, ru };

type Vars = Record<string, string | number>;

export function translate(locale: Locale, key: TranslationKey, vars?: Vars): string {
  const template = dictionaries[locale][key] ?? en[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  );
}

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Vars) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Restore the visitor's choice after hydration.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (saved && enabledLocales.includes(saved)) setLocaleState(saved);
    } catch {
      /* storage unavailable — keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    if (!enabledLocales.includes(next)) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: (key, vars) => translate(locale, key, vars) }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Shorthand for components that only need the translate function. */
export function useT() {
  return useI18n().t;
}
