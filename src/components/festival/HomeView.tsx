"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Globe, MapPin, Music, UtensilsCrossed } from "lucide-react";
import type { Country, ScheduleItem } from "@/types";
import { useT } from "@/lib/i18n";
import { getFestivalNow, getStatus, toISODate } from "@/lib/time";
import { ButtonLink, Card, Container } from "@/components/ui/primitives";
import { Scene } from "@/components/ui/Scene";
import { Flag } from "@/components/ui/Flag";
import { CountryCard } from "./CountryCard";

interface Props {
  festival: { name: string; tagline: string; venue: string; dateLabel: string; hours: string };
  featured: Country[];
  countryCount: number;
  schedule: ScheduleItem[];
  stageNames: Record<string, string>;
}

export function HomeView({ festival, featured, countryCount, schedule, stageNames }: Props) {
  const t = useT();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(getFestivalNow()), []);

  const today = now ? schedule.filter((s) => s.day === toISODate(now) && s.stage === "main") : [];
  const current = now ? today.find((s) => getStatus(s, now) === "ongoing") : undefined;
  const next = now ? today.find((s) => getStatus(s, now) === "upcoming") : undefined;

  const features = [
    { icon: Globe, color: "bg-brand", title: t("home.featureCountriesTitle", { n: countryCount }), desc: t("home.featureCountriesDesc"), href: "/countries" },
    { icon: Music, color: "bg-[#ef476f]", title: t("home.featurePerformancesTitle"), desc: t("home.featurePerformancesDesc"), href: "/schedule" },
    { icon: UtensilsCrossed, color: "bg-[#ff9f1c]", title: t("home.featureFoodTitle"), desc: t("home.featureFoodDesc"), href: "/map" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Scene variant="festival" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f6b]/90 via-[#1a2f8a]/60 to-transparent" />
        </div>
        <Container className="relative py-12 sm:py-20 lg:py-24">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">{festival.name}</h1>
            <p className="mt-3 text-lg font-medium text-white/90 sm:text-xl">{festival.tagline}</p>
            <ul className="mt-5 space-y-2 text-sm text-white/90 sm:text-base">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" /> {festival.venue}
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="size-4 shrink-0" /> {festival.dateLabel} | {festival.hours}
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/map" className="px-6 py-3 ring-2 ring-white/70">
                {t("home.ctaMap")} <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/schedule" variant="secondary" className="px-6 py-3">
                {t("home.ctaSchedule")} <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        {/* Feature cards overlap the hero */}
        <div className="relative z-10 -mt-8 grid gap-3 sm:-mt-10 sm:grid-cols-3 sm:gap-4">
          {features.map(({ icon: Icon, color, title, desc, href }) => (
            <Link key={title} href={href} className="group">
              <Card className="flex items-center gap-4 p-4 transition group-hover:-translate-y-0.5 group-hover:shadow-lift sm:p-5">
                <span className={`grid size-12 shrink-0 place-items-center rounded-full text-white ${color}`}>
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block font-bold text-ink">{title}</span>
                  <span className="block text-sm text-ink-soft">{desc}</span>
                </span>
              </Card>
            </Link>
          ))}
        </div>

        {/* Live strip */}
        {(current || next) && (
          <Card className="mt-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              {current && <LiveItem label={t("home.onStage")} item={current} stage={stageNames[current.stage]} live />}
              {next && <LiveItem label={t("home.nextUp")} item={next} stage={stageNames[next.stage]} />}
            </div>
            <Link href="/schedule" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              {t("home.fullSchedule")} <ArrowRight className="size-4" />
            </Link>
          </Card>
        )}

        {/* Featured countries */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{t("home.featured")}</h2>
            <Link href="/countries" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              {t("home.seeAll")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="scrollbar-none -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
            {featured.map((c) => (
              <CountryCard key={c.slug} country={c} className="w-36 shrink-0 snap-start sm:w-auto" />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function LiveItem({ label, item, stage, live }: { label: string; item: ScheduleItem; stage: string; live?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex size-2.5">
        {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ef476f] opacity-75" />}
        <span className={`relative inline-flex size-2.5 rounded-full ${live ? "bg-[#ef476f]" : "bg-ink-faint"}`} />
      </span>
      <div>
        <p className="text-[11px] font-bold tracking-wide text-ink-faint uppercase">{label}</p>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="tabular-nums text-ink-soft">{item.start}</span>
          {item.country && <Flag code={item.country} className="h-3.5" />}
          {item.title}
          <span className="hidden font-normal text-ink-faint sm:inline">· {stage}</span>
        </p>
      </div>
    </div>
  );
}
