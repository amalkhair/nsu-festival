"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Clock, UtensilsCrossed, Users } from "lucide-react";
import type { Country, Food, FoodCategory } from "@/types";
import { useT } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/primitives";
import { FoodArt } from "./FoodArt";

const categoryKey: Record<FoodCategory, TranslationKey> = {
  main: "food.catMain",
  snack: "food.catSnack",
  dessert: "food.catDessert",
  drink: "food.catDrink",
};

/** One generic recipe page for every dish of every country. */
export function FoodDetail({ country, food }: { country: Country; food: Food }) {
  const t = useT();
  const [tab, setTab] = useState<"ingredients" | "steps">("ingredients");

  return (
    <>
      <Link
        href={`/country/${country.slug}/food`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="size-4" /> {t("food.back")}
      </Link>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="aspect-[4/3] md:aspect-auto md:min-h-80">
            {food.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={food.image} alt={food.name} className="h-full w-full object-cover" />
            ) : (
              <FoodArt palette={food.palette} category={food.category} title={food.name} />
            )}
          </div>
          <div className="p-5 sm:p-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{food.name}</h1>
            <p className="mt-1 text-sm font-semibold text-[var(--c-primary)]">{food.region}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{food.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
              <li className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
                <UtensilsCrossed className="size-3.5" /> {t(categoryKey[food.category])}
              </li>
              <li className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
                <Users className="size-3.5" /> {t("food.serves", { n: food.serves })}
              </li>
              <li className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
                <Clock className="size-3.5" /> {food.time}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line p-5 sm:p-7">
          <div role="tablist" className="grid grid-cols-2 gap-1 rounded-full bg-mist p-1">
            {(["ingredients", "steps"] as const).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  "rounded-full py-2 text-sm font-semibold transition",
                  tab === key ? "bg-[var(--c-accent)] text-white shadow-sm" : "text-ink-soft hover:text-ink",
                )}
              >
                {t(key === "ingredients" ? "food.ingredients" : "food.steps")}
              </button>
            ))}
          </div>

          {tab === "ingredients" ? (
            <ul className="animate-fade-up mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {food.ingredients.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-ink">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--c-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <ol className="animate-fade-up mt-5 space-y-3">
              {food.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--c-soft)] text-xs font-bold text-[var(--c-primary)]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </Card>
    </>
  );
}
