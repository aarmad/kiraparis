import { formatPrice, site } from "@/lib/site";

/**
 * FAQ réécrite à partir de la FAQ d'origine.
 * ⚠️ Deux réponses d'origine contredisaient la politique d'expédition / de retour :
 *    elles sont alignées ici sur les politiques (à confirmer par la marque).
 */
export const faq: { id: string; title: string; items: { q: string; a: string }[] }[] = [
  {
    id: "livraison",
    title: "Livraison & délais",
    items: [
      {
        q: "Combien de temps prend la livraison en France ?",
        a: `Compte ${site.deliveryFrance} après confirmation de ta commande. Tu reçois un email avec ton numéro de suivi dès l'expédition. Pendant les deux semaines qui suivent un drop, la préparation peut prendre jusqu'à 7 jours ouvrés.`,
      },
      {
        q: "La livraison est-elle offerte ?",
        a: `Oui, en France métropolitaine dès ${formatPrice(site.freeShippingThreshold)} d'achat, et en Europe dès ${formatPrice(site.freeShippingThresholdEurope)}.`,
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, dans toute l'Europe et dans de nombreux pays. Les frais et délais varient selon la destination et sont calculés automatiquement au moment du paiement (en moyenne 5 à 7 jours en Europe, 5 à 10 jours dans le reste du monde).",
      },
    ],
  },
  {
    id: "retours",
    title: "Retours & échanges",
    items: [
      {
        q: "Comment faire un retour ?",
        a: `Tu as ${site.returnDays} jours après réception pour demander un retour. Contacte-nous avec ton numéro de commande : on t'envoie une étiquette et la marche à suivre. L'article doit être non porté, avec ses étiquettes et dans son emballage d'origine.`,
      },
      {
        q: "Dans quel délai suis-je remboursé(e) ?",
        a: "Sous 5 à 10 jours ouvrés après réception et vérification du colis, sur le moyen de paiement utilisé lors de l'achat.",
      },
      {
        q: "Puis-je échanger contre une autre taille ?",
        a: "Oui, dans la limite des stocks disponibles. Contacte-nous avant de renvoyer ton colis.",
      },
    ],
  },
  {
    id: "tailles",
    title: "Tailles & entretien",
    items: [
      {
        q: "Comment choisir ma taille ?",
        a: "Nos pièces sont taillées de manière standard. Si tu hésites entre deux tailles, prends la taille au-dessus pour un rendu plus oversize, ou ta taille habituelle pour un fit plus ajusté.",
      },
      {
        q: "Les vêtements rétrécissent-ils au lavage ?",
        a: "Nos pièces sont conçues pour garder leur forme. Lave-les à 30 °C, à l'envers, pour préserver les couleurs et la matière le plus longtemps possible.",
      },
    ],
  },
  {
    id: "paiement",
    title: "Paiement & sécurité",
    items: [
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Cartes bancaires (Visa, Mastercard, CB, American Express), PayPal, Apple Pay, Google Pay et Shop Pay. Selon ton pays, d'autres moyens locaux peuvent s'afficher au paiement (Klarna, Bancontact, EPS, BLIK, MobilePay).",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Oui. Le paiement est traité par le checkout sécurisé Shopify ; tes informations bancaires ne sont jamais stockées sur notre site.",
      },
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Le paiement en plusieurs fois peut être proposé via Shop Pay selon ton éligibilité. L'option apparaît automatiquement au moment du paiement.",
      },
    ],
  },
];
