import type { Product, ProductImage, ImageKind } from "../types";
import snapshot from "./shopify-snapshot.json";

/**
 * Catalogue du prototype.
 * Prix, tailles et disponibilités : instantané réel de la boutique Shopify (22/11/2026).
 * Textes : réécrits à partir des fiches d'origine, sans ajouter de caractéristique non vérifiée.
 */

type SnapshotKey = keyof typeof snapshot;

const img = (
  handle: string,
  n: number,
  alt: string,
  kind: ImageKind,
  size: [number, number] = [2048, 2048],
  zoom?: number,
): ProductImage => ({
  src: `/images/products/${handle}/${String(n).padStart(2, "0")}.jpg`,
  alt,
  kind,
  width: size[0],
  height: size[1],
  zoom,
});

const LANDSCAPE: [number, number] = [1284, 850];

const TRACKSUIT_CARE = [
  "Lavage à 30 °C, sans adoucissant.",
  "Retourner le vêtement pour le lavage et le repassage.",
  "Pas de sèche-linge.",
  "Laver avec des couleurs similaires.",
];

function fromSnapshot(handle: SnapshotKey) {
  const s = snapshot[handle];
  return {
    handle,
    legacyHandle: s.legacyHandle,
    price: s.price,
    createdAt: s.createdAt,
    variants: s.variants,
  };
}

