/**
 * Informations commerciales centralisées : UNE seule source de vérité,
 * réutilisée dans le bandeau, la fiche produit, le panier, la FAQ et le footer.
 *
 * ⚠️ À valider par la marque (cf. docs/01-audit.md §11) :
 *   - seuil de livraison offerte (la politique d'expédition indique 70 €, la FAQ « sans minimum ») ;
 *   - email de contact officiel.
 */
/**
 * URL canonique : NEXT_PUBLIC_SITE_URL si définie, sinon le domaine de production Vercel,
 * sinon l'URL du déploiement courant (aperçus), sinon localhost.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Indexation par les moteurs : uniquement en production Vercel ET si ALLOW_INDEXING=true.
 * Tant que la refonte n'a pas remplacé le site Shopify, laisser à false (évite le contenu dupliqué).
 */
export const indexingAllowed =
  process.env.VERCEL_ENV === "production" && process.env.ALLOW_INDEXING === "true";

export const site = {
  name: "KIRA Paris",
  url: resolveSiteUrl(),
  tagline: "Force tranquille, élégance essentielle.",
  description:
    "KIRA Paris, la marque streetwear née de Kirané et de la culture soninké. Hoodies 400 GSM, denim, drops Athletics. Pièces en édition limitée.",
  email: "contact@kiraparis.com",
  instagram: "https://www.instagram.com/kiraparisofficial",
  tiktok: "https://www.tiktok.com/@kiraparisofficial",
  freeShippingThreshold: 7000, // centimes, France métropolitaine (politique d'expédition)
  freeShippingThresholdEurope: 14000,
  returnDays: 14,
  dispatchDays: 3,
  deliveryFrance: "3 à 5 jours ouvrés",
  /**
   * Moyens de paiement affichés par la boutique Shopify actuelle (icônes officielles Shopify,
   * extraites du pied de page de kiraparis.com). `main` = affichés près des boutons d'achat.
   */
  payments: [
    { id: "visa", label: "Visa", main: true },
    { id: "master", label: "Mastercard", main: true },
    { id: "cartes_bancaires", label: "Cartes Bancaires", main: true },
    { id: "american_express", label: "American Express", main: false },
    { id: "paypal", label: "PayPal", main: true },
    { id: "apple_pay", label: "Apple Pay", main: true },
    { id: "google_pay", label: "Google Pay", main: true },
    { id: "shopify_pay", label: "Shop Pay", main: true },
    { id: "klarna", label: "Klarna", main: false },
    { id: "bancontact", label: "Bancontact", main: false },
    { id: "eps", label: "EPS", main: false },
    { id: "blik", label: "BLIK", main: false },
    { id: "mobilepay", label: "MobilePay", main: false },
  ],
  legal: {
    company: "Kira Paris",
    address: "14 rue Tainturier, 93220 Gagny",
    rcs: "RCS Bobigny 939 823 126",
    siret: "939 823 126 00015",
  },
} as const;

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}
