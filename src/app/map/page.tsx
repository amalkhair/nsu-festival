import type { Metadata } from "next";
import { getCountries, getMap } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { FestivalMap } from "@/components/map/FestivalMap";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Festival Map" };

export default async function MapPage() {
  const [countries, { booths, facilities }] = await Promise.all([getCountries(), getMap()]);
  return (
    <Container className="py-6 sm:py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <T k="map.title" />
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft sm:text-base">
          <T k="map.subtitle" />
        </p>
      </div>
      <FestivalMap countries={countries} booths={booths} facilities={facilities} />
    </Container>
  );
}
