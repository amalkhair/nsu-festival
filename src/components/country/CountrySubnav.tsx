"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Country } from "@/types";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Food & Recipes | Culture & Traditions | Tourism | About — shared by all country pages. */
export function CountrySubnav({ country, className }: { country: Country; className?: string }) {
  return (
    <Suspense fallback={<SubnavInner country={country} className={className} tab={null} />}>
      <SubnavWithParams country={country} className={className} />
    </Suspense>
  );
}

function SubnavWithParams({ country, className }: { country: Country; className?: string }) {
  const tab = useSearchParams().get("tab");
  return <SubnavInner country={country} className={className} tab={tab} />;
}

function SubnavInner({ country, className, tab }: { country: Country; className?: string; tab: string | null }) {
  const t = useT();
  const pathname = usePathname();
  const base = `/country/${country.slug}`;
  const onExplore = pathname.startsWith(`${base}/explore`);

  const items = [
    { href: `${base}/food`, label: t("country.tabFood"), active: pathname.startsWith(`${base}/food`) },
    { href: `${base}/explore?tab=culture`, label: t("country.tabCulture"), active: onExplore && (tab ?? "culture") === "culture" },
    { href: `${base}/explore?tab=tourism`, label: t("country.tabTourism"), active: onExplore && tab === "tourism" },
    { href: `${base}/explore?tab=about`, label: t("country.tabAbout", { country: country.name }), active: onExplore && tab === "about" },
  ];

  return (
    <nav className={cn("scrollbar-none overflow-x-auto", className)}>
      <ul className="mx-auto flex w-max min-w-full gap-1 rounded-full bg-white p-1 shadow-card ring-1 ring-line sm:w-auto">
        {items.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              scroll={false}
              className={cn(
                "block rounded-full px-4 py-2 text-center text-sm font-semibold whitespace-nowrap transition",
                item.active ? "bg-[var(--c-primary)] text-white" : "text-ink-soft hover:bg-[var(--c-soft)] hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
