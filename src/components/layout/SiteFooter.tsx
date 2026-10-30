"use client";

import { useT } from "@/lib/i18n";
import { Container } from "@/components/ui/primitives";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="mt-16 hidden border-t border-line/70 py-8 text-sm text-ink-soft md:block">
      <Container className="flex items-center justify-between gap-4">
        <p>
          <span className="font-semibold text-ink">{t("brand.name")}</span> · {t("footer.tagline")}
        </p>
        <p className="text-xs text-ink-faint">{t("footer.prototype")}</p>
      </Container>
    </footer>
  );
}
