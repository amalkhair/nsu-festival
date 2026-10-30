import { cookies, headers } from "next/headers";
import type { Locale } from "@/types";
import { defaultLocale, enabledLocales, LOCALE_COOKIE } from "./config";

/**
 * The visitor's language, for server components and lib/api.
 * 1. The language they picked (cookie)
 * 2. Otherwise their browser's language, if we support it (first visit)
 * 3. Otherwise English
 */
export async function getLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value as Locale | undefined;
  if (saved && enabledLocales.includes(saved)) return saved;

  const accept = (await headers()).get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((part) => part.trim().slice(0, 2).toLowerCase() as Locale)
    .find((code) => enabledLocales.includes(code));
  return preferred ?? defaultLocale;
}
