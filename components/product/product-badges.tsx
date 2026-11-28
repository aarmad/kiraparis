import { cn } from "@/lib/cn";
import type { Product } from "@/lib/commerce/types";
import { isSoldOut } from "@/lib/commerce";

/** Badges discrets. N'affiche que des informations réelles du catalogue. */
export function ProductBadges({ product, className }: { product: Product; className?: string }) {
  const items: { label: string; tone: string }[] = [];
  if (isSoldOut(product)) items.push({ label: "Épuisé", tone: "bg-ink text-clay-50" });
  if (product.badges.includes("edition-limitee")) items.push({ label: "Édition limitée", tone: "bg-terracotta text-clay-50" });
  if (product.badges.includes("nouveau")) items.push({ label: "Nouveau", tone: "bg-clay-50 text-ink" });
  if (!items.length) return null;
  return (
    <div className={cn("pointer-events-none flex flex-col items-start gap-1", className)}>
      {items.map((b) => (
        <span key={b.label} className={cn("label-mono px-1.5 py-[3px] !text-[10px]", b.tone)}>
          {b.label}
        </span>
      ))}
    </div>
  );
}
