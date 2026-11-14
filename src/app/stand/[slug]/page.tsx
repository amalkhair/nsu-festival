import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StandDetail } from "@/components/stand/StandDetail";
import { getStand, resolveStand } from "@/data/stands";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const stand = getStand(slug);
  return {
    title: stand?.translations.en?.name ?? "Festival Stand",
    description: stand?.translations.en?.tagline ?? "Explore a festival stand.",
  };
}

export default async function StandPage({ params }: Params) {
  const { slug } = await params;
  const stand = getStand(slug);
  if (!stand || stand.status !== "published") notFound();
  return <StandDetail stand={resolveStand(stand, "en")} />;
}
