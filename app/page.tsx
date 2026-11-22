import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { DropGrid } from "@/components/sections/drop-grid";
import { Manifesto } from "@/components/sections/manifesto";
import { HunterShowcase } from "@/components/sections/collection-showcase";
import { DenimFeature } from "@/components/sections/denim-feature";
import { Craft } from "@/components/sections/craft";
import { Reassurance } from "@/components/sections/reassurance";

export const metadata: Metadata = {
  title: { absolute: "KIRA Paris — Streetwear né à Kirané · Drop Kira Athletics" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <DropGrid />
      <Manifesto />
      <HunterShowcase />
      <Craft />
      <DenimFeature />
      <Reassurance />
    </>
  );
}
