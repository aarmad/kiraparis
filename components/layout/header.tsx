"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn as clsx } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/brand";
import { useCart } from "@/components/cart/cart-context";
import { getCollections } from "@/lib/commerce";
import { MobileMenu } from "./mobile-menu";
import { SearchOverlay } from "./search-overlay";

const collections = getCollections();

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/" || pathname === "/notre-histoire" || pathname.startsWith("/collections/");
  const { count, open: openCart } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastY = useRef(0);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme les panneaux à chaque navigation (ajustement d'état pendant le rendu).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMega(false);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  const transparent = overHero && !scrolled && !mega;
  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMega(false), 120);
  };

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-40 transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-out-soft)]",
          hidden && !mega && !menuOpen && !searchOpen ? "-translate-y-full" : "translate-y-0",
          transparent
            ? "bg-transparent text-clay-50"
            : "bg-clay-50/88 text-ink shadow-[0_1px_0_rgb(21_18_15/0.08)] backdrop-blur-xl",
        )}
        onMouseLeave={closeMega}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[72px] md:px-8">
          {/* Gauche */}
          <nav aria-label="Navigation principale" className="flex items-center gap-1">
            <button
              type="button"
              className="-ml-2 grid size-10 place-items-center md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-[22px]" strokeWidth={1.6} />
            </button>
            <ul className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-[0.12em] md:flex">
              <li onMouseEnter={openMega}>
                <button
                  type="button"
                  className="relative py-2 uppercase tracking-[0.12em]"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onClick={() => setMega((v) => !v)}
                  onFocus={openMega}
                >
                  Boutique
                </button>
              </li>
              <li onMouseEnter={closeMega}>
                <Link href="/collections/athletics" className="group/link flex items-center gap-2 py-2">
                  <span className="size-1.5 rounded-full bg-terracotta" aria-hidden />
                  Athletics
                </Link>
              </li>
              <li onMouseEnter={closeMega}>
                <Link href="/notre-histoire" className="py-2">
                  Notre histoire
                </Link>
              </li>
            </ul>
          </nav>

          {/* Centre */}
          <Link href="/" aria-label="KIRA Paris — accueil" className="block">
            <Logo className="h-[22px] md:h-[26px]" />
          </Link>

          {/* Droite */}
          <div className="flex items-center justify-end gap-1 md:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center md:flex md:w-auto md:gap-2 md:px-1"
              aria-label="Rechercher"
            >
              <Search className="size-5" strokeWidth={1.6} />
              <span className="hidden text-[13px] font-semibold uppercase tracking-[0.12em] lg:inline">Recherche</span>
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative -mr-2 grid size-10 place-items-center md:mr-0 md:flex md:w-auto md:gap-2 md:px-1"
              aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
            >
              <ShoppingBag className="size-5" strokeWidth={1.6} />
              <span className="hidden text-[13px] font-semibold uppercase tracking-[0.12em] lg:inline">Panier</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-clay-50 md:static md:h-5 md:min-w-5"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              id="mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              onMouseEnter={openMega}
              className="absolute inset-x-0 top-full hidden border-t border-ink/10 bg-clay-50 text-ink shadow-[0_24px_40px_-24px_rgb(21_18_15/0.35)] md:block"
            >
              <div className="mx-auto grid max-w-[1600px] grid-cols-[220px_1fr] gap-10 px-8 py-9">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="label-mono mb-3 text-muted">Vestiaire</p>
                    <ul className="space-y-2 text-[15px] font-medium">
                      <li><Link href="/collections" className="hover:text-terracotta">Tout voir</Link></li>
                      <li><Link href="/collections?categorie=hoodies" className="hover:text-terracotta">Hoodies</Link></li>
                      <li><Link href="/collections?categorie=ensembles" className="hover:text-terracotta">Ensembles</Link></li>
                      <li><Link href="/collections?categorie=maillots" className="hover:text-terracotta">Maillots</Link></li>
                      <li><Link href="/collections?categorie=pantalons" className="hover:text-terracotta">Pantalons & denim</Link></li>
                    </ul>
                  </div>
                </div>
                <ul className="grid grid-cols-4 gap-4">
                  {collections.map((c) => (
                    <li key={c.handle}>
                      <Link href={`/collections/${c.handle}`} className="group/m block">
                        <div className="relative aspect-[4/5] overflow-hidden bg-clay-100">
                          <Image
                            src={c.image.src}
                            alt=""
                            fill
                            sizes="18vw"
                            className={clsx(
                              "transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/m:scale-105",
                              c.handle === "essentiels" ? "scale-[1.3] object-contain mix-blend-multiply group-hover/m:scale-[1.36]" : "object-cover",
                            )}
                            style={{ objectPosition: c.image.position }}
                          />
                        </div>
                        <p className="label-mono mt-3 text-muted">{c.kicker}</p>
                        <p className="mt-1 text-lg font-semibold">{c.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => { setMenuOpen(false); setSearchOpen(true); }} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
