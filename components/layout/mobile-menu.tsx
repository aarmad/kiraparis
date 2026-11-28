"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { getCollections } from "@/lib/commerce";
import { Emblem, Logo } from "@/components/ui/brand";
import { site } from "@/lib/site";
import { useBodyLock } from "@/lib/use-body-lock";

const collections = getCollections();

export function MobileMenu({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  useBodyLock(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-clay-50 text-ink md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="relative flex h-16 items-center justify-between border-b border-clay-200 px-4">
            <button type="button" onClick={onClose} className="-ml-2 grid size-10 place-items-center" aria-label="Fermer le menu">
              <X className="size-6" strokeWidth={1.6} />
            </button>
            <Logo className="h-[22px]" />
            <button type="button" onClick={onSearch} className="-mr-2 grid size-10 place-items-center" aria-label="Rechercher">
              <Search className="size-5" strokeWidth={1.6} />
            </button>
          </div>

          <nav aria-label="Menu mobile" className="relative flex-1 overflow-y-auto px-4 pb-8 pt-6">
            <ul className="divide-y divide-clay-200">
              {[
                { href: "/collections?tri=nouveautes", label: "Nouveautés", note: "Drop Athletics" },
                { href: "/collections?categorie=ensembles", label: "Ensembles" },
                { href: "/collections?categorie=hoodies", label: "Hoodies" },
                { href: "/collections?categorie=maillots", label: "Maillots" },
                { href: "/collections?categorie=pantalons", label: "Pantalons & denim" },
                { href: "/collections", label: "Tout voir" },
              ].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <Link href={item.href} className="flex items-baseline justify-between gap-3 py-3.5">
                    <span className="font-display text-[18px]">{item.label}</span>
                    {item.note && <span className="label-mono text-terracotta">{item.note}</span>}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="no-scrollbar -mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4">
              {collections.slice(0, 3).map((c) => (
                <Link key={c.handle} href={`/collections/${c.handle}`} className="w-[44%] shrink-0 snap-start">
                  <div className="relative aspect-[3/4] overflow-hidden bg-clay-100">
                    <Image src={c.image.src} alt="" fill sizes="45vw" className="object-cover" style={{ objectPosition: c.image.position }} />
                  </div>
                  <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.04em]">{c.title}</p>
                </Link>
              ))}
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-y-3 text-[14px] text-ink-soft">
              <li><Link href="/notre-histoire">Notre histoire</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/legal/livraison">Livraison</Link></li>
              <li><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href={site.tiktok} target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </nav>
          <div className="relative flex items-center gap-3 border-t border-clay-200 px-4 py-4">
            <Emblem className="size-6 text-terracotta" />
            <p className="text-[12px] font-bold uppercase tracking-[0.04em]">{site.tagline}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
