"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { Country, CountryContent, CultureItem, Destination } from "@/types";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ButtonLink, Card } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Flag } from "@/components/ui/Flag";

type Tab = "culture" | "tourism" | "about";
const TABS: Tab[] = ["culture", "tourism", "about"];

export function ExploreView({ country, content }: { country: Country; content: CountryContent }) {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams().get("tab");
  const tab: Tab = TABS.includes(param as Tab) ? (param as Tab) : "culture";

  const setTab = (next: Tab) => router.replace(`${pathname}?tab=${next}`, { scroll: false });

  const labels: Record<Tab, string> = {
    culture: t("country.tabCulture"),
    tourism: t("country.tabTourism"),
    about: t("country.tabAbout", { country: country.name }),
  };

  return (
    <>
      <div role="tablist" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition",
              tab === key
                ? "bg-[var(--c-accent)] text-white shadow-sm"
                : "bg-white text-ink-soft ring-1 ring-line hover:text-ink",
            )}
          >
            {labels[key]}
          </button>
        ))}
      </div>

      <div key={tab} className="animate-fade-up mt-5">
        {tab === "culture" && (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {content.culture.map((item) => (
              <CultureCard key={item.slug} item={item} />
            ))}
          </div>
        )}

        {tab === "tourism" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {content.destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        )}

        {tab === "about" && (
          <Card className="p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Flag code={country.flag} name={country.name} className="h-8" />
              <h2 className="text-xl font-extrabold text-ink">{country.name}</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">{content.about.text}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {content.about.facts.map((f) => (
                <div key={f.label} className="rounded-xl bg-[var(--c-soft)] p-3.5">
                  <dt className="text-[11px] font-bold tracking-wide text-ink-faint uppercase">{f.label}</dt>
                  <dd className="mt-0.5 text-sm font-bold text-ink sm:text-base">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        )}
      </div>

      <Card className="mt-6 flex flex-col items-start gap-3 bg-gradient-to-r from-white to-[var(--c-soft)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
            <ExternalLink className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{t("explore.officialTitle", { country: country.name })}</p>
            <p className="text-xs text-ink-soft">{t("explore.officialDesc", { country: country.name })}</p>
          </div>
        </div>
        <ButtonLink href={content.officialSite.url} external variant="secondary" className="shrink-0 ring-brand/40">
          {t("explore.officialCta", { site: content.officialSite.label })} <ExternalLink className="size-4" />
        </ButtonLink>
      </Card>
    </>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <Card as="article" className="overflow-hidden">
      <div className="aspect-[16/10]">
        <Picture image={destination.image} scene={destination.scene} alt={destination.name} />
      </div>
      <div className="p-4">
        <h3 className="font-extrabold text-ink">{destination.name}</h3>
        <p className="text-sm text-ink-soft">{destination.summary}</p>
        {open && <p className="animate-fade-up mt-2 text-sm leading-relaxed text-ink-soft">{destination.description}</p>}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--c-accent)]"
        >
          {open ? t("explore.readLess") : t("explore.readMore")}
          <ChevronDown className={cn("size-3.5 transition", open && "rotate-180")} />
        </button>
      </div>
    </Card>
  );
}

function CultureCard({ item }: { item: CultureItem }) {
  return (
    <Card as="article" className="p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-extrabold text-ink">{item.name}</h3>
        {item.badge && (
          <span className="shrink-0 rounded-full bg-[var(--c-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--c-primary)]">
            {item.badge}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-sm font-semibold text-ink-soft">{item.summary}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
    </Card>
  );
}
