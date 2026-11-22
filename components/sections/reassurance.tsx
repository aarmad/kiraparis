import Link from "next/link";
import { cn as clsx } from "@/lib/cn";
import { Lock, MessageCircle, RotateCcw, Truck } from "lucide-react";
import { formatPrice, site } from "@/lib/site";

export const reassuranceItems = [
  {
    icon: Truck,
    title: `Livraison offerte dès ${formatPrice(site.freeShippingThreshold).replace(",00", "")}`,
    text: `En France métropolitaine. Livrée en ${site.deliveryFrance}.`,
    href: "/legal/livraison",
  },
  {
    icon: RotateCcw,
    title: `${site.returnDays} jours pour changer d'avis`,
    text: "Échange de taille possible, dans la limite des stocks.",
    href: "/legal/retours",
  },
  {
    icon: Lock,
    title: "Paiement sécurisé",
    text: "Carte bancaire, PayPal, Apple Pay, Google Pay, Shop Pay.",
    href: "/faq#paiement",
  },
  {
    icon: MessageCircle,
    title: "Une question ?",
    text: "Écris-nous, on te répond dans les plus brefs délais.",
    href: "/contact",
  },
];

export function Reassurance({ className }: { className?: string }) {
  return (
    <section aria-label="Nos engagements" className={clsx("border-y border-ink/10 bg-clay-100", className)}>
      <ul className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-ink/10 px-4 sm:grid-cols-2 sm:divide-y-0 md:px-8 lg:grid-cols-4 lg:divide-x">
        {reassuranceItems.map(({ icon: Icon, title, text, href }) => (
          <li key={title}>
            <Link href={href} className="group/r flex items-start gap-4 py-6 lg:px-6 lg:first:pl-0">
              <Icon className="mt-0.5 size-5 shrink-0 text-terracotta" strokeWidth={1.6} />
              <span>
                <span className="block font-semibold group-hover/r:underline group-hover/r:underline-offset-4">{title}</span>
                <span className="mt-0.5 block text-[14px] text-muted">{text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
