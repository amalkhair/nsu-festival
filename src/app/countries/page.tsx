import type { Metadata } from "next";
import { getCountries } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { CountriesView } from "@/components/festival/CountriesView";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Countries" };

export default async function CountriesPage() {
  const countries = await getCountries();
  return (
    <Container className="py-6 sm:py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <T k="countries.title" />
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft sm:text-base">
          <T k="countries.subtitle" />
        </p>
      </div>
      <CountriesView countries={countries} />
    </Container>
  );
}
