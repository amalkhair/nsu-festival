"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Globe, House, Map as MapIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { navItems } from "./nav";

const icons = [House, MapIcon, CalendarDays, Globe];

/** Fixed bottom navigation on phones, so visitors can switch views while walking around. */
export function BottomNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav
      aria-label={t("nav.menu")}
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {navItems.map((item, i) => {
          const Icon = icons[i];
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 pt-2.5 pb-1 text-[11px] font-semibold transition",
                  active ? "text-brand" : "text-ink-faint",
                )}
              >
                <span className={cn("grid h-7 w-12 place-items-center rounded-full transition", active && "bg-brand-soft")}>
                  <Icon className="size-[19px]" strokeWidth={active ? 2.4 : 2} />
                </span>
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
