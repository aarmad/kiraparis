import Link from "next/link";
import { Emblem, Logo } from "@/components/ui/brand";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { PaymentIcons } from "@/components/ui/payment-icons";

const columns = [
  {
    title: "Boutique",
    links: [
      { href: "/collections/athletics", label: "Athletics" },
      { href: "/collections/hunter", label: "Hunter" },
      { href: "/collections/denim", label: "Denim" },
      { href: "/collections/essentiels", label: "Essentiels" },
      { href: "/collections", label: "Tout voir" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/legal/livraison", label: "Livraison" },
      { href: "/legal/retours", label: "Retours & remboursements" },
      { href: "/suivre-ma-commande", label: "Suivre ma commande" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Maison",
    links: [
      { href: "/notre-histoire", label: "Notre histoire" },
      { href: site.instagram, label: "Instagram", external: true },
      { href: site.tiktok, label: "TikTok", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-chestnut text-clay-50">
      <div className="cracked-earth pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative z-[2] mx-auto max-w-[1600px] px-4 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-xl">
            <p className="label-mono text-sand">Le prochain drop</p>
            <h2 className="mt-4 font-display text-[3.2rem] md:text-[5rem]">Il part vite.</h2>
            <p className="mt-4 max-w-md text-clay-50/75">
              Inscris-toi pour y accéder en premier et reçois -10&nbsp;% sur ta première commande.
            </p>
            <NewsletterForm tone="dark" className="mt-7" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label-mono text-clay-50/55">{col.title}</h3>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {col.links.map((l) =>
                    "external" in l ? (
                      <li key={l.label}>
                        <a href={l.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-sand">
                          {l.label} ↗
                        </a>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <Link href={l.href} className="transition-colors hover:text-sand">
                          {l.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-clay-50/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Emblem className="size-7 text-sand" />
            <p className="font-serif text-xl italic">Né à Kirané. Porté à Paris.</p>
          </div>
          <div>
            <p className="label-mono mb-2.5 text-clay-50/55 lg:text-right">Paiement sécurisé</p>
            <PaymentIcons className="lg:justify-end" />
          </div>
        </div>

        <Logo className="mt-10 block w-full text-clay-50/[0.07]" title="" />

        <div className="flex flex-col gap-3 border-t border-clay-50/15 py-6 text-[12px] text-clay-50/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legal.company}. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/legal/mentions-legales" className="hover:text-clay-50">Mentions légales</Link></li>
            <li><Link href="/legal/cgv" className="hover:text-clay-50">CGV</Link></li>
            <li><Link href="/legal/confidentialite" className="hover:text-clay-50">Confidentialité</Link></li>
            <li><Link href="/legal/retours" className="hover:text-clay-50">Droit de rétractation</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
