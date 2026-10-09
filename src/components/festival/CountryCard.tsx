import Link from "next/link";
import type { Country } from "@/types";
import { cn } from "@/lib/utils";
import { Flag } from "@/components/ui/Flag";
import { Picture } from "@/components/ui/Picture";

export function CountryCard({
  country,
  boothLabel,
  className,
}: {
  country: Country;
  /** Already-translated "Booth B-01"; omit to hide. */
  boothLabel?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className={cn(
        "group block overflow-hidden rounded-card bg-white shadow-card ring-1 ring-line/70 transition hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Picture
          image={country.image}
          scene={country.scene}
          alt={country.name}
          className="transition duration-500 group-hover:scale-105"
        />
        <Flag code={country.flag} className="absolute bottom-2 left-2 h-5 shadow-sm" />
      </div>
      <div className="px-3 py-2.5">
        <p className="text-sm font-bold text-ink">{country.name}</p>
        {boothLabel && <p className="text-xs text-ink-faint">{boothLabel}</p>}
      </div>
    </Link>
  );
}
