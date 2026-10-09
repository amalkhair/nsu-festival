"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/primitives";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "./nav";

export function SiteHeader() {
  const pathname = usePathname();
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label={t("nav.menu")} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition",
                  active ? "text-brand" : "text-ink-soft hover:text-ink",
                )}
              >
                {t(item.key)}
                {active && <span className="absolute inset-x-4 -bottom-[13px] h-0.5 rounded-full bg-brand" />}
              </Link>
            );
          })}
        </nav>
        <LanguageSwitcher />
      </Container>
    </header>
  );
}
