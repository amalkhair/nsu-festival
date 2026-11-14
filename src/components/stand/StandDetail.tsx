import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, MapPin } from "lucide-react";
import type { ResolvedStand, StandKind } from "@/types/stand";
import { translate } from "@/lib/i18n/translate";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { Card, Container } from "@/components/ui/primitives";
import { Flag } from "@/components/ui/Flag";

const kindKeys: Record<StandKind, TranslationKey> = {
  country: "stand.kind.country",
  regional_collective: "stand.kind.regional",
  organization: "stand.kind.organization",
  thematic: "stand.kind.thematic",
  unassigned: "stand.kind.unassigned",
};

/** Server component: labels and data follow the same request locale. */
export function StandDetail({ stand }: { stand: ResolvedStand }) {
  const t = (key: TranslationKey) => translate(stand.locale, key);
  return (
    <Container className="py-6 sm:py-10">
      <Link href="/map" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
        <ArrowLeft className="size-4" /> {t("stand.back")}
      </Link>
      <Card className="overflow-hidden p-0">
        <div className="h-2" style={{ background: stand.theme.primary }} />
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            {stand.flagCode && <Flag code={stand.flagCode} className="h-7" />}
            <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-ink-soft">{t(kindKeys[stand.kind])}</span>
            <span className="text-xs font-semibold text-ink-faint">{t("stand.booth")} {stand.boothCode}</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">{stand.name}</h1>
          {stand.tagline && <p className="mt-2 text-lg font-semibold text-ink-soft">{stand.tagline}</p>}
          {stand.summary && <p className="mt-4 text-sm text-ink-soft">{stand.summary}</p>}
          {stand.locale === "ru" && stand.translationFallback && (
            <p lang="ru" className="mt-5 rounded-xl border border-line bg-mist p-3 text-sm text-ink-soft">
              {t("stand.translationNotice")}
            </p>
          )}
          <div className="mt-7 border-t border-line pt-5">
            <h2 className="text-lg font-bold text-ink">{t("stand.details")}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-ink-soft">{stand.description || t("stand.pending")}</p>
          </div>
          {stand.kind === "country" && stand.countrySlug && (
            <Link href={`/country/${stand.countrySlug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
              style={{ background: stand.theme.primary }}>
              <BookOpen className="size-4" /> {t("stand.exploreCountry")}
            </Link>
          )}
          {stand.externalResources.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-bold text-ink">{t("stand.resources")}</h2>
              <ul className="space-y-2">{stand.externalResources.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                    <ExternalLink className="size-4" /> {item.label}
                  </a>
                </li>
              ))}</ul>
            </div>
          )}
          <Link href="/map" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            <MapPin className="size-4" /> {t("stand.back")}
          </Link>
        </div>
      </Card>
    </Container>
  );
}
