import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur une commande, une taille ou un drop ? Écris à KIRA Paris.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-14 px-4 pb-24 pt-10 md:grid-cols-12 md:px-8 md:pt-16">
      <div className="md:col-span-5">
        <p className="label-mono text-terracotta">Contact</p>
        <h1 className="mt-3 font-display text-[4.6rem] md:text-[7rem]">Écris-nous</h1>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft">
          Une question sur une commande, une taille ou le prochain drop&nbsp;? On te répond dans les plus brefs délais.
        </p>
        <a href={`mailto:${site.email}`} className="mt-8 inline-flex items-center gap-3 text-lg font-semibold underline underline-offset-[6px] hover:text-terracotta">
          <Mail className="size-5" /> {site.email}
        </a>
        <div className="mt-12 space-y-6 border-t border-ink/10 pt-8 text-[15px]">
          <p>
            <span className="label-mono block text-muted">Suivre une commande</span>
            <Link href="/suivre-ma-commande" className="underline underline-offset-4">Saisir mon numéro de suivi</Link>
          </p>
          <p>
            <span className="label-mono block text-muted">Retours</span>
            Indique ton numéro de commande dans ton message, on s&apos;occupe du reste.
          </p>
          <p>
            <span className="label-mono block text-muted">Réseaux</span>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="underline underline-offset-4">Instagram</a>
            {" · "}
            <a href={site.tiktok} target="_blank" rel="noreferrer" className="underline underline-offset-4">TikTok</a>
          </p>
        </div>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <ContactForm />
      </div>
    </div>
  );
}
