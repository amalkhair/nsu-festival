import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountries, getCountry, getCountryContent } from "@/lib/api";
import { CountryHome } from "@/components/country/CountryHome";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCountries()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const country = await getCountry((await params).slug);
  return { title: country ? `Discover ${country.name}` : "Country" };
}

export default async function CountryPage({ params }: Params) {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) notFound();
  const content = await getCountryContent(slug);
  return <CountryHome country={country} content={content} />;
}
