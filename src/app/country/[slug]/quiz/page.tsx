import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry, getCountryContent } from "@/lib/api";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translate";
import { Container } from "@/components/ui/primitives";
import { QuizGame } from "@/components/quiz/QuizGame";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const country = await getCountry((await params).slug);
  const quiz = translate(await getLocale(), "country.quizTitle");
  return { title: country ? `${country.name}: ${quiz}` : quiz };
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
