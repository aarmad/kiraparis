import Link from "next/link";
import { Emblem } from "@/components/ui/brand";

export function StoryStrip() {
  return (
    <section aria-labelledby="story-t" className="mx-auto max-w-[1600px] px-4 py-20 md:px-6 md:py-24">
      <div className="grid gap-6 md:grid-cols-12 md:items-center">
        <Emblem className="size-14 text-terracotta md:col-span-2 md:size-24" />
        <h2 id="story-t" className="font-display text-[24px] leading-[1.12] md:col-span-6 md:text-[34px]">
          KIRA vient de Kirané, un village du Mali. On ne dilue pas ses racines : on les porte.
        </h2>
        <div className="flex flex-col gap-4 md:col-span-3 md:col-start-10">
          <p className="text-ink-soft">
            La culture soninké est riche, élégante, intemporelle — et trop peu représentée. KIRA Paris la fait vivre dans le
            présent, dans la rue, sur toi.
          </p>
          <Link href="/notre-histoire" className="self-start border-b border-ink text-[12px] font-bold uppercase tracking-[0.04em] hover:border-terracotta hover:text-terracotta">
            Notre histoire →
          </Link>
        </div>
      </div>
    </section>
  );
}
