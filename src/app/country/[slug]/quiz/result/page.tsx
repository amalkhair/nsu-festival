import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry, getCountryContent, getFestival } from "@/lib/api";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translate";
import { Container } from "@/components/ui/primitives";
import { QuizResult } from "@/components/quiz/QuizResult";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return { title: translate(await getLocale(), "meta.result") };
}

export default async function QuizResultPage({ params }: Params) {
  const { slug } = await params;
  const [country, content, festival] = await Promise.all([getCountry(slug), getCountryContent(slug), getFestival()]);
  if (!country || !content) notFound();
  return (
    <Container className="max-w-3xl py-6 sm:py-10">
      <QuizResult country={country} content={content} year={festival.year} />
    </Container>
  );
}
