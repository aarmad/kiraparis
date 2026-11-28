import type { Metadata } from "next";
import { PromoStrip } from "@/components/sections/promo-strip";
import { HeroSplit } from "@/components/sections/hero-split";
import { FeaturedGrid } from "@/components/sections/featured-grid";
import { Reassurance } from "@/components/sections/reassurance";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { DropCards } from "@/components/sections/drop-cards";
import { StoryStrip } from "@/components/sections/story-strip";

export const metadata: Metadata = {
  title: { absolute: "KIRA Paris — Streetwear né à Kirané · Drop Kira Athletics" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <PromoStrip />
      <HeroSplit />
      <FeaturedGrid />
      <Reassurance className="mt-10" />
      <CategoryTiles />
      <DropCards />
      <StoryStrip />
    </>
  );
}
