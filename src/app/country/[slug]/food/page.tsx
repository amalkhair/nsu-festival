import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry, getCountryContent } from "@/lib/api";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translate";
import { Container } from "@/components/ui/primitives";
import { T } from "@/components/ui/T";
import { CountrySubnav } from "@/components/country/CountrySubnav";
import { FoodList } from "@/components/food/FoodList";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const country = await getCountry((await params).slug);
  return { title: country ? translate(await getLocale(), "food.title", { demonym: country.demonym }) : "" };
}

export default async function FoodPage({ params }: Params) {
  const { slug } = await params;
  const [country, content] = await Promise.all([getCountry(slug), getCountryContent(slug)]);
  if (!country || !content) notFound();
  return (
    <Container className="py-6 sm:py-10">
      <CountrySubnav country={country} className="mb-6" />
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <T k="food.title" vars={{ demonym: country.demonym }} />
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft sm:text-base">
          <T k="food.subtitle" vars={{ country: country.name }} />
        </p>
      </div>
      <FoodList country={country} foods={content.foods} />
    </Container>
  );
}
