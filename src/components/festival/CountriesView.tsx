"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Country } from "@/types";
import { useT } from "@/lib/i18n";
import { CountryCard } from "./CountryCard";

export function CountriesView({ countries }: { countries: Country[] }) {
  const t = useT();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = countries.filter((c) => !q || `${c.name} ${c.booth} ${c.tags.join(" ")}`.toLowerCase().includes(q));

  return (
    <>
      <label className="relative mb-6 block max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("countries.search")}
          className="w-full rounded-full bg-white py-3 pr-4 pl-11 text-sm text-ink shadow-card ring-1 ring-line outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-brand"
        />
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((c) => (
          <CountryCard key={c.slug} country={c} boothLabel={t("countries.booth", { id: c.booth })} />
        ))}
      </div>
      {visible.length === 0 && <p className="py-10 text-center text-sm text-ink-faint">{t("countries.empty", { q: query })}</p>}
    </>
  );
}
