const items = [
  "Drop Athletics — disponible maintenant",
  "Hoodies 400 GSM brodés",
  "Jean terre craquelée — édition limitée",
  "14 jours pour changer d'avis",
];

/** Bandeau défilant gris sous le header. */
export function PromoStrip() {
  const row = [...items, ...items];
  return (
    <div className="group/p overflow-hidden bg-clay-100 py-2.5" aria-label={items.join(" · ")}>
      <div className="flex w-max animate-marquee group-hover/p:[animation-play-state:paused]" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="px-7 text-[12px] font-semibold uppercase tracking-[0.04em]">
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
