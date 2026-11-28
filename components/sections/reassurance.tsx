import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatPrice, site } from "@/lib/site";

const items = [
  { label: `Livraison offerte dès ${formatPrice(site.freeShippingThreshold).replace(",00", "")}`, href: "/legal/livraison" },
  { label: `${site.returnDays} jours pour changer d'avis`, href: "/legal/retours" },
  { label: "Paiement sécurisé", href: "/faq#paiement" },
  { label: "Né à Kirané, imaginé à Paris", href: "/notre-histoire" },
];

/** Bande de réassurance : quatre engagements, en capitales. */
export function Reassurance({ className }: { className?: string }) {
  return (
    <section aria-label="Nos engagements" className={cn("border-y border-clay-200", className)}>
      <ul className="mx-auto grid max-w-[1600px] grid-cols-2 md:grid-cols-4">
        {items.map((it, i) => (
          <li
            key={it.label}
            className={cn(
              "border-clay-200",
              i % 2 === 1 && "border-l",
              i < 2 && "border-b md:border-b-0",
              i === 2 && "md:border-l",
            )}
          >
            <Link
              href={it.href}
              className="flex h-full items-center justify-center px-3 py-4 text-center text-[11px] font-bold uppercase tracking-[0.04em] hover:text-terracotta md:py-[22px] md:text-[12px]"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
