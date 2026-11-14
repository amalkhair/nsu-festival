import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translate";
import { getStandDetail } from "@/lib/api";
import { StandDetail } from "@/components/stand/StandDetail";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "china") permanentRedirect("/stand/china-15");
  const stand = await getStandDetail(slug);
  const locale = await getLocale();
  return {
    title: stand?.name ?? translate(locale, "stand.defaultTitle"),
    description: stand?.tagline || translate(locale, "stand.defaultDescription"),
  };
}

export default async function StandPage({ params }: Params) {
  const { slug } = await params;
  if (slug === "china") permanentRedirect("/stand/china-15");
  const stand = await getStandDetail(slug);
  if (!stand) notFound();
  return <StandDetail stand={stand} />;
}
