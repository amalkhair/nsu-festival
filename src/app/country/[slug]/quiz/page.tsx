import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry, getCountryContent, getCountrySlugsWithContent } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { QuizGame } from "@/components/quiz/QuizGame";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCountrySlugsWithContent()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const country = await getCountry((await params).slug);
  return { title: country ? `${country.name} Quiz` : "Quiz" };
}

export default async function QuizPage({ params }: Params) {
  const { slug } = await params;
  const [country, content] = await Promise.all([getCountry(slug), getCountryContent(slug)]);
  if (!country || !content) notFound();
  return (
    <Container className="max-w-2xl py-6 sm:py-10">
      <QuizGame country={country} questions={content.quiz} />
    </Container>
  );
}
