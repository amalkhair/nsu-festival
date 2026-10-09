export type Locale = "en" | "ru";

/** Illustration variants used when no real photo is available yet. */
export type SceneVariant =
  | "temple"
  | "sea"
  | "volcano"
  | "stupa"
  | "savanna"
  | "lake"
  | "pagoda"
  | "palace"
  | "city"
  | "stage"
  | "festival";

export interface CountryTheme {
  /** Main accent used for buttons, highlights and the booth strip on the map. */
  primary: string;
  /** Darker shade for gradients and hover states. */
  primaryDark: string;
  /** Secondary accent (e.g. the "Explore" card). */
  accent: string;
  /** Very light tint for backgrounds. */
  soft: string;
}

export interface Country {
  slug: string;
  name: string;
  /** Adjective, e.g. "Indonesian". */
  demonym: string;
  /** ISO 3166-1 alpha-2 code, lowercase. Used for flags. */
  flag: string;
  booth: string;
  tags: string[];
  tagline: string;
  featured?: boolean;
  theme: CountryTheme;
  scene: SceneVariant;
  /** Optional real photo in /public, e.g. "/images/indonesia/hero.jpg". */
  image?: string;
  /** True when the country has full content (quiz, food, explore). */
  hasContent: boolean;
}

export interface FestivalDay {
  date: string; // ISO date, e.g. "2027-05-24"
  label: string; // "May 24"
  weekday: string; // "Sat"
}

export interface Stage {
  id: string;
  name: string;
}

export interface ScheduleItem {
  id: string;
  day: string; // ISO date
  start: string; // "10:00"
  end: string; // "10:30"
  title: string;
  stage: string; // Stage id
  country?: string; // ISO code for the flag
  scene: SceneVariant;
}

export type SessionStatus = "upcoming" | "ongoing" | "finished";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  fact: string;
  scene?: SceneVariant;
}

export type FoodCategory = "main" | "snack" | "dessert" | "drink";

export interface Food {
  slug: string;
  name: string;
  region: string;
  category: FoodCategory;
  summary: string;
  description: string;
  serves: number;
  time: string;
  ingredients: string[];
  steps: string[];
  /** Colours used for the illustrated plate until real photos are added. */
  palette: [string, string, string];
  image?: string;
}

export interface Destination {
  slug: string;
  name: string;
  summary: string;
  description: string;
  scene: SceneVariant;
  image?: string;
}

export interface CultureItem {
  slug: string;
  name: string;
  summary: string;
  description: string;
  /** Short badge like "UNESCO 2009". */
  badge?: string;
}

export interface Souvenir {
  id: string;
  title: string;
  scene: SceneVariant;
  image?: string;
}

export interface CountryContent {
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  quiz: QuizQuestion[];
  /** Minimum score needed to unlock the physical sticker. */
  rewardThreshold: number;
  /** Prefix for reward codes, e.g. "IDN". */
  rewardPrefix: string;
  souvenirs: Souvenir[];
  foods: Food[];
  culture: CultureItem[];
  destinations: Destination[];
  about: {
    text: string;
    facts: { label: string; value: string }[];
  };
  officialSite: { label: string; url: string };
}

export type MapFacilityType = "stage" | "food" | "info" | "toilet" | "medical" | "rest" | "entrance";

export interface MapFacility {
  id: string;
  type: MapFacilityType;
  label: string;
  x: number;
  y: number;
}

export interface MapBooth {
  id: string; // "B-01"
  country: string; // country slug
  x: number; // centre, in map units (0–1000)
  y: number; // centre, in map units (0–680)
}
