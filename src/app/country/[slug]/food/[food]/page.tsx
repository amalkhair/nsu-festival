import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry, getFood } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { FoodDetail } from "@/components/food/FoodDetail";

type Params = { params: Promise<{ slug: string; food: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, food } = await params;
  const item = await getFood(slug, food);
  return { title: item?.name ?? "" };
}

export default async function FoodDetailPage({ params }: Params) {
  const { slug, food: foodSlug } = await params;
  const [country, food] = await Promise.all([getCountry(slug), getFood(slug, foodSlug)]);
  if (!country || !food) notFound();
  return (
    <Container className="max-w-5xl py-6 sm:py-10">
      <FoodDetail country={country} food={food} />
    </Container>
  );
}
