"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Gamepad2, MapPin } from "lucide-react";
import type { Country, CountryContent } from "@/types";
import { useT } from "@/lib/i18n";
import { ButtonLink, Card, Container } from "@/components/ui/primitives";
import { Flag } from "@/components/ui/Flag";
import { Picture } from "@/components/ui/Picture";
import { CountrySubnav } from "./CountrySubnav";

export function CountryHome({ country, content }: { country: Country; content?: CountryContent }) {
  const t = useT();
  const base = `/country/${country.slug}`;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Picture image={country.image} scene={country.scene} alt="" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <Container className="relative pt-10 pb-28 sm:pt-16 sm:pb-36">
          <div className="max-w-xl text-white">
            <Flag code={country.flag} name={country.name} className="h-8 shadow-md sm:h-10" />
            <p className="mt-5 text-2xl font-bold sm:text-3xl">{t("country.discover")}</p>
            <h1 className="text-5xl leading-none font-extrabold tracking-tight sm:text-7xl">
              {content?.heroTitle ?? country.name}
            </h1>
            <p className="mt-3 text-lg font-semibold sm:text-2xl">{content?.heroSubtitle ?? country.tagline}</p>
            {content && <p className="mt-3 max-w-md text-sm text-white/90 sm:text-base">{content.intro}</p>}
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <MapPin className="size-3.5" /> {t("country.booth", { id: country.booth })}
            </p>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 -mt-20 sm:-mt-24">
        {content ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
              <ActionCard
                href={`${base}/quiz`}
                icon={<Gamepad2 className="size-7" />}
                title={t("country.quizTitle")}
                desc={t("country.quizDesc")}
                className="bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-primary-dark)]"
              />
              <ActionCard
                href={`${base}/explore`}
                icon={<BookOpen className="size-7" />}
                title={t("country.exploreTitle", { country: country.name })}
                desc={t("country.exploreDesc")}
                className="bg-gradient-to-br from-[var(--c-accent)] to-[#0d3c8f]"
              />
            </div>
            <CountrySubnav country={country} className="mt-6" />
          </>
        ) : (
          <Card className="mx-auto max-w-xl p-6 text-center sm:p-8">
            <h2 className="text-lg font-extrabold text-ink">{t("country.comingSoonTitle")}</h2>
            <p className="mt-2 text-sm text-ink-soft">
              {t("country.comingSoonText", { country: country.name, booth: country.booth })}
            </p>
            <ButtonLink href="/map" variant="country" className="mt-5">
              <MapPin className="size-4" /> {t("country.findOnMap")}
            </ButtonLink>
          </Card>
        )}
      </Container>
    </>
  );
}

function ActionCard({
  href,
  icon,
  title,
  desc,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-2xl p-5 text-white shadow-lift ring-1 ring-white/20 transition hover:-translate-y-0.5 sm:p-6 ${className}`}
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-[var(--c-primary)] shadow-sm">{icon}</span>
      <span className="flex-1">
        <span className="block text-lg font-extrabold sm:text-xl">{title}</span>
        <span className="block text-sm text-white/90">{desc}</span>
      </span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/50 transition group-hover:translate-x-0.5">
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
