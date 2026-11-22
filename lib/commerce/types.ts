export type ImageKind = "packshot" | "lifestyle" | "detail";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Packshots sur fond blanc : fondus dans le fond argile via mix-blend-multiply. */
  kind: ImageKind;
  /** Recadrage supplémentaire (photos livrées avec des bandes blanches latérales). */
  zoom?: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  available: boolean;
}

export type CollectionHandle = "athletics" | "hunter" | "essentiels" | "denim";
export type Category = "ensembles" | "maillots" | "hoodies" | "pantalons";

export interface Product {
  handle: string;
  /** Handle d'origine sur Shopify, pour les redirections 301. */
  legacyHandle: string;
  /** Modèle (sert à relier les coloris d'une même pièce). */
  model: string;
  name: string;
  color: { name: string; hex: string };
  collection: CollectionHandle;
  category: Category;
  /** Prix en centimes d'euro. */
  price: number;
  tagline: string;
  description: string[];
  specs: string[];
  care?: string[];
  fitNote?: string;
  badges: ("nouveau" | "edition-limitee")[];
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  seo: { title: string; description: string };
}

export interface Collection {
  handle: CollectionHandle;
  title: string;
  kicker: string;
  intro: string;
  image: { src: string; alt: string; width: number; height: number; position?: string };
  accent: string;
}

export interface CartLine {
  variantId: string;
  handle: string;
  quantity: number;
}
