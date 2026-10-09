import type { CountryContent } from "@/types";
import { quiz } from "./quiz";
import { foods } from "./foods";
import { culture, destinations, souvenirs } from "./explore";

export const indonesia: CountryContent = {
  slug: "indonesia",
  heroTitle: "Indonesia",
  heroSubtitle: "A Thousand Islands, Endless Stories",
  intro:
    "Explore our rich culture, delicious food, unique traditions, and breathtaking destinations.",
  quiz,
  rewardThreshold: 3,
  rewardPrefix: "IDN",
  souvenirs,
  foods,
  culture,
  destinations,
  about: {
    text: "Indonesia is the world's largest archipelago, stretching across the equator between the Indian and Pacific Oceans. It is home to hundreds of ethnic groups and languages, united by the national language, Bahasa Indonesia, and the motto Bhinneka Tunggal Ika: Unity in Diversity.",
    facts: [
      { label: "Capital", value: "Jakarta" },
      { label: "Population", value: "≈ 280 million" },
      { label: "Islands", value: "17,000+" },
      { label: "Languages", value: "Indonesian + 700 regional" },
      { label: "Currency", value: "Rupiah (IDR)" },
      { label: "Provinces", value: "38" },
    ],
  },
  officialSite: { label: "indonesia.travel", url: "https://www.indonesia.travel" },
};
