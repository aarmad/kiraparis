import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Suivre ma commande",
  alternates: { canonical: "/suivre-ma-commande" },
};

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-10 md:pt-20">
      <p className="label-mono text-terracotta">Commande</p>
      <h1 className="mt-3 font-display text-[28px] md:text-[36px]">Où est mon colis&nbsp;?</h1>
      <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
        Ton numéro de suivi t&apos;est envoyé par email dès l&apos;expédition. Saisis-le ci-dessous pour connaître l&apos;état de ta
        livraison.
      </p>
      <form className="mt-10 flex flex-col gap-3 sm:flex-row" action="#" aria-describedby="track-note">
        <label htmlFor="tracking" className="sr-only">Numéro de suivi</label>
        <input id="tracking" name="tracking" required placeholder="Numéro de suivi" className="h-12 flex-1 border border-ink/25 bg-transparent px-4 focus:border-ink focus:outline-none" />
        <button type="submit" className={buttonClass("ink")} disabled>
          Suivre
        </button>
      </form>
      <p id="track-note" className="mt-3 text-[13px] text-muted">
        Prototype : le suivi sera relié à l&apos;outil de suivi utilisé par la boutique (ou aux pages de commande Shopify).
      </p>
      <p className="mt-10 text-[15px]">
        Un souci avec ta livraison ?{" "}
        <Link href="/contact" className="font-semibold underline underline-offset-4">Contacte-nous</Link>.
      </p>
    </div>
  );
}
