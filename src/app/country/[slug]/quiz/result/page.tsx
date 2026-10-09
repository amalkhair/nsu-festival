import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry, getCountryContent, getCountrySlugsWithContent, getFestival } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { QuizResult } from "@/components/quiz/QuizResult";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCountrySlugsWithContent()).map((slug) => ({ slug }));
}

export const metadata: Metadata = { title: "Quiz Result" };

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
