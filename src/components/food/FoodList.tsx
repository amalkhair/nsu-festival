"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Country, Food, FoodCategory } from "@/types";
import { useT } from "@/lib/i18n";
import { Pills } from "@/components/ui/primitives";
import { FoodArt } from "./FoodArt";

type Filter = "all" | FoodCategory;

export function FoodList({ country, foods }: { country: Country; foods: Food[] }) {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = foods.filter((f) => filter === "all" || f.category === filter);

  const options: { value: Filter; label: string }[] = [
    { value: "all", label: t("food.catAll") },
    { value: "main", label: t("food.catMain") },
    { value: "snack", label: t("food.catSnack") },
    { value: "dessert", label: t("food.catDessert") },
    { value: "drink", label: t("food.catDrink") },
  ];

  return (
    <>
      <Pills options={options} value={filter} onChange={setFilter} tone="country" label={t("food.title", { demonym: country.demonym })} />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((food) => (
          <Link
            key={food.slug}
            href={`/country/${country.slug}/food/${food.slug}`}
            className="group animate-fade-up overflow-hidden rounded-card bg-white shadow-card ring-1 ring-line/70 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {food.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={food.image} alt={food.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <FoodArt palette={food.palette} category={food.category} title={food.name} className="transition duration-500 group-hover:scale-105" />
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink sm:text-base">{food.name}</p>
                <p className="truncate text-xs text-ink-soft">{food.region}</p>
              </div>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--c-soft)] text-[var(--c-primary)] transition group-hover:bg-[var(--c-primary)] group-hover:text-white">
                <ChevronRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {visible.length === 0 && <p className="py-10 text-center text-sm text-ink-faint">{t("food.empty")}</p>}
    </>
  );
}
