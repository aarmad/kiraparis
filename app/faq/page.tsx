import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/faq";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ — Livraison, retours, tailles, paiement",
  description: "Toutes les réponses sur la livraison, les retours, les tailles et le paiement chez KIRA Paris.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((s) =>
      s.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    ),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 pb-24 pt-10 md:grid-cols-12 md:px-8 md:pt-16">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <p className="label-mono text-terracotta">Aide</p>
            <h1 className="mt-3 font-display text-[28px] md:text-[36px]">FAQ</h1>
            <nav aria-label="Rubriques" className="mt-8">
              <ul className="space-y-2 text-[15px]">
                {faq.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="hover:text-terracotta">{s.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 bg-clay-100 p-6">
              <p className="text-[18px] font-semibold">Pas trouvé ta réponse&nbsp;?</p>
              <p className="mt-2 text-[14px] text-muted">On te répond dans les plus brefs délais.</p>
              <ButtonLink href="/contact" variant="ink" className="mt-5">Nous écrire</ButtonLink>
            </div>
          </div>
        </aside>
        <div className="md:col-span-7 md:col-start-6">
          {faq.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="scroll-mt-28 pb-12">
              <h2 id={`${s.id}-t`} className="font-display text-[18px] md:text-[20px]">{s.title}</h2>
              <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {s.items.map((i) => (
                  <details key={i.q} className="group/d">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                      {i.q}
                      <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open/d:rotate-180" />
                    </summary>
                    <p className="pb-6 pr-10 text-[16px] leading-relaxed text-ink-soft">{i.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <p className="text-[14px] text-muted">
            Les conditions complètes sont détaillées dans nos{" "}
            <Link href="/legal/cgv" className="underline underline-offset-4">CGV</Link>, notre{" "}
            <Link href="/legal/livraison" className="underline underline-offset-4">politique d&apos;expédition</Link> et notre{" "}
            <Link href="/legal/retours" className="underline underline-offset-4">politique de retour</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
