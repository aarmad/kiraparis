/* eslint-disable @next/next/no-img-element -- petits SVG statiques, next/image inutile */
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/** Logos officiels des moyens de paiement (icônes Shopify, 38×24). */
export function PaymentIcons({
  only = "all",
  className,
  size = "md",
}: {
  only?: "all" | "main";
  className?: string;
  size?: "sm" | "md";
}) {
  const list = site.payments.filter((p) => only === "all" || p.main);
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label="Moyens de paiement acceptés">
      {list.map((p) => (
        <li key={p.id}>
          <img
            src={`/images/icons/payments/${p.id}.svg`}
            alt={p.label}
            title={p.label}
            width={38}
            height={24}
            loading="lazy"
            className={cn("block rounded-[3px] bg-white", size === "sm" ? "h-[20px] w-auto" : "h-6 w-auto")}
          />
        </li>
      ))}
    </ul>
  );
}
