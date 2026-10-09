import { HomeView } from "@/components/festival/HomeView";
import { getCountries, getFeaturedCountries, getFestival, getSchedule } from "@/lib/api";

export default async function HomePage() {
  const [festival, featured, countries, schedule] = await Promise.all([
    getFestival(),
    getFeaturedCountries(),
    getCountries(),
    getSchedule(),
  ]);
  const stageNames = Object.fromEntries(festival.stages.map((s) => [s.id, s.name]));

  return (
    <HomeView
      festival={{
        name: festival.name,
        tagline: festival.tagline,
        venue: festival.venue,
        dateLabel: festival.dateLabel,
        hours: festival.hours,
      }}
      featured={featured}
      countryCount={Math.floor(countries.length / 10) * 10 || countries.length}
      schedule={schedule}
      stageNames={stageNames}
    />
  );
}
