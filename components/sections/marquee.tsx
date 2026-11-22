import { Emblem } from "@/components/ui/brand";

const words = ["Force tranquille", "Élégance essentielle", "Né à Kirané", "Porté à Paris"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="group/mq relative overflow-hidden border-y border-ink/10 bg-terracotta py-4 text-clay-50" aria-label={words.join(" · ")}>
      <div className="flex w-max animate-marquee items-center group-hover/mq:[animation-play-state:paused]" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="px-7 font-display text-[2.4rem] md:text-[3.2rem]">{w}</span>
                <Emblem className="size-6 text-sand md:size-7" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
