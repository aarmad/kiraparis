import Link from "next/link";
import { Logo } from "@/components/ui/brand";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { PaymentIcons } from "@/components/ui/payment-icons";

const columns = [
  {
    title: "Boutique",
    links: [
      { href: "/collections?tri=nouveautes", label: "Nouveautés" },
      { href: "/collections?categorie=ensembles", label: "Ensembles" },
      { href: "/collections?categorie=hoodies", label: "Hoodies" },
      { href: "/collections?categorie=pantalons", label: "Pantalons & denim" },
      { href: "/collections", label: "Tout voir" },
    ],
  },
  {
    title: "Service client",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/suivre-ma-commande", label: "Suivre ma commande" },
      { href: "/legal/livraison", label: "Livraison" },
      { href: "/legal/retours", label: "Retours & échanges" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "KIRA",
    links: [
      { href: "/notre-histoire", label: "Notre histoire" },
      { href: "/collections/athletics", label: "Drop Athletics" },
      { href: site.instagram, label: "Instagram", external: true },
      { href: site.tiktok, label: "TikTok", external: true },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/legal/mentions-legales", label: "Mentions légales" },
      { href: "/legal/cgv", label: "CGV" },
      { href: "/legal/confidentialite", label: "Confidentialité" },
      { href: "/legal/retours", label: "Droit de rétractation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-4 bg-clay-100 text-ink">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <div className="flex flex-col gap-6 border-b border-clay-300 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-[16px] md:text-[18px]">Rejoins le mouvement</h2>
            <p className="mt-1 text-[14px] text-ink-soft">Accès en avant-première au prochain drop et -10 % sur ta première commande.</p>
          </div>
          <NewsletterForm className="w-full md:w-[460px]" />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.04em]">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-[14px] text-ink-soft">
                {col.links.map((l) =>
                  "external" in l ? (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link href={l.href} className="hover:text-ink hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-clay-300 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-[18px]" />
            <p className="text-[12px] text-ink-soft">© {new Date().getFullYear()}, {site.legal.company}.</p>
          </div>
          <PaymentIcons size="sm" />
        </div>
      </div>
    </footer>
  );
}
