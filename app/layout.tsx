import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Brygada_1918, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";

/**
 * Typographies :
 * - Big Shoulders : grotesque condensée d'inspiration athlétique (titres, chiffres)
 * - Brygada 1918 : revival d'un caractère de 1918, voix « héritage » en italique
 * - Schibsted Grotesk : grotesque éditoriale de presse (texte, interface, étiquettes)
 */
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});
const serif = Brygada_1918({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif-heritage",
  display: "swap",
});
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KIRA Paris — Streetwear né à Kirané",
    template: "%s | KIRA Paris",
  },
  description: site.description,
  openGraph: {
    siteName: "KIRA Paris",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/lifestyle/campagne-athletics-hero.jpg", width: 1284, height: 1898, alt: "Campagne Kira Athletics" }],
  },
  icons: { icon: "/images/brand/emblem.png" },
  robots: { index: false, follow: false }, // prototype : non indexé
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="min-h-svh">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-clay-50"
        >
          Aller au contenu
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
