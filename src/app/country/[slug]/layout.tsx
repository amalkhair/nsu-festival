import { notFound } from "next/navigation";
import { getCountry } from "@/lib/api";
import { themeStyle } from "@/lib/utils";

/** Applies the country's colour theme to every page under /country/[slug]. */
export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) notFound();
  return <div style={themeStyle(country.theme)}>{children}</div>;
}
