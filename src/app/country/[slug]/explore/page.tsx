import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCountry, getCountryContent } from "@/lib/api";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translate";
import { Container } from "@/components/ui/primitives";
import { T } from "@/components/ui/T";
import { ExploreView } from "@/components/country/ExploreView";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const country = await getCountry((await params).slug);
  return { title: country ? translate(await getLocale(), "explore.title", { country: country.name }) : "" };
}

export default async function ExplorePage({ params }: Params) {
  const { slug } = await params;
  const [country, content] = await Promise.all([getCountry(slug), getCountryContent(slug)]);
  if (!country || !content) notFound();
  return (
    <Container className="py-6 sm:py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <T k="explore.title" vars={{ country: country.name }} />
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft sm:text-base">
          <T k="explore.subtitle" />
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-white/60" />}>
        <ExploreView country={country} content={content} />
      </Suspense>
    </Container>
  );
}
