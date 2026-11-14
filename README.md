# NSU International Cultural Festival — web app (prototype v0)

A festival website that works like an app on phones: home, interactive map, performance
schedule, country list, and a full country experience for Indonesia (quiz with rewards,
recipes, culture and tourism). Every country uses the same template, so adding Japan or
Korea is a matter of adding data, not pages.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Vercel. Docker for local dev.
**Data:** static TypeScript files for now, behind a data layer that will switch to Supabase.

---

## Run it

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. On your phone, open `http://<your-mac's-ip>:3000` on the same Wi-Fi.

Other commands: `npm run build` (production build), `npm start` (serve the build), `npm run typecheck`.

### With Docker

```bash
docker compose up                                # dev server with hot reload on :3000
docker compose --profile prod up --build prod    # production build on :3001
```

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. On vercel.com → **Add New → Project** → import the repository. Vercel detects Next.js; keep the defaults.
3. Click **Deploy**. You get a `*.vercel.app` link to share; add your own domain later under **Settings → Domains**.

Every push to `main` redeploys automatically, and every pull request gets its own preview link.

---

## Pages

| Route | What it is |
|---|---|
| `/` | Festival home: hero, feature cards, "on stage now", featured countries |
| `/map` | SVG festival map with filters, booth search, popups and zoom |
| `/schedule` | Timetable per day and stage, with the ongoing performance highlighted |
| `/countries` | Searchable grid of all participating countries |
| `/country/[slug]` | Country landing page in that country's colours |
| `/country/[slug]/quiz` | 5-question quiz with instant feedback and a fact after each answer |
| `/country/[slug]/quiz/result` | Score, confetti, downloadable souvenir photo, QR sticker code |
| `/country/[slug]/food` | Recipes with category filter |
| `/country/[slug]/food/[food]` | Recipe detail (ingredients / steps) |
| `/country/[slug]/explore` | Culture & traditions, tourism, about (tabs) |
| `/admin` | Placeholder listing what the organiser dashboard will become (not linked) |

Countries without content yet (everyone except Indonesia) show a "coming soon" page with their booth number.

> **Schedule preview time:** outside 24–25 May 2027 the schedule pretends it's 11:10 on Saturday,
> so the "Now" highlight is visible. Change `previewNow` in `src/data/festival.ts`.

## Project structure

```text
src/
├── app/                     Routes (each page.tsx fetches data, then renders a component)
├── components/
│   ├── layout/              Header, bottom nav (mobile), language switcher, footer
│   ├── festival/            Home, schedule, countries, country cards
│   ├── map/                 Interactive festival map
│   ├── country/             Country landing, sub-navigation, explore tabs
│   ├── quiz/                Quiz game, result, confetti
│   ├── food/                Recipe list, recipe detail, dish illustrations
│   └── ui/                  Primitives, flags, illustrated scenes, <T> translation helper
├── data/                    Static content (to be replaced by Supabase)
│   ├── festival.ts          Name, dates, venue, stages
│   ├── schedule.ts          Performances
│   ├── map.ts               Booth and facility coordinates
│   └── countries/
│       ├── list.ts          All countries: booth, colours, flag, tags
│       ├── content.ts       Registry of countries that have full content
│       └── indonesia/       quiz.ts · foods.ts · explore.ts · index.ts
├── lib/
│   ├── api/                 Data access layer — the ONLY place pages get data from
│   ├── i18n/                Translations, locale config, provider
│   ├── rewards/             Quiz results and reward codes (prototype, browser-only)
│   ├── time.ts              "Now" and upcoming/ongoing/finished logic
│   └── utils.ts
└── types/                   Shared TypeScript types
```

## Common changes

**Add a country's content**
1. Copy `src/data/countries/indonesia/` to e.g. `src/data/countries/japan/` and rewrite the content.
2. Register it in `src/data/countries/content.ts`.
3. The country already exists in `list.ts`; its pages switch from "coming soon" to the full experience.

**Add a country to the festival:** add an entry to `src/data/countries/list.ts` (pick theme colours and an
illustration `scene`) and a booth to `src/data/map.ts`.

**Use real photos:** see `public/images/README.md`. Until then, every image is an illustrated placeholder.

**Languages (English and Russian):** the visitor's language is stored in the `nsu-locale` cookie; on a first
visit it follows the browser language. The server reads it (`src/lib/i18n/server.ts`) and `src/lib/api` returns
content in that language. Where the text lives:
- Buttons and labels: `src/lib/i18n/dictionaries/en.ts` and `ru.ts` (a missing Russian key is a type error)
- Festival, schedule, stages and map labels: `src/data/ru/festival.ts`
- Country names and tags: `src/data/ru/countries.ts`
- Indonesia quiz, recipes, culture and places: `src/data/countries/indonesia/ru.ts`
Anything without a Russian version falls back to English. UI text is always pulled from the dictionaries, never
hard-coded in components.

**Edit the map:** booth and facility positions are in `src/data/map.ts` (the map is 1000 × 680 units).
The ground, paths and trees are drawn in `MapGround` inside `src/components/map/FestivalMap.tsx`;
replace it with the real site plan when you have it.

## Prototype limitations (on purpose)

- **Reward codes are not secure.** They're generated in the visitor's browser and "used once" is not
  enforced. Fine for a demo, not for handing out real stickers. See the roadmap.
- **The quiz is checked in the browser**, so answers are visible to anyone who looks at the code.
- **No database, no login, admin is a placeholder.**
- Flags load from flagcdn.com and the font from Google Fonts, so the site needs internet access.

## Roadmap

1. **UI prototype** ← you are here
2. **Real content:** photos, Indonesian booth team's own texts, more countries
3. **Supabase:** move `src/data` into tables; rewrite the functions in `src/lib/api` only
4. **Quiz API:** `POST /api/quiz/submit` checks answers on the server and issues a signed one-time token
5. **Reward redemption:** a staff scanner page that marks tokens as used
6. **Admin:** Supabase Auth for organisers and booth leads; editors for countries, schedule and map
7. **Multi-country CMS:** each booth team manages its own content
