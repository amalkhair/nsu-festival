"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { allLocales, enabledLocales } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const current = allLocales.find((l) => l.code === locale) ?? allLocales[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("lang.label")}
        className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink ring-1 ring-line transition hover:bg-brand-soft"
      >
        {current.label}
        <ChevronDown className={cn("size-3.5 transition", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="animate-fade-up absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl bg-white p-1 shadow-lift ring-1 ring-line"
        >
          {allLocales.map((l) => {
            const enabled = enabledLocales.includes(l.code);
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={!enabled}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm",
                    enabled ? "text-ink hover:bg-mist" : "cursor-not-allowed text-ink-faint",
                  )}
                >
                  <span>
                    <span className="font-semibold">{l.label}</span> · {l.native}
                  </span>
                  {active ? (
                    <Check className="size-4 text-brand" />
                  ) : (
                    !enabled && <span className="text-[10px] font-semibold uppercase">{t("lang.soon")}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
