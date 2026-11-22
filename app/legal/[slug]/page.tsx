import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import source from "@/content/source-pages.json";

/**
 * Pages légales : texte d'origine de la boutique (politiques Shopify), reproduit tel quel.
 * En production, ces contenus seront lus depuis Shopify (shop.policies) pour rester la source de vérité.
 */
const PAGES = {
  livraison: { key: "shipping-policy", title: "Politique d'expédition" },
  retours: { key: "refund-policy", title: "Retours & remboursements" },
  cgv: { key: "terms-of-sale", title: "Conditions générales de vente" },
  confidentialite: { key: "privacy-policy", title: "Politique de confidentialité" },
  "mentions-legales": { key: "page:mentions-legales", title: "Mentions légales" },
} as const;

type Slug = keyof typeof PAGES;
type Source = Record<string, { title: string; blocks: string[] }>;

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug as Slug];
  return page ? { title: page.title, alternates: { canonical: `/legal/${slug}` } } : {};
}

const isHeading = (b: string) => b.length < 80 && !/[.:;,]$/.test(b) && /^(article|[A-ZÉÈ0-9])/i.test(b) && !/@/.test(b);

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug as Slug];
  if (!page) notFound();
  const content = (source as Source)[page.key];

  return (
    <div className="mx-auto grid max-w-[1600px] gap-12 px-4 pb-24 pt-10 md:grid-cols-12 md:px-8 md:pt-16">
      <aside className="md:col-span-3">
        <nav aria-label="Informations légales" className="md:sticky md:top-28">
          <p className="label-mono text-muted">Informations</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {(Object.keys(PAGES) as Slug[]).map((s) => (
              <li key={s}>
                <Link href={`/legal/${s}`} aria-current={s === slug ? "page" : undefined} className={s === slug ? "font-semibold text-terracotta" : "hover:text-terracotta"}>
                  {PAGES[s].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <article className="md:col-span-8 md:col-start-5">
        <h1 className="font-display text-[3.4rem] md:text-[5rem]">{page.title}</h1>
        <div className="mt-10 max-w-[68ch] text-[16px] leading-relaxed text-ink-soft">
          {content.blocks.map((b, i) =>
            isHeading(b) ? (
              <h2 key={i} className="mb-3 mt-10 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink first:mt-0">
                {b}
              </h2>
            ) : (
              <p key={i} className="mb-4">
                {b}
              </p>
            ),
          )}
        </div>
      </article>
    </div>
  );
}