export const products: Product[] = [
  {
    ...fromSnapshot("ensemble-tracksuit-burgundy-cream"),
    model: "ensemble-athletics",
    name: "Ensemble Tracksuit",
    color: { name: "Burgundy / Cream", hex: "#5A1C24" },
    collection: "athletics",
    category: "ensembles",
    tagline: "Veste et pantalon oversize, logos Kira Athletics.",
    description: [
      "L'ensemble qui ouvre le drop Athletics. Une coupe surdimensionnée, des empiècements crème qui structurent la silhouette et des passepoils blancs qui soulignent le mouvement.",
      "Les logos Kira et Kira Athletics sont imprimés sur la veste et le pantalon. Les ourlets élastiques tiennent la ligne, que tu le portes ouvert ou fermé.",
    ],
    specs: ["Coupe surdimensionnée", "Impression logos Kira & Kira Athletics", "Ourlets élastiques", "100 % polyester"],
    care: TRACKSUIT_CARE,
    badges: ["nouveau"],
    images: [
      img("ensemble-tracksuit-burgundy-cream", 1, "Ensemble tracksuit burgundy et crème, veste et pantalon à plat", "packshot"),
      img("ensemble-tracksuit-burgundy-cream", 2, "Modèle portant l'ensemble tracksuit burgundy, de face", "lifestyle", undefined, 1.2),
      img("ensemble-tracksuit-burgundy-cream", 3, "Modèle en ensemble tracksuit burgundy, en pied", "lifestyle", undefined, 1.2),
      img("ensemble-tracksuit-burgundy-cream", 4, "Ensemble tracksuit burgundy vu de dos", "lifestyle", undefined, 1.2),
      img("ensemble-tracksuit-burgundy-cream", 5, "Détail de la veste burgundy, inscription Kira Athletics", "detail"),
      img("ensemble-tracksuit-burgundy-cream", 6, "Détail du logo K sur la poitrine de la veste burgundy", "detail"),
    ],
    seo: {
      title: "Ensemble Tracksuit Burgundy/Cream – Kira Athletics",
      description: "Ensemble tracksuit oversize burgundy et crème, logos Kira Athletics imprimés, ourlets élastiques. Drop Athletics KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("ensemble-tracksuit-bleu-black"),
    model: "ensemble-athletics",
    name: "Ensemble Tracksuit",
    color: { name: "Bleu / Black", hex: "#1D5BD8" },
    collection: "athletics",
    category: "ensembles",
    tagline: "Bleu franc, empiècements noirs, coupe oversize.",
    description: [
      "Un bleu qui se voit de loin, cassé par des empiècements noirs. La même coupe surdimensionnée que l'ensemble burgundy, pensée pour être portée large.",
      "Logos Kira et Kira Athletics imprimés, ourlets élastiques aux poignets et aux chevilles.",
    ],
    specs: ["Coupe surdimensionnée", "Impression logos Kira & Kira Athletics", "Ourlets élastiques", "100 % polyester"],
    care: TRACKSUIT_CARE,
    badges: ["nouveau"],
    images: [
      img("ensemble-tracksuit-bleu-black", 1, "Ensemble tracksuit bleu et noir, veste et pantalon à plat", "packshot"),
      img("ensemble-tracksuit-bleu-black", 2, "Modèle portant l'ensemble tracksuit bleu, de face", "lifestyle", undefined, 1.2),
      img("ensemble-tracksuit-bleu-black", 3, "Ensemble tracksuit bleu porté, vu de trois quarts dos", "lifestyle", undefined, 1.2),
      img("ensemble-tracksuit-bleu-black", 4, "Détail de la veste bleue, inscription Kira Athletics", "detail"),
      img("ensemble-tracksuit-bleu-black", 5, "Deux modèles en ensembles tracksuit bleu et burgundy", "lifestyle"),
    ],
    seo: {
      title: "Ensemble Tracksuit Bleu/Black – Kira Athletics",
      description: "Ensemble tracksuit oversize bleu et noir, logos Kira Athletics imprimés, ourlets élastiques. Drop Athletics KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("maillot-football-vert"),
    model: "maillot-kira",
    name: "Maillot de football KIRA",
    color: { name: "Vert forêt", hex: "#1E4A35" },
    collection: "athletics",
    category: "maillots",
    tagline: "Piqué vert forêt, col polo blanc, flocage KIRA 10.",
    description: [
      "Un maillot vert forêt couvert des motifs Kira, du col jusqu'aux flancs. Le col polo blanc s'ouvre en V, les manches courtes sont finies de blanc.",
      "Sur la poitrine : le logo KIRA Paris et la carte Kira blanche aux deux étoiles. Au dos, le flocage KIRA 10.",
    ],
    specs: [
      "Coloris vert forêt et blanc",
      "Col polo blanc, ouverture en V",
      "Manches courtes, finitions blanches",
      "Motifs Kira sur l'ensemble du maillot",
      "Logo KIRA Paris & carte Kira aux deux étoiles",
      "Piqué 100 % polyester",
    ],
    fitNote: "Prends ta taille habituelle.",
    badges: ["nouveau"],
    images: [
      img("maillot-football-vert", 1, "Maillot de football KIRA vert, vu de face", "packshot"),
      img("maillot-football-vert", 2, "Maillot de football KIRA vert, vu de dos avec flocage KIRA 10", "packshot"),
      img("maillot-football-vert", 3, "Modèle portant le maillot KIRA vert avec le jean terre craquelée", "lifestyle"),
      img("maillot-football-vert", 4, "Modèle portant le maillot KIRA vert, de face", "lifestyle"),
      img("maillot-football-vert", 5, "Deux modèles en maillot KIRA vert, vue plongeante", "lifestyle"),
      img("maillot-football-vert", 6, "Modèle en maillot KIRA vert, mains sur les hanches", "lifestyle"),
      img("maillot-football-vert", 7, "Dos du maillot KIRA vert porté, flocage KIRA 10", "lifestyle"),
    ],
    seo: {
      title: "Maillot de football KIRA Vert",
      description: "Maillot de football KIRA vert forêt en piqué, col polo blanc, motifs Kira et flocage KIRA 10 au dos. Drop Athletics KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("jean-terre-craquelee-noir"),
    model: "jean-terre-craquelee",
    name: "Jean Terre Craquelée",
    color: { name: "Noir", hex: "#1A1A1A" },
    collection: "denim",
    category: "pantalons",
    tagline: "Le motif terre craquelée de Kirané, sur un denim 12,5 oz.",
    description: [
      "Une coupe droite et large, couverte du motif terre craquelée Kirané : la surface d'un sol qui sèche au soleil, transposée sur un denim noir.",
      "Étiquette tissée KIRA PARIS à la ceinture dos, fermeture zip et bouton métal, cinq poches. Unisexe.",
    ],
    specs: [
      "Coupe droite / large",
      "Motif terre craquelée Kirané",
      "Étiquette tissée KIRA PARIS, ceinture dos",
      "Fermeture zip & bouton métal, 5 poches",
      "Denim 12,5 oz, 100 % coton",
      "Unisexe",
    ],
    fitNote: "Mamery mesure 1,88 m et porte du L.",
    badges: ["edition-limitee"],
    images: [
      img("jean-terre-craquelee-noir", 1, "Jean terre craquelée noir, vu de face à plat", "packshot", [4672, 4672]),
      img("jean-terre-craquelee-noir", 2, "Jean terre craquelée noir porté avec le maillot KIRA vert", "lifestyle"),
      img("jean-terre-craquelee-noir", 3, "Jean terre craquelée noir porté, vue en pied", "lifestyle"),
      img("jean-terre-craquelee-noir", 4, "Détail de l'étiquette tissée Kira Paris sur la ceinture du jean", "detail", [4672, 4672]),
    ],
    seo: {
      title: "Jean Terre Craquelée Noir – Édition limitée",
      description: "Jean coupe droite/large motif terre craquelée Kirané, denim 12,5 oz 100 % coton, étiquette tissée KIRA PARIS. Édition limitée.",
    },
  },
  {
    ...fromSnapshot("hoodie-hunter-gris"),
    model: "hoodie-hunter",
    name: "Hoodie Hunter",
    color: { name: "Gris", hex: "#B9B5AF" },
    collection: "hunter",
    category: "hoodies",
    tagline: "Oversize, 400 GSM, sérigraphie Hunter au dos.",
    description: [
      "Un gris profond, ni trop clair ni trop foncé, qui va avec tout. La coupe oversize est généreuse sans perdre en allure.",
      "Coton 100 % à 400 GSM : dense, chaud, avec un extérieur légèrement brossé et un intérieur molletonné. Broderie KIRA à l'avant, motif Hunter sérigraphié au dos.",
    ],
    specs: ["Coton 100 % – 400 GSM", "Coupe oversize", "Broderie KIRA à l'avant", "Sérigraphie Hunter au dos", "Capuche structurée, poche kangourou"],
    badges: [],
    images: [
      img("hoodie-hunter-gris", 1, "Hoodie Hunter gris, face avec inscription KIRA", "packshot", LANDSCAPE),
      img("hoodie-hunter-gris", 2, "Hoodie Hunter gris, dos avec motif Hunter sérigraphié", "packshot", LANDSCAPE),
    ],
    seo: {
      title: "Hoodie Hunter Gris – Oversize 400 GSM",
      description: "Hoodie oversize gris en coton 100 % 400 GSM, broderie KIRA à l'avant et sérigraphie Hunter au dos. Collection Hunter KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("hoodie-hunter-noir"),
    model: "hoodie-hunter",
    name: "Hoodie Hunter",
    color: { name: "Noir", hex: "#191919" },
    collection: "hunter",
    category: "hoodies",
    tagline: "La force tranquille en noir. Oversize, 400 GSM.",
    description: [
      "Le Hunter dans sa version la plus sobre. Coupe oversize travaillée, tissu épais et chaud, finitions soignées : il passe du quotidien au soir sans effort.",
      "Broderie KIRA discrète à l'avant, motif Hunter en sérigraphie dans le dos.",
    ],
    specs: ["Coton 100 % – 400 GSM", "Coupe oversize", "Broderie KIRA à l'avant", "Sérigraphie Hunter au dos", "Poche kangourou"],
    badges: [],
    images: [
      img("hoodie-hunter-noir", 1, "Hoodie Hunter noir, face avec inscription KIRA", "packshot", LANDSCAPE),
      img("hoodie-hunter-noir", 2, "Hoodie Hunter noir, dos avec motif Hunter sérigraphié", "packshot", LANDSCAPE),
    ],
    seo: {
      title: "Hoodie Hunter Noir – Oversize 400 GSM",
      description: "Hoodie oversize noir en coton 100 % 400 GSM, broderie KIRA et sérigraphie Hunter au dos. Collection Hunter KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("hoodie-hunter-rouge-delave"),
    model: "hoodie-hunter",
    name: "Hoodie Hunter",
    color: { name: "Rouge délavé", hex: "#E0625A" },
    collection: "hunter",
    category: "hoodies",
    tagline: "Une teinte rare, inspirée des terres profondes.",
    description: [
      "Une couleur affirmée, qui te distingue sans crier. Coupe oversize, matière épaisse, finitions brodées et sérigraphiées.",
      "Logo KIRA brodé à l'avant, motif Hunter sérigraphié dans le dos. La pièce pour ceux qui portent une identité.",
    ],
    specs: ["Coton 100 % – 400 GSM", "Coupe oversize", "Logo KIRA brodé à l'avant", "Sérigraphie Hunter au dos", "Poche kangourou"],
    badges: [],
    images: [
      img("hoodie-hunter-rouge-delave", 1, "Hoodie Hunter rouge délavé, vu de face", "packshot", LANDSCAPE),
      img("hoodie-hunter-rouge-delave", 2, "Hoodie Hunter rouge délavé, dos avec motif Hunter", "packshot", LANDSCAPE),
    ],
    seo: {
      title: "Hoodie Hunter Rouge délavé – Oversize 400 GSM",
      description: "Hoodie oversize rouge délavé en coton 100 % 400 GSM, logo KIRA brodé et sérigraphie Hunter au dos. Collection Hunter KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("hoodie-kira-noir"),
    model: "hoodie-kira",
    name: "Hoodie KIRA",
    color: { name: "Noir", hex: "#141414" },
    collection: "essentiels",
    category: "hoodies",
    tagline: "La pièce fondatrice de la marque.",
    description: [
      "Le premier hoodie KIRA. Une coupe droite, des finitions soignées et un coton 100 % pensé pour durer : l'ADN de la marque, sans détour.",
      "Le point de départ pour construire un vestiaire KIRA. À porter avec le jogging noir pour un look coordonné.",
    ],
    specs: ["Coton 100 % – 400 GSM", "Coupe droite / regular", "Inscription Kira by Kira Paris au dos"],
    badges: [],
    images: [
      img("hoodie-kira-noir", 1, "Hoodie KIRA noir, vu de face", "packshot", LANDSCAPE),
      img("hoodie-kira-noir", 2, "Hoodie KIRA noir, dos avec inscription Kira by Kira Paris", "packshot", LANDSCAPE),
    ],
    seo: {
      title: "Hoodie KIRA Noir – Coton 400 GSM",
      description: "Hoodie KIRA noir coupe droite en coton 100 % 400 GSM. La pièce fondatrice de KIRA Paris.",
    },
  },
  {
    ...fromSnapshot("hoodie-kira-bleu"),
    model: "hoodie-kira",
    name: "Hoodie KIRA",
    color: { name: "Bleu ciel", hex: "#A9CDEB" },
    collection: "essentiels",
    category: "hoodies",
    tagline: "Un bleu qui n'est pas banal, et qui vieillit bien.",
    description: [
      "Une teinte qui s'associe à tout et affirme quelque chose de tranquille.",
      "Coton 100 % à 400 GSM, logo KIRA brodé à l'avant, motif Kira by Kira Paris brodé sur le dos, poche kangourou.",
    ],
    specs: ["Coton 100 % – 400 GSM", "Logo KIRA brodé à l'avant", "Motif Kira by Kira Paris brodé au dos", "Poche kangourou"],
    badges: [],
    images: [
      img("hoodie-kira-bleu", 1, "Hoodie KIRA bleu ciel, vu de face", "packshot", LANDSCAPE),
      img("hoodie-kira-bleu", 2, "Hoodie KIRA bleu ciel, dos avec broderie Kira by Kira Paris", "packshot", LANDSCAPE),
    ],
    seo: {
      title: "Hoodie KIRA Bleu ciel – Coton 400 GSM brodé",
      description: "Hoodie KIRA bleu ciel en coton 100 % 400 GSM, logo brodé à l'avant et motif Kira by Kira Paris brodé au dos.",
    },
  },
  {
    ...fromSnapshot("hoodie-kira-vert"),
    model: "hoodie-kira",
    name: "Hoodie KIRA",
    color: { name: "Vert", hex: "#D9E3D2" },
    collection: "essentiels",
    category: "hoodies",
    tagline: "Le plus épais de la gamme : 420 GSM, coupe boxy.",
    description: [
      "Un sweat à capuche épais, à la texture extérieure brute et à l'intérieur brossé doux. Coupe boxy, capuche doublée de molleton.",
      "Logo KIRA brodé à l'avant, motif Kira by Kira Paris brodé à l'arrière.",
    ],
    specs: [
      "Coton 100 % – 420 GSM",
      "Coupe boxy",
      "Logo KIRA brodé à l'avant",
      "Motif Kira by Kira Paris brodé au dos",
      "Extérieur brut, intérieur brossé",
      "Capuche doublée molleton, poche kangourou",
    ],
    badges: [],
    images: [
      img("hoodie-kira-vert", 1, "Hoodie KIRA vert, vu de face", "packshot", LANDSCAPE),
      img("hoodie-kira-vert", 2, "Hoodie KIRA vert, dos avec broderie Kira by Kira Paris", "packshot", LANDSCAPE),
    ],
    seo: {
      title: "Hoodie KIRA Vert – Coton épais 420 GSM",
      description: "Hoodie KIRA vert coupe boxy en coton 100 % 420 GSM, capuche doublée, logo brodé à l'avant et motif brodé au dos.",
    },
  },
  {
    ...fromSnapshot("jogging-noir"),
    model: "jogging-kira",
    name: "Pantalon Jogging",
    color: { name: "Noir", hex: "#141414" },
    collection: "essentiels",
    category: "pantalons",
    tagline: "Coupe droite, poches zippées. Pas un jogging comme les autres.",
    description: [
      "Une coupe droite qui le distingue des joggings classiques : silhouette nette, à porter à la maison comme dehors.",
      "Coton 100 %, poches à zip. À assortir avec le Hoodie KIRA Noir.",
    ],
    specs: ["Coton 100 %", "Coupe droite / regular", "Poches zippées"],
    badges: [],
    images: [
      img("jogging-noir", 1, "Pantalon jogging noir KIRA, vu de face", "packshot", LANDSCAPE),
      img("jogging-noir", 2, "Pantalon jogging noir KIRA, vu de dos", "packshot", LANDSCAPE),
      img("jogging-noir", 3, "Détail de la poche zippée et du logo du jogging noir", "detail", LANDSCAPE),
    ],
    seo: {
      title: "Pantalon Jogging Noir – Coton, coupe droite",
      description: "Pantalon jogging noir KIRA Paris en coton 100 %, coupe droite et poches zippées.",
    },
  },
];
