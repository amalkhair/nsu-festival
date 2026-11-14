"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import type { ResolvedStand } from "@/types/stand";
import { useI18n } from "@/lib/i18n";
import { Card, Container } from "@/components/ui/primitives";
import { Flag } from "@/components/ui/Flag";

const copy = {
  en: {
    back: "Back to festival map", booth: "Booth", country: "Country stand",
    regional_collective: "Regional collective", organization: "Organization stand",
    thematic: "Thematic pavilion", unassigned: "Stand information",
    translationNotice: "Russian content is being prepared. This page currently shows the English source text.",
    details: "About this stand", pending: "The stand team has not published its full description yet.",
    resources: "Further information",
  },
  ru: {
    back: "Вернуться к карте фестиваля", booth: "Стенд", country: "Национальный стенд",
    regional_collective: "Региональное объединение", organization: "Стенд организации",
    thematic: "Тематический павильон", unassigned: "Информация о стенде",
    translationNotice: "Русский перевод готовится. Пока отображается исходный текст на английском языке.",
    details: "О стенде", pending: "Команда стенда пока не опубликовала полное описание.",
    resources: "Дополнительная информация",
  },
} as const;

export function StandDetail({ stand }: { stand: ResolvedStand }) {
  const { locale } = useI18n();
  const lang = locale === "ru" ? "ru" : "en";
  const t = copy[lang];
  return (
    <Container className="py-6 sm:py-10">
      <Link href="/map" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
        <ArrowLeft className="size-4" />{t.back}
      </Link>
      <Card className="overflow-hidden p-0">
        <div className="h-2" style={{ background: stand.theme.primary }} />
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            {stand.flagCode && <Flag code={stand.flagCode} className="h-7" />}
            <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-ink-soft">{t[stand.kind]}</span>
            <span className="text-xs font-semibold text-ink-faint">{t.booth} {stand.boothCode}</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">{stand.name}</h1>
          {stand.tagline && <p className="mt-2 text-lg font-semibold text-ink-soft">{stand.tagline}</p>}
          {stand.summary && <p className="mt-4 text-sm text-ink-soft">{stand.summary}</p>}
          {stand.translationFallback && <p lang="ru" className="mt-5 rounded-xl border border-line bg-mist p-3 text-sm text-ink-soft">{t.translationNotice}</p>}
          <div className="mt-7 border-t border-line pt-5">
            <h2 className="text-lg font-bold text-ink">{t.details}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-ink-soft">{stand.description || t.pending}</p>
          </div>
          {stand.externalResources.length > 0 && <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold text-ink">{t.resources}</h2>
            <ul className="space-y-2">{stand.externalResources.map((item) => <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                <ExternalLink className="size-4" />{item.label}
              </a>
            </li>)}</ul>
          </div>}
          <Link href="/map" className="mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white" style={{ background: stand.theme.primary }}>
            <MapPin className="size-4" />{t.back}
          </Link>
        </div>
      </Card>
    </Container>
  );
}
